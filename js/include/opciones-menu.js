const safeMargin = 10; // margen desde el borde de la ventana

var opcionesMenuProductos = [{
        titulo: "Editar",
        icono: `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.94 5 19 10.06 9.062 20a2.25 2.25 0 0 1-.999.58l-5.116 1.395a.75.75 0 0 1-.92-.921l1.395-5.116a2.25 2.25 0 0 1 .58-.999L13.938 5Zm7.09-2.03a3.578 3.578 0 0 1 0 5.06l-.97.97L15 3.94l.97-.97a3.578 3.578 0 0 1 5.06 0Z" />
            </svg>`,
        name:"BotonEditarProducto"
    },
    {
        titulo: "Ver",
        icono: `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 9.005a4 4 0 1 1 0 8 4 4 0 0 1 0-8ZM12 5.5c4.613 0 8.596 3.15 9.701 7.564a.75.75 0 1 1-1.455.365 8.503 8.503 0 0 0-16.493.004.75.75 0 0 1-1.455-.363A10.003 10.003 0 0 1 12 5.5Z"/>
        </svg>`,
        name:"BotonVerProducto"
    },
    {
        titulo: "Copiar código",
        icono: `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 6a3 3 0 0 1 3-3h1.5a1 1 0 0 1 0 2H5a1 1 0 0 0-1 1v1.5a1 1 0 0 1-2 0V6Zm14.5-2a1 1 0 0 1 1-1H19a3 3 0 0 1 3 3v1.5a1 1 0 1 1-2 0V6a1 1 0 0 0-1-1h-1.5a1 1 0 0 1-1-1ZM3 15.5a1 1 0 0 1 1 1V18a1 1 0 0 0 1 1h1.5a1 1 0 1 1 0 2H5a3 3 0 0 1-3-3v-1.5a1 1 0 0 1 1-1Zm18 0a1 1 0 0 1 1 1V18a3 3 0 0 1-3 3h-1.5a1 1 0 1 1 0-2H19a1 1 0 0 0 1-1v-1.5a1 1 0 0 1 1-1ZM6 6.75a1 1 0 0 1 1 1v8.5a1 1 0 1 1-2 0v-8.5a1 1 0 0 1 1-1Zm5 1a1 1 0 1 0-2 0v8.5a1 1 0 1 0 2 0v-8.5Zm3-1a1 1 0 0 1 1 1v8.5a1 1 0 1 1-2 0v-8.5a1 1 0 0 1 1-1Zm5 1a1 1 0 1 0-2 0v8.5a1 1 0 1 0 2 0v-8.5Z"/>
        </svg>`,
        name:"BotonCopiarCodigo"
    },
    {
        titulo: "Clonar",
        icono: `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.503 4.627 5.5 6.75v10.504a3.25 3.25 0 0 0 3.25 3.25h8.616a2.251 2.251 0 0 1-2.122 1.5H8.75A4.75 4.75 0 0 1 4 17.254V6.75c0-.98.627-1.815 1.503-2.123ZM17.75 2A2.25 2.25 0 0 1 20 4.25v13a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-13A2.25 2.25 0 0 1 8.75 2h9Z"/>
        </svg>`,
        name:"BotonClonarProducto"
    },
    {
        titulo: "Imprimir",
        icono: `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 17.5v1.25A2.25 2.25 0 0 1 15.75 21h-7.5A2.25 2.25 0 0 1 6 18.75v-1.251l-1.75.001A2.25 2.25 0 0 1 2 15.25V9.254a3.25 3.25 0 0 1 3.25-3.25l.749-.001L6 5.25A2.25 2.25 0 0 1 8.25 3h7.502a2.25 2.25 0 0 1 2.25 2.25v.753h.75a3.254 3.254 0 0 1 3.252 3.25l.003 5.997a2.249 2.249 0 0 1-2.248 2.25H18Zm-2.25-4h-7.5a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 0-.75-.75Zm.002-9H8.25a.75.75 0 0 0-.75.75l-.001.753h9.003V5.25a.75.75 0 0 0-.75-.75Z"/>
        </svg>`,
        name:"BotonImprimirEtiquetaProducto"
    },
    {
        titulo: "Eliminar",
        icono: `<svg width="24" height="24"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.5 6a1 1 0 0 1-.883.993L20.5 7h-.845l-1.231 12.52A2.75 2.75 0 0 1 15.687 22H8.313a2.75 2.75 0 0 1-2.737-2.48L4.345 7H3.5a1 1 0 0 1 0-2h5a3.5 3.5 0 1 1 7 0h5a1 1 0 0 1 1 1Zm-7.25 3.25a.75.75 0 0 0-.743.648L13.5 10v7l.007.102a.75.75 0 0 0 1.486 0L15 17v-7l-.007-.102a.75.75 0 0 0-.743-.648Zm-4.5 0a.75.75 0 0 0-.743.648L9 10v7l.007.102a.75.75 0 0 0 1.486 0L10.5 17v-7l-.007-.102a.75.75 0 0 0-.743-.648ZM12 3.5A1.5 1.5 0 0 0 10.5 5h3A1.5 1.5 0 0 0 12 3.5Z"/>}
        </svg>`,
        name:"BotonEliminarProducto"
    }
]

