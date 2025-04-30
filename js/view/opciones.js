function SetContainerOpciones(div, opciones, id) {

    $('#contenedor-opciones').remove();
    const {
        top,
        left,
        width
    } = ObtenerMedidas(div);
    let sugerenciasHTML = '';
    opciones.forEach((opcion, index) => {
        sugerenciasHTML +=
            `<li id="${id+index}" class="altura-30-px tarjeta-hover flex flex-left" 
        style="padding:13px 16px; cursor:pointer; width:calc(100% - 32px)">
        ${opcion}</li>`;
    });

    $('body').append(`
        <div id="contenedor-opciones"
            class="bg-color-white borde-redondeado-5-px-inferior position-absolute box-shadow-1 overflow-auto"
            style="top: ${top}px; left: ${left}px; 
            width: ${width}px; z-index: 9999;
            padding:10px 0px 10px 0px;
            max-height:150px">
            <div>${sugerenciasHTML}</div>
        </div>
    `);
    WindowResize(div)
    WindowScroll(div)
}

function WindowResize(div) {
    $(window).resize(function () {
        const {
            top,
            left,
            width
        } = ObtenerMedidas(div);
        $("#contenedor-opciones").css({
            'top': top + 'px',
            'left': left + 'px',
            'width': width + 'px'
        })
    });
}

function WindowScroll(div) {
    $(".contenedor-form").on( "scroll", function() {
        const {
            top,
            left,
            width
        } = ObtenerMedidas(div);
        $("#contenedor-opciones").css({
            'top': top + 'px',
            'left': left + 'px',
            'width': width + 'px'
        })
    });
}

function ObtenerMedidas(div) {
    const position = div.offset(); // posición absoluta del div en la página
    const top = position.top + div.outerHeight(); // posición justo debajo del div
    const left = position.left;
    const width = div.outerWidth();
    return {
        top,
        left,
        width
    }; // Devuelve las medidas en un objeto
}

$(document).click(function (e) {
    const contenedorOpciones = $('#contenedor-opciones');

    // Verificar si el clic fue fuera del contenedor de opciones
    if (!contenedorOpciones.is(e.target) && contenedorOpciones.has(e.target).length === 0) {
        contenedorOpciones.remove(); // Elimina el contenedor de opciones
    }
});

