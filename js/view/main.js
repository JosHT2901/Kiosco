function CrearLoader(id, div) {
    // Verifica si el div con la clase 'container-loader' ya existe
    if ($("#"+div).find('.container-loader').length === 0) {
        $("#"+div).append(`
            <div class="anchura-100-por-ciento altura-100-por-ciento flex flex-center position-absolute top-0 left-0 bg-color-white z-index-10000 container-loader" id="${id}">
                <div class="loader"></div>
            </div>
        `);
    }
}

function EliminarLoader(div) {
    // Desaparece el loader con un efecto de desvanecimiento cuando la página termina de cargar
    $("#"+div).fadeOut(500, function () {
        $("#"+div).remove(); // Elimina el loader del DOM después de desaparecer
    });
}

function BuscarCodigoPostal(codigo, callback) {
    $.getJSON('../../json/localidades.json', function (data) {
        const resultados = data.filter(item => item.Codigo === codigo);
        callback(resultados); // llama al callback con un array (puede estar vacío)
    }).fail(function () {
        callback(null); // en caso de error
    });
}

function obtenerAnchuraScrollBar($elemento) {
    // Crear un div temporal para calcular el ancho del scrollbar
    var div = $('<div></div>')
      .css({
        'visibility': 'hidden',
        'overflow': 'scroll',  // Habilitar el scroll
        'width': '100px',  // Ancho fijo
        'height': '100px'  // Altura fija
      })
      .appendTo('body');
  
    // Calcular la diferencia entre el ancho del contenedor y el ancho sin scrollbar
    var anchoScrollbar = div[0].offsetWidth - div[0].clientWidth;
  
    // Eliminar el div temporal
    div.remove();
  
    return anchoScrollbar;
  }

  function obtenerAnchuraScrollBarHorizontal($elemento) {
    const el = $elemento.get(0);
  
    if (!el) return 0;
  
    return el.offsetHeight - el.clientHeight;
  }