const opcionesMenuFiltroProductos = [
    {
        titulo: "Departamento",
        id:"BotonFiltroDepartamento",
        name:"Departamentos"
    },
    {
        titulo: "Unidad de venta",
        id:"BotonFiltroUnidadVenta",
        name:"Unidades"
    },
    {
        titulo: "Tipo de venta",
        id:"BotonFiltroTipoVenta",
        name:"Tipo",
        opciones:
        [
            {
                titulo:'Granel',
                id:"Granel",
                categoria:"Tipo de venta"
            },
            {
                titulo:'Unidad',
                id:'Unidad',
                categoria:"Tipo de venta"
            }
        ]
    },
    {
        titulo: "I.E.P.S.",
        id:"BotonFiltroIEPS",
        name:"IEPS"
    },
    {
        titulo: "I.V.A.",
        id:"BotonFiltroIVA",
        name:"IVA"
    },
    {
        titulo:"Modificación",
        id:"BotonFiltroModificacion",
        name:"Modificacion",
        opciones:
        [
            {
                titulo:'Más reciente',
                id:"MasReciente",
                categoria:"Modificacion"
            },
            {
                titulo:'Más antigua',
                id:"MasAntigua",
                categoria:"Modificacion"
            },
            {
                titulo:'Rango de fecha',
                id:"RangoFecha",
                categoria:"Modificacion"
            }
        ]
    },
    {
        titulo:"Creación",
        id:"BotonFiltroCreacion",
        name:"Creacion",
        opciones:
        [
            {
                titulo:'Más reciente',
                id:"MasReciente",
                categoria:"Creacion"
            },
            {
                titulo:'Más antigua',
                id:"MasAntigua",
                categoria:"Creacion"
            },
            {
                titulo:'Rango de fecha',
                id:"RangoFecha",
                categoria:"Creacion"
            }
        ]
    },
    {
        titulo:"Existencias",
        id:"BotonFiltroExistencias",
        name:"Existencias",
        opciones:
        [
            {
                titulo:'Con existencia',
                id:"ConExistencia",
                categoria:"Existencias"
            },
            {
                titulo:'Sin existencia',
                id:"SinExistencia",
                categoria:"Existencias"
            },
            {
                titulo:'Bajo inventario',
                id:"BajoInventario",
                categoria:"Existencias"
            },
        ]
    }
];

