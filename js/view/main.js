function CrearLoader(id, div) {
    // Verifica si el div con la clase 'container-loader' ya existe
    if ($("#" + div).find('.container-loader').length === 0) {
        $("#" + div).append(`
            <div class="anchura-100-por-ciento altura-100-por-ciento flex flex-center position-absolute top-0 left-0 bg-color-white z-index-10000 container-loader" id="${id}">
                <div class="loader"></div>
            </div>
        `);
    }
}

function EliminarLoader(div) {
    // Desaparece el loader con un efecto de desvanecimiento cuando la página termina de cargar
    $("#" + div).fadeOut(500, function () {
        $("#" + div).remove(); // Elimina el loader del DOM después de desaparecer
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
            'overflow': 'scroll', // Habilitar el scroll
            'width': '100px', // Ancho fijo
            'height': '100px' // Altura fija
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

function ImprimirNoHayResultados(contenedor, texto) {
    contenedor.html(`<div class="anchura-100-por-ciento altura-100-por-ciento flex flex-center position-absolute">
        <div class="overflow-auto">
            <div class="anchura-100-por-ciento altura-150-px flex flex-center margin-10-px-auto">
                <img src="../../icons/basic/astronauta.png" class="altura-100-por-ciento">
            </div>
            <div class="anchura-100-por-ciento altura-30-px flex flex-center margin-20-px-auto">
                <span>${texto}</span>
            </div>
        </div>
    </div>`)
}
function EventosSelect2()
{
    $('select').on('select2:open', function () {
        // Guardar posición actual del scroll
        const currentScroll = $(window).scrollTop();
        $('html').css({
            overflow: 'hidden'
        });
    
        // Restaurar scroll si se mueve automáticamente
        setTimeout(function () {
            $(window).scrollTop(currentScroll);
        }, 0);
    });
    $(this).on('select2:close', function () {
        // Por si Select2 dejó overflow:hidden
        $('html').css({
            overflow: 'auto'
        });
    });
}

function ContenidoPaginaGuardado(resultado, titulo,contenedor) {
    $("#ColumnaTarjetaLogin").addClass('anchura-400-px').removeClass('anchura-80-por-ciento')
    contenedor.html(`<div class="anchura-100-por-ciento flex flex-center margin-10-px-auto position-relative" >
                        <img src=${resultado==true?`../../icons/windows/check.png`:`"../../icons/windows/eliminar.png"`} style="height:80px">
                    </div>
                    <div class="anchura-100-por-ciento altura-50-px flex flex-center" style="font-weight: 600;">
                        <span>${titulo}</span>
                    </div>`)
}

function upsertArray(nuevoItem, array) {
    return new Promise((resolve, reject) => {
        try {
            const index = array.findIndex(u => u.id === nuevoItem.id);

            if (index !== -1) {
                // Si ya existe, actualizar
                array[index] = nuevoItem;
                resolve({
                    tipo: 'actualizado',
                    item: nuevoItem
                });
            } else {
                // Si no existe, insertar
                array.push(nuevoItem);
                resolve({
                    tipo: 'insertado',
                    item: nuevoItem
                });
            }
        } catch (error) {
            reject('Error al hacer upsert: ' + error);
        }
    });
}

async function ContenidoPaginaGuardando(contenedor) {
    $("#ColumnaTarjetaLogin").addClass('anchura-400-px').removeClass('anchura-80-por-ciento')
    contenedor.html(`<div class="anchura-100-por-ciento flex flex-center margin-10-px-auto position-relative" style="height: 200px;">
                        <div class="anchura-100-por-ciento altura-100-por-ciento flex flex-center position-absolute top-0 left-0 bg-color-white z-index-10000 container-loader">
                            <div class="loader"></div>
                        </div>
                    </div>`)
}

async function Obtener_Sucursales() {
    const data = {
        accion: 'Obtener_Sucursales',
    };

    try {
        const response = await ajaxConParametros(undefined, data);
        return response;
    } catch (error) {
        const contenido = ComponerContenidoAdvertencia(
            '../../icons/windows/eliminar.png',
            'Error',
            'Intenta más tarde'
        );
        console.error("Error en Obtener_Sucursales:", error);
        MostrarModal(contenido, false);
        setTimeout(() => {
            CerrarModal();
        }, 1000);
        throw error;
    }
}