function MostrarMenuOpciones(top, left, opciones) {
    const anchoMenu = 200; // Ancho del menú actualizado a 200px
    const margen = 10;
    // Tamaño de la ventana
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();

    // Crear el menú para calcular su altura antes de agregarlo al DOM
    let $menu = $("#menu-opciones");
    if ($menu.length === 0) {
        let filasMenu = [];
        opciones.forEach(opcion => {
            filasMenu.push(`
                <a class="anchura-100-por-ciento margin-5-px-auto flex flex-center tarjeta-hover boton-solo-icono" style="cursor: pointer;" name="${opcion.name}">
                    <div class="anchura-40-px altura-40-px flex flex-center">
                        ${opcion.icono}
                    </div>
                    <div class="altura-100-por-ciento anchura-100-por-ciento-menos-40-px flex flex-center">
                        <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral flex flex-left">
                            <span>${opcion.titulo}</span>
                        </div>
                    </div>
                </a>
            `);
        });

        // Agregar el menú al body sin mostrarlo aún
        $("body").append(`
            <div id="menu-opciones" class="anchura-200-px padding-10px-superior-inferior box-shadow-1 borde-redondeado-5-px overflow-auto position-absolute bg-color-white" style="display:none;">
                ${filasMenu.join("")}
            </div>
        `);

        $menu = $("#menu-opciones");
    }

    // Calcular la altura del menú después de agregarlo al DOM
    const altoMenu = $menu.outerHeight();

    // Inicializamos la posición ajustada
    let topAjustado = top;
    let leftAjustado = left;

    // Verificar si hay suficiente espacio abajo para el menú
    if (top + altoMenu + margen > windowHeight) {
        // Si no cabe abajo, intentamos ponerlo arriba
        topAjustado = top - altoMenu - margen;
        if (topAjustado < margen) {
            // Si no cabe arriba tampoco, ponerlo lo más cerca posible al borde superior
            topAjustado = margen;
        }
    } else {
        // Si hay suficiente espacio abajo, poner el menú hacia abajo con margen
        topAjustado = top + margen;
    }

    // Verificar si hay suficiente espacio a la derecha para el menú
    if (left + anchoMenu + margen > windowWidth) {
        // Si no cabe a la derecha, intentar ponerlo a la izquierda
        leftAjustado = left - anchoMenu - margen;
        if (leftAjustado < margen) {
            // Si no cabe a la izquierda, ponerlo lo más cerca posible al borde izquierdo
            leftAjustado = margen;
        }
    } else {
        // Si hay suficiente espacio, poner el menú a la derecha con margen
        leftAjustado = left + margen;
    }

    // Mostrar el menú en la posición calculada
    $menu.css({
        top: `${topAjustado}px`,
        left: `${leftAjustado}px`,
        display: 'block' // Mostrarlo después de calcular la posición
    });
}

function EventosMenuConSubMenu()
{
    $('#menuToggle').on('click', function (e) {
        e.stopPropagation();
    
        const $menu = $('#mainMenu');
        $menu.toggle();
    
        if ($menu.is(':visible')) {
            const $btn = $(this);
            const buttonOffset = $btn.offset();
            const menuWidth = $menu.outerWidth();
            const menuHeight = $menu.outerHeight();
            const windowWidth = $(window).width();
            const windowHeight = $(window).height();
    
            let left = buttonOffset.left;
            let top = buttonOffset.top + $btn.outerHeight();
    
            // Si el menú se sale por la derecha
            if (left + menuWidth + safeMargin > windowWidth) {
                left = windowWidth - menuWidth - safeMargin;
            }
    
            // Si el menú se sale por abajo
            if (top + menuHeight + safeMargin > windowHeight) {
                top = buttonOffset.top - menuHeight;
                // Si aún así se sale por arriba, colócalo con margen mínimo
                if (top < safeMargin) top = safeMargin;
            }
    
            // Asegura que no se pegue al borde izquierdo
            if (left < safeMargin) left = safeMargin;
    
            $menu.css({
                top: top + 'px',
                left: left + 'px',
                position: 'absolute'
            });
        }
    });
    
    // Cierra el menú si haces clic fuera
    $(document).on('click', function () {
        $('#mainMenu').hide();
    });
    
    // Evita que el clic dentro del menú lo cierre
    $('#mainMenu').on('click', function (e) {
        e.stopPropagation();
    });
}

function construirMenuContextual(opciones, top, left) {
    // Eliminar si ya existe un menú previo
    $("#MenuContextual").remove();

    // Crear lista <ul>
    const $ul = $('<ul>', {
        id: "MenuContextual",
        class: 'menu position-absolute padding-10px bg-color-white box-shadow-1 borde-redondeado-10-px',
        style: 'width:220px; padding:10px 0px'
    });

    // Tamaño de la ventana
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();
    const margen = 10;
    const anchoMenu = 220;

    opciones.forEach(opcion => {
        if (opcion.subopciones && Array.isArray(opcion.subopciones)) {
            // Decidir hacia dónde se desplegará el submenú
            const mostrarSubmenuALaIzquierda = left > windowWidth / 2;
            const $submenu = $('<ul class="submenu box-shadow-1"></ul>').css(
                mostrarSubmenuALaIzquierda ? { right: '100%', left: 'auto' } : { left: '100%', right: 'auto' }
            );

            opcion.subopciones.forEach(sub => {
                const $subitem = $(`
                    <li class="altura-40-px has-submenu flex flex-center tarjeta-hover-gray padding-10px-lateral cursor-pointer">
                        <div class="anchura-30-px altura-30-px flex flex-center">${sub.icono}</div>
                        <div class="altura-100-por-ciento flex flex-center anchura-100-por-ciento-menos-30-px">
                            <div class="anchura-100-por-ciento-menos-20-px padding-10px-lateral flex flex-left altura-100-por-ciento">
                                <span>${sub.titulo}</span>
                            </div>
                        </div>
                    </li>
                `);
                $submenu.append($subitem);
            });

            const $itemConSubmenu = $(`
                <li class="altura-40-px has-submenu flex flex-center tarjeta-hover-gray padding-10px-lateral cursor-pointer" style="position: relative;">
                    <div class="anchura-30-px altura-30-px flex flex-center">${opcion.icono}</div>
                    <div class="altura-100-por-ciento flex flex-center anchura-100-por-ciento-menos-60-px">
                        <div class="anchura-100-por-ciento-menos-20-px padding-10px-lateral flex flex-left altura-100-por-ciento">
                            <span>${opcion.titulo}</span>
                        </div>
                    </div>
                    <div class="anchura-30-px altura-30-px flex flex-center">
                        <a class="boton boton-solo-icono anchura-25-px altura-25-px borde-redondeado-50-px flex flex-center tarjeta-hover">
                            <svg width="15" height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.273 3.687a1 1 0 1 1 1.454-1.374l8.5 9a1 1 0 0 1 0 1.374l-8.5 9.001a1 1 0 1 1-1.454-1.373L19.125 12l-7.852-8.313Z"/>
                            </svg>
                        </a>
                    </div>
                </li>
            `);

            $itemConSubmenu.append($submenu);
            $ul.append($itemConSubmenu);
        } else {
            const $item = $(`
                <li class="altura-40-px has-submenu flex flex-center tarjeta-hover-gray padding-10px-lateral cursor-pointer">
                    <div class="anchura-30-px altura-30-px flex flex-center">${opcion.icono}</div>
                    <div class="altura-100-por-ciento flex flex-center anchura-100-por-ciento-menos-30-px">
                        <div class="anchura-100-por-ciento-menos-20-px padding-10px-lateral flex flex-left altura-100-por-ciento">
                            <span>${opcion.titulo}</span>
                        </div>
                    </div>
                </li>
            `);
            $ul.append($item);
        }
    });

    $("body").append($ul);

    const altoMenu = $ul.outerHeight();

    let topAjustado = top;
    let leftAjustado = left;

    // Ajustar vertical
    if (top + altoMenu + margen > windowHeight) {
        topAjustado = top - altoMenu - margen;
        if (topAjustado < margen) topAjustado = margen;
    } else {
        topAjustado = top + margen;
    }

    // Ajustar horizontal
    if (left + anchoMenu + margen > windowWidth) {
        leftAjustado = left - anchoMenu - margen;
        if (leftAjustado < margen) leftAjustado = margen;
    } else {
        leftAjustado = left + margen;
    }

    $ul.css({
        top: `${topAjustado}px`,
        left: `${leftAjustado}px`,
        display: 'block'
    });
}


$('html').on("click", function (e) {
    // Manejo del menú de opciones
    const $menuOpciones = $("#menu-opciones");
    const $botonOpciones = $(".BotonAbrirMenuOpciones");

    if ($menuOpciones.length) {
        const clickDentroMenuOpciones = $menuOpciones.is(e.target) || $menuOpciones.has(e.target).length > 0;
        const clickSobreBotonOpciones = $botonOpciones.is(e.target) || $botonOpciones.has(e.target).length > 0;

        if (!clickDentroMenuOpciones && !clickSobreBotonOpciones) {
            $menuOpciones.remove();
            $("[data-name='FilaDescripcionProducto']").removeClass("tarjeta-active");
        }
    }

    // Manejo del menú contextual
    const $menuContextual = $("#MenuContextual");
    const $botonContextual = $(".BotonAbrirMenuContextual");

    if ($menuContextual.length) {
        const clickDentroMenuContextual = $menuContextual.is(e.target) || $menuContextual.has(e.target).length > 0;
        const clickSobreBotonContextual = $botonContextual.is(e.target) || $botonContextual.has(e.target).length > 0;

        if (!clickDentroMenuContextual && !clickSobreBotonContextual) {
            $menuContextual.remove();
        }
    }
});

$(window).on("resize", cerrarMenusContextuales);

function cerrarMenusContextuales() {
    $("#menu-opciones").remove();
    $("#MenuContextual").remove();
    $("[data-name='FilaDescripcionProducto']").removeClass("tarjeta-active");
}