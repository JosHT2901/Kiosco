let isSyncingScroll = false;
let sucursales
var ProductosSeleccionados = []
var pagina = 1
var RegistrosPorPagina = 10
let debounceTimer
window.addEventListener('message', function (event) {
    /*if (event.data ?.tipo === 'producto-creado') {
            CerrarModal()
    }*/
});

$("#BotonDepartamentosPaginaProductos").click(function (e) {
    AbrirModalIframe('departamentos.php', '530px')
})

$("#BotonAgregarNuevoProducto").click(function (e) {
    AbrirModalIframe('nuevo-producto.php', '530px')
})

$(document).ready(async function (e) {

    MostrarModal(
        ComponerModalCargando('Obteniendo información', 'auto', '400px'),
        false
    );

    await Inicializar_Pagina_Productos();
    await ProcesarSucursalesExistenciasProductos();
    CerrarModal()

})

function ObtenerAlturaContenedor() {
    let alturaConMargen = $("#ContenedorBotonesPaginaProductos").outerHeight(true);
    var $div = $("#ContenedorTablaPaginaProductos")
    $div.css({
        "height": 'calc(100% - ' + alturaConMargen + 'px)'
    });

}

async function Obtener_Producto_Base_Datos(pagina = 1) {
    try {
        // Validación de los parámetros
        if (pagina <= 0 || RegistrosPorPagina <= 0) {
            throw new Error("Los parámetros 'pagina' y 'registrosPorPagina' deben ser mayores que 0.");
        }

        const data = {
            accion: 'Obtener_Productos_Con_Existencias',
            data: {
                pagina: pagina, // Ahora enviamos pagina
                registrosPorPagina: RegistrosPorPagina // Y registrosPorPagina
            }
        };

        // Llamada a la función AJAX
        const response = await ajaxConParametros(undefined, data);
        console.log(response);
        const parsedResponse = JSON.parse(response);

        // Si la respuesta es exitosa, devolvemos los datos
        if (parsedResponse.success) {
            return parsedResponse; // Retornamos los datos para usarlos en otra función
        } else {
            // Si la respuesta no es exitosa, retornamos un arreglo vacío
            return [];
        }
    } catch (error) {
        // Manejo de errores
        console.error("Error al obtener productos:", error);

        // Mostrar mensaje de error en la UI
        const contenido = ComponerContenidoAdvertencia(
            '../../icons/windows/eliminar.png',
            'Error',
            'Intenta más tarde'
        );
        MostrarModal(contenido, false);

        // Retornar un arreglo vacío en caso de error
        return [];
    }
}

async function Inicializar_Pagina_Productos() {
    try {
        const parsedResponse = await Obtener_Producto_Base_Datos(1);
        ObtenerAlturaContenedor();

        if (parsedResponse.success) {
            if ($("#ContenedorTablaPaginaProductos").is(":empty")) {
                ImprimirEstructura();
                ImprimirContenedorTablaProductos()
            }

            ProcesarInformacionProductos(parsedResponse.data);
            EventosTablaProductos();
            EventosEstructuraPaginaProductos();
            ActualizarPaginador(parsedResponse.totalRegistros, parsedResponse.paginaActual, parsedResponse.registrosPorPagina, RenderizarProductos);
        } else {
            if (parsedResponse.message === 'No se encontraron productos.') {
                $("#ContenedorTablaPaginaProductos")
                    .empty()
                    .html(`
                        <div class="anchura-100-por-ciento">
                            <div class="anchura-100-por-ciento flex flex-center margin-10-px-auto position-relative">
                                <img src="../../icons/basic/astronauta.png" style="height:80px">
                            </div>
                            <div class="anchura-100-por-ciento altura-50-px flex flex-center">
                                <span>No hay productos registrados</span>
                            </div>
                        </div>
                    `)
                    .addClass('flex flex-center');
            } else {
                const contenido = ComponerContenidoAdvertencia(
                    '../../icons/windows/eliminar.png',
                    'Error',
                    parsedResponse.message || 'Intenta más tarde'
                );
                console.error(parsedResponse.message);
                MostrarModal(contenido, false);
            }
        }
    } catch (error) {
        const contenido = ComponerContenidoAdvertencia(
            '../../icons/windows/eliminar.png',
            'Error',
            'Intenta más tarde'
        );
        console.error(error);
        MostrarModal(contenido, false);
    }
}

async function RenderizarProductos(pagina) {
    try {

        const parsedResponse = await Obtener_Producto_Base_Datos(pagina);
        if (parsedResponse.success) {
            if (parsedResponse.data.length == 0) {
                $("#ContenedorTablaProductos")
                    .empty()
                    .html(`
                    <div class="anchura-100-por-ciento">
                        <div class="anchura-100-por-ciento flex flex-center margin-10-px-auto position-relative">
                            <img src="../../icons/basic/astronauta.png" style="height:80px">
                        </div>
                        <div class="anchura-100-por-ciento altura-50-px flex flex-center">
                            <span>No hay productos registrados</span>
                        </div>
                    </div>
                `)
                    .addClass('flex flex-center');
            } else {
                $("#ContenedorTablaProductos").removeClass('flex flex-center').empty()
                if ($("#ContenedorTablaProductos").is(":empty")) {
                    ImprimirContenedorTablaProductos()
                }
                ProcesarInformacionProductos(parsedResponse.data);
                EventosTablaProductos();
                VerificarSeleccionTodosProductos()
                ActualizarPaginador(parsedResponse.totalRegistros, parsedResponse.paginaActual, parsedResponse.registrosPorPagina, (pagina) => {
                    RenderizarProductos(pagina);
                });
            }

        } else {
            const contenido = ComponerContenidoAdvertencia(
                '../../icons/windows/eliminar.png',
                'Error',
                parsedResponse.message || 'No se encontraron productos'
            );
            MostrarModal(contenido, false);
        }
    } catch (error) {
        const contenido = ComponerContenidoAdvertencia(
            '../../icons/windows/eliminar.png',
            'Error',
            'Intenta más tarde'
        );
        console.error(error);
        MostrarModal(contenido, false);
    }
}

function ProcesarInformacionProductos(objeto, div = 'ContenedorTablaPaginaProductos') {
    CrearLoader('CargandoTablaProductos', div)
    const tarjetasDescripcion = [];
    const tarjetasInformacionProductos = [];
    const tarjetasExistencias = [];

    $.each(objeto, function (index, Producto) {
        const productoSeleccionado = ProductosSeleccionados.includes(Producto.ProductoID);
        const Checkbox = `
                <div class="anchura-100-por-ciento-con-borde-1px border-1-px-6d6d6d76 padding-5px-superior-inferior margin-5-px-auto flex flex-center borde-redondeado-5-px-izquierdo position-relative tarjeta-con-botones ${productoSeleccionado?'tarjeta-seleccionada':''}" data-name="FilaDescripcionProducto" data-id="${Producto.ProductoID}">
                    <div class="anchura-40-px altura-40-px flex flex-center">
                        <input type="checkbox" class="checkbox-round" name="InputCheckSelectProductos" data-id="${Producto.ProductoID}" ${productoSeleccionado?'checked':''}>
                    </div>
                    <div class=" altura-40-px anchura-100-por-ciento-menos-40-px flex flex-center">
                        <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral flex flex-left padding-5px-lateral ">
                            <span class="texto-truncado">${Producto.Descripcion}</span>
                        </div>
                    </div>
                    <div class="altura-100-por-ciento position-absolute botones-tarjeta-con-botones flex flex-center" style="right:0">
                        <a class="boton boton-solo-icono anchura-35-px altura-35-px tarjeta-hover borde-redondeado-5-px flex flex-center margin-0px-5px BotonAbrirMenuOpciones" name="BotonOpcionesProductos" data-id="${Producto.ProductoID}">
                           <svg width="24" height="24"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                           <path d="M12 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM12 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM10 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"/>
                           </svg>
                        </a>
                    </div>
                </div>`;
        tarjetasDescripcion.push(Checkbox);

        const crearCampoPrecio = (valor, alternativo = 'No aplica') => {
            if (valor === null || valor === undefined) return `<span style="font-weight:600">${alternativo}</span>`;
            return `
                    <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                        <img src="../../icons/basic/pesos-sing.png" style="height: 20px;">
                    </div>
                    <div class="anchura-100-por-ciento-menos-40-px altura-100-por-ciento flex flex-center" style="font-weight:600">
                        <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral altura-100-por-ciento flex flex-right">
                            <span>${valor}</span>
                        </div>
                    </div>`;
        };

        const Info = `
                <div class="padding-5px-superior-inferior margin-5-px-auto flex flex-center contenedor-fila">
                    <div class="contenedor-botones-ancho-fijo">
                        <div class="botones-ancho-fijo altura-40-px anchura-250-px flex flex-center padding-5px-lateral">
                            <span>${Producto.Departamento}</span>
                        </div>
                        <div class="botones-ancho-fijo altura-40-px anchura-200-px flex flex-center padding-5px-lateral bg-color-input">
                            ${crearCampoPrecio(Producto.Precio_Costo_Sin_Impuestos)}
                        </div>
                        <div class="botones-ancho-fijo altura-40-px anchura-200-px flex flex-center padding-5px-lateral">
                            ${crearCampoPrecio(Producto.Precio_Menudeo_Con_Impuestos_Redondeado)}
                        </div>
                        <div class="botones-ancho-fijo altura-40-px anchura-200-px flex flex-center padding-5px-lateral bg-color-input">
                            ${crearCampoPrecio(Producto.Precio_Medio_Mayoreo_Con_Impuestos_Redondeado)}
                        </div>
                        <div class="botones-ancho-fijo altura-40-px anchura-200-px flex flex-center padding-5px-lateral">
                            ${crearCampoPrecio(Producto.Precio_Mayoreo_Con_Impuestos_Redondeado)}
                        </div>
                        <div class="botones-ancho-fijo altura-40-px anchura-200-px flex flex-center padding-5px-lateral bg-color-input" style="font-weight:600">
                            <span>${Producto.Unidad}</span>
                        </div>
                        <div class="botones-ancho-fijo altura-40-px anchura-150-px flex flex-center padding-5px-lateral" style="font-weight:600">
                            <span>${Producto.Tipo ?? 'No aplica'}</span>
                        </div>
                        <div class="botones-ancho-fijo altura-40-px anchura-100-px flex flex-center  padding-5px-lateral  bg-color-input" style="font-weight:600">
                            <div class="anchura-100-por-ciento-menos-40-px altura-100-por-ciento flex flex-center">
                                <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral altura-100-por-ciento flex flex-right">
                                    <span>${Producto.IVA}</span>
                                </div>
                            </div>
                            <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M205.66,61.64l-144,144a8,8,0,0,1-11.32-11.32l144-144a8,8,0,0,1,11.32,11.31ZM50.54,101.44a36,36,0,0,1,50.92-50.91h0a36,36,0,0,1-50.92,50.91ZM56,76A20,20,0,1,0,90.14,61.84h0A20,20,0,0,0,56,76ZM216,180a36,36,0,1,1-10.54-25.46h0A35.76,35.76,0,0,1,216,180Zm-16,0a20,20,0,1,0-5.86,14.14A19.87,19.87,0,0,0,200,180Z"></path></svg>
                            </div>
                        </div>
                        <div class="botones-ancho-fijo altura-40-px anchura-100-px flex flex-center padding-5px-lateral" style="font-weight:600">
                            <div class="anchura-100-por-ciento-menos-40-px altura-100-por-ciento flex flex-center">
                                <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral altura-100-por-ciento flex flex-right">
                                    <span>${Producto.IEPS}</span>
                                </div>
                            </div>
                            <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M205.66,61.64l-144,144a8,8,0,0,1-11.32-11.32l144-144a8,8,0,0,1,11.32,11.31ZM50.54,101.44a36,36,0,0,1,50.92-50.91h0a36,36,0,0,1-50.92,50.91ZM56,76A20,20,0,1,0,90.14,61.84h0A20,20,0,0,0,56,76ZM216,180a36,36,0,1,1-10.54-25.46h0A35.76,35.76,0,0,1,216,180Zm-16,0a20,20,0,1,0-5.86,14.14A19.87,19.87,0,0,0,200,180Z"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>`;
        tarjetasInformacionProductos.push(Info);

        const Existencias = `
                <div class="anchura-100-por-ciento-con-borde-1px border-1-px-6d6d6d76 padding-5px-superior-inferior margin-5-px-auto flex flex-center borde-redondeado-5-px-izquierdo altura-40-px">
                    <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral flex flex-center">
                        <div class="anchura-50-por-ciento altura-100-por-ciento">
                            <div class="anchura-100-por-ciento altura-20-px flex flex-center" style="font-size: 0.65rem; font-weight:600">
                                <span>Sucursal</span>
                            </div>
                            <div class="anchura-anchura-50-por-ciento flex flex-center" style="height: calc(100% - 20px);">
                                <span>${Producto.ExistenciasSucursalActual}</span>
                            </div>
                        </div>
                        <div class="anchura-50-por-ciento altura-100-por-ciento">
                            <div class="anchura-100-por-ciento altura-20-px flex flex-center" style="font-size: 0.65rem; font-weight:600">
                                <span>Otras</span>
                            </div>
                            <div class="anchura-anchura-50-por-ciento flex flex-center" style="height: calc(100% - 20px);">
                                <span>${Producto.ExistenciasOtrasSucursales}</span>
                            </div>
                        </div>
                    </div>
                </div>`;
        tarjetasExistencias.push(Existencias);
    });

    $("#ContenedorTarjetasDescripcionProducto").html(tarjetasDescripcion.join(''));
    $("#ContenedorTarjetasInformacionProductos").html(tarjetasInformacionProductos.join(''));
    $("#ContenedorTarjetasExistenciasProductos").html(tarjetasExistencias.join(''));
    $('#SelectRegistros').select2({
        placeholder: 'Selecciona una opción', // Texto placeholder
        allowClear: false,
        minimumResultsForSearch: Infinity, // Permite limpiar selección
        width: 'resolve', // Adapta el ancho automáticamente
        language: {
            noResults: function () {
                return "No hay resultados";
            }
        }
    });

    $("#SelectRegistros").val(RegistrosPorPagina).trigger('change.select2');
    $("#SelectRegistros").off().on('change', function () {
        RegistrosPorPagina = parseInt($(this).val(), 10);
        console.log(RegistrosPorPagina)
        // Ejemplo: volver a renderizar la tabla
        RenderizarProductos(1); // Cargar desde página 1
    });
    EventosSelect2()
    EliminarLoader('CargandoTablaProductos')
}

async function ImprimirEstructura() {
    $("#ContenedorTablaPaginaProductos").html(`<div class="anchura-100-por-ciento altura-50-px margin-5-px-auto borde-redondeado-5-px bg-color-input flex flex-center position-relative" id="ContenedorBarraAccionesPaginaProductos">
                    <div class="anchura-200-px flex flex-center padding-10px-lateral altura-100-por-ciento" id="ContenedorContadorProductosSeleccionados"></div>
                    <div class="altura-100-por-ciento flex flex-center" style="width:160px" id="ContenedorBotonesAccionesProductosSeleccionados"></div>
                    <div class="altura-100-por-ciento flex flex-center" style="width:calc(100% - (50px + 160px + 220px + 50px));">
                        <div class=" anchura-100-por-ciento-menos-20-px padding-10px-lateral altura-100-por-ciento flex flex-center">
                            <div class="altura-40-px padding-10px-lateral box-shadow-1 borde-redondeado-10-px bg font-09-rem flex flex-center bg-color-white" style="min-width: 80%;">
                                <div class="altura-100-por-ciento flex flex-center  color-letra-subtitulo" style="font-weight: 600; width:calc(100% - 40px)">
                                    <span>Etcétera Morelos</span>
                                </div>
                                <div class="anchura-40-px altura-40-px flex flex-center margin-0px-5px">
                                    <a class="boton boton-solo-icono anchura-30-px altura-30-px tarjeta-hover borde-redondeado-5-px flex flex-center" id="BotonCambiarSucursal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 256 256">
                                        <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z">
                                        </path>
                                    </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="anchura-40-px padding-5px-lateral flex flex-center altura-100-por-ciento">
                        <a class="boton boton-solo-icono anchura-40-px altura-40-px tarjeta-hover borde-redondeado-50-px flex flex-center BotonAbrirMenuContextual" id="BotonFiltrarProductos" title="Filtrar productos">
                         <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 16h4a1 1 0 0 1 .117 1.993L14 18h-4a1 1 0 0 1-.117-1.993L10 16h4-4Zm-2-5h8a1 1 0 0 1 .117 1.993L16 13H8a1 1 0 0 1-.117-1.993L8 11h8-8ZM5 6h14a1 1 0 0 1 .117 1.993L19 8H5a1 1 0 0 1-.117-1.993L5 6h14H5Z"/></svg>
                        </a>
                    </div>
                    <div class="anchura-40-px padding-5px-lateral flex flex-center altura-100-por-ciento">
                        <a class="boton boton-solo-icono anchura-40-px altura-40-px tarjeta-hover borde-redondeado-50-px flex flex-center" id="BotonBuscarProducto" title="Buscar producto">
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 2.5a7.5 7.5 0 0 1 5.964 12.048l4.743 4.745a1 1 0 0 1-1.32 1.497l-.094-.083-4.745-4.743A7.5 7.5 0 1 1 10 2.5Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z"/>
                            </svg>
                        </a>
                    </div>
                </div>
                <div class="anchura-100-por-ciento position-relative" id="ContenedorTablaProductos" style="height: calc(100% - 50px - 10px);" ></div>
            `)
}

function EventosTablaProductos() {
    $("#DivContenedorTarjetasDescripcionProducto, #DivContenedorTarjetasInformacionProductos, #DivContenedorTarjetasExistenciasProductos").on("scroll", function () {
        syncScroll(this);
    });
    $("#DivContenedorTarjetasInformacionProductos, #ContenedorCabecerasTablaListaCompra").on("scroll", function () {
        // Obtener el desplazamiento horizontal del elemento actual
        var scrollLeft = $(this).scrollLeft();

        // Sincronizar el scroll horizontal del otro elemento
        if (this.id === "DivContenedorTarjetasInformacionProductos") {
            $("#ContenedorCabecerasTablaListaCompra").scrollLeft(scrollLeft);
        } else {
            $("#DivContenedorTarjetasInformacionProductos").scrollLeft(scrollLeft);
        }
    });
    $("[name='BotonOpcionesProductos']").click(function (e) {
        const posicion = $(this).offset();
        const productoId = $(this).data("id"); // Obtener el ID del producto desde el botón
        const filaProducto = $(`[data-name="FilaDescripcionProducto"][data-id="${productoId}"]`); // Buscar la fila correspondiente

        const $menu = $("#menu-opciones");

        // Si el menú está visible y el clic es sobre el mismo botón, lo cerramos
        if ($menu.length > 0 && $menu.is(":visible") && $(this).data("id") === $menu.data("productoId")) {
            $menu.remove(); // Cerrar el menú
            // Eliminar la clase tarjeta-active de todas las filas
            $("[data-name='FilaDescripcionProducto']").removeClass("tarjeta-active");
        } else {
            // Si el menú está abierto pero se hizo clic en otro botón, mover el menú
            if ($menu.length > 0 && $menu.is(":visible")) {
                // Eliminar la clase tarjeta-active de todas las filas
                $("[data-name='FilaDescripcionProducto']").removeClass("tarjeta-active");
                // Asignamos la clase activa a la fila del producto
                if (filaProducto.length) {
                    filaProducto.addClass("tarjeta-active");
                }

                // Actualizamos la posición del menú
                MostrarMenuOpciones(posicion.top, posicion.left, opcionesMenuProductos);
            } else {
                // Si el menú no está abierto, lo mostramos
                MostrarMenuOpciones(posicion.top, posicion.left, opcionesMenuProductos);

                // Asignamos la clase activa (tarjeta-active) a la fila del producto
                if (filaProducto.length) {
                    // Eliminar la clase tarjeta-active de todas las filas
                    $("[data-name='FilaDescripcionProducto']").removeClass("tarjeta-active");
                    filaProducto.addClass("tarjeta-active");
                }
            }

            // Guardamos el ID del producto al que pertenece el menú actual
            $("#menu-opciones").data("productoId", productoId);
        }
    });
    $("[name='InputCheckSelectProductos']").change(function (e) {
        var id = $(this).data('id');

        if ($(this).is(":checked")) {
            // Si el ID no está, lo agregamos
            if (!ProductosSeleccionados.includes(id)) {
                ProductosSeleccionados.push(id);
            }

            // Agregar clases a la fila correspondiente
            $(`[data-name='FilaDescripcionProducto'][data-id='${id}']`).addClass('tarjeta-seleccionada');

        } else {
            // Si el ID ya estaba, lo quitamos
            ProductosSeleccionados = ProductosSeleccionados.filter(item => item !== id);

            // Quitar clases de la fila correspondiente
            $(`[data-name='FilaDescripcionProducto'][data-id='${id}']`).removeClass('tarjeta-seleccionada');
        }

        // Actualizar contador y botones
        ActualizarBotonesProductosSeleccionados();
    });

    $("#CheckSelectTodosProductos").change(function (e) {
        const isChecked = $(this).is(':checked');

        if (isChecked) {
            // Marcar todos los checkboxes individuales
            $("input[name='InputCheckSelectProductos']").each(function () {
                const id = $(this).data('id');
                $(this).prop('checked', true);

                // Agregar clase activa a la fila del producto
                $(`[data-name='FilaDescripcionProducto'][data-id='${id}']`).addClass('tarjeta-seleccionada');

                // Agregar al array si no está
                if (!ProductosSeleccionados.includes(id)) {
                    ProductosSeleccionados.push(id);
                }
            });
        } else {
            // Desmarcar todos los checkboxes individuales
            $("input[name='InputCheckSelectProductos']").each(function () {
                const id = $(this).data('id');
                $(this).prop('checked', false);

                // Quitar clase activa de la fila del producto
                $(`[data-name='FilaDescripcionProducto'][data-id='${id}']`).removeClass('tarjeta-seleccionada');
            });

            // Vaciar la selección
            ProductosSeleccionados = [];
        }

        // Actualizar contador y botones
        ActualizarBotonesProductosSeleccionados();
    });
}

function syncScroll(source) {
    if (isSyncingScroll) return;
    isSyncingScroll = true;

    let scrollTop = $(source).scrollTop();

    const containers = [
        "#DivContenedorTarjetasDescripcionProducto",
        "#DivContenedorTarjetasInformacionProductos",
        "#DivContenedorTarjetasExistenciasProductos"
    ];

    containers.forEach(id => {
        if (id !== "#" + $(source).attr("id")) {
            $(id).scrollTop(scrollTop);
        }
    });

    isSyncingScroll = false;
}

$("#DivContenedorTarjetasDescripcionProducto, #DivContenedorTarjetasInformacionProductos, #DivContenedorTarjetasExistenciasProductos").on("scroll", function () {
    syncScroll(this);
});

async function ProcesarSucursalesExistenciasProductos() {
    const $select = $("#SelectSucursalExisteciasProductos");

    const data = {
        accion: 'Obtener_Sucursales_Con_Sucursal_Actual',
    };

    try {
        // Llamada AJAX para obtener las sucursales
        var response = await ajaxConParametros(undefined, data);
        response = JSON.parse(response)
        // Verificar si la respuesta es correcta
        if (!response.success) {
            throw new Error(response.message);
        }
        console.log(response)
        // Obtener la sucursal actual y otras sucursales
        const sucursalActual = response.data.sucursal_actual;
        const sucursales = response.data.otras_sucursales;

        // Limpiar y preparar el select
        $select.empty();
        $select.append(new Option('-- Selecciona una sucursal --', ''));

        // Agregar las opciones al select
        sucursales.forEach(sucursal => {
            let texto = sucursal.Nombre;

            if (sucursal.ID === sucursalActual.ID) {
                texto = `Sucursal actual - ${sucursal.Nombre}`;
            }

            const option = new Option(texto, sucursal.id);


            $select.append(option);
        });

        // Inicializar select2
        $select.select2({
            placeholder: 'Buscar sucursal...',
            allowClear: false
        })

    } catch (error) {
        // Manejo de errores
        const contenido = ComponerContenidoAdvertencia(
            '../../icons/windows/eliminar.png',
            'Error',
            'Intenta más tarde'
        );
        console.error("Error en Obtener_Sucursales:", error);
        MostrarModal(contenido, false);
    }
}


function ActualizarBotonesProductosSeleccionados() {
    const cantidad = ProductosSeleccionados.length;

    if (cantidad > 0) {
        let texto = '';

        if (cantidad === 1) {
            texto = '1 seleccionado';
        } else if (cantidad >= 2 && cantidad < 100) {
            texto = `${cantidad} seleccionados`;
        } else {
            texto = '99+ seleccionados';
        }

        const contadorHTML = `
            <div class="anchura-100-por-ciento altura-35-px borde-redondeado-50-px color1474c4 bg-color-dbedf8 font-08-rem flex flex-center" style="font-weight:600">
                <div class="anchura-100-por-ciento-menos-40-px altura-100-por-ciento">
                    <div class="anchura-100-por-ciento-menos-20-px padding-10px-lateral altura-100-por-ciento flex flex-center">
                        <span>${texto}</span>
                    </div>
                </div>
                <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                    <a class="boton boton-solo-icono anchura-30-px altura-30-px tarjeta-hover borde-redondeado-50-px flex flex-center margin-0px-5px" id="BotonLimpiarContadorProductos">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                            <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                        </svg>
                    </a>
                </div>
            </div>`;

        const botonesHTML = `
           <a class="boton boton-solo-icono anchura-30-px altura-30-px tarjeta-hover borde-redondeado-50-px flex flex-center margin-0px-5px" id="BotonMenuCuentaUsuario">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.5 6a1 1 0 0 1-.883.993L20.5 7h-.845l-1.231 12.52A2.75 2.75 0 0 1 15.687 22H8.313a2.75 2.75 0 0 1-2.737-2.48L4.345 7H3.5a1 1 0 0 1 0-2h5a3.5 3.5 0 1 1 7 0h5a1 1 0 0 1 1 1Zm-7.25 3.25a.75.75 0 0 0-.743.648L13.5 10v7l.007.102a.75.75 0 0 0 1.486 0L15 17v-7l-.007-.102a.75.75 0 0 0-.743-.648Zm-4.5 0a.75.75 0 0 0-.743.648L9 10v7l.007.102a.75.75 0 0 0 1.486 0L10.5 17v-7l-.007-.102a.75.75 0 0 0-.743-.648ZM12 3.5A1.5 1.5 0 0 0 10.5 5h3A1.5 1.5 0 0 0 12 3.5Z""/>
                        </svg>
                    </a>
                    <a class="boton boton-solo-icono anchura-30-px altura-30-px tarjeta-hover borde-redondeado-50-px flex flex-center margin-0px-5px" id="BotonMenuCuentaUsuario">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 17.5v1.25A2.25 2.25 0 0 1 15.75 21h-7.5A2.25 2.25 0 0 1 6 18.75v-1.251l-1.75.001A2.25 2.25 0 0 1 2 15.25V9.254a3.25 3.25 0 0 1 3.25-3.25l.749-.001L6 5.25A2.25 2.25 0 0 1 8.25 3h7.502a2.25 2.25 0 0 1 2.25 2.25v.753h.75a3.254 3.254 0 0 1 3.252 3.25l.003 5.997a2.249 2.249 0 0 1-2.248 2.25H18Zm-2.25-4h-7.5a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 0-.75-.75Zm.002-9H8.25a.75.75 0 0 0-.75.75l-.001.753h9.003V5.25a.75.75 0 0 0-.75-.75Z"/>
                        </svg>
                    </a>
                     <a class="boton boton-solo-icono anchura-30-px altura-30-px tarjeta-hover borde-redondeado-50-px flex flex-center margin-0px-5px" id="BotonMenuCuentaUsuario">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"viewBox="0 0 256 256">
                        <path d="M176,160a39.89,39.89,0,0,0-28.62,12.09l-46.1-29.63a39.8,39.8,0,0,0,0-28.92l46.1-29.63a40,40,0,1,0-8.66-13.45l-46.1,29.63a40,40,0,1,0,0,55.82l46.1,29.63A40,40,0,1,0,176,160Zm0-128a24,24,0,1,1-24,24A24,24,0,0,1,176,32ZM64,152a24,24,0,1,1,24-24A24,24,0,0,1,64,152Zm112,72a24,24,0,1,1,24-24A24,24,0,0,1,176,224Z"></path>
                        </svg>
                    </a>
                    <a class="boton boton-solo-icono anchura-30-px altura-30-px tarjeta-hover borde-redondeado-50-px flex flex-center margin-0px-5px" id="BotonMenuCuentaUsuario">
                        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM12 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM10 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"/>
                        </svg>
                    </a>`;

        $("#ContenedorContadorProductosSeleccionados").html(contadorHTML);
        $("#ContenedorBotonesAccionesProductosSeleccionados").html(botonesHTML);
        $("#BotonLimpiarContadorProductos").click(function (e) {
            e.preventDefault();

            // Vaciar array de productos seleccionados
            ProductosSeleccionados = [];

            // Desmarcar todos los checkboxes
            $("input[name='InputCheckSelectProductos']").each(function () {
                $(this).prop('checked', false);
            });

            // Quitar clases de todas las filas de productos
            $("[data-name='FilaDescripcionProducto']").removeClass('tarjeta-seleccionada');

            // Desmarcar el checkbox de seleccionar todos
            $("#CheckSelectTodosProductos").prop('checked', false);

            // Actualizar contador y botones
            ActualizarBotonesProductosSeleccionados();
        });
    } else {
        $("#ContenedorContadorProductosSeleccionados").empty();
        $("#ContenedorBotonesAccionesProductosSeleccionados").empty();
    }
}

function ActualizarPaginador(totalRegistros, paginaActual, registrosPorPagina, callbackRenderizado) {
    const totalPaginas = Math.ceil(totalRegistros / registrosPorPagina);
    const $paginador = $("#PaginadorProductos");
    $paginador.empty();

    const crearBoton = (pagina, iconoSVG) => $('<div>')
        .addClass('anchura-35-px altura-35-px flex flex-center borde-redondeado-50-por-ciento bg-color-input margin-0px-5px tarjeta-hover boton boton-solo-icono')
        .on('click', () => callbackRenderizado(pagina))
        .html(iconoSVG);

    const agregarPagina = (i) => {
        const $pagina = $('<div>')
            .addClass('anchura-35-px altura-35-px flex flex-center borde-redondeado-50-por-ciento margin-0px-5px bg-color-input tarjeta-hover cursor-pointer')
            .html(`<span>${i}</span>`)
            .on('click', () => callbackRenderizado(i));

        if (i === paginaActual) {
            $pagina.addClass('tarjeta-active cursor-default').removeClass('tarjeta-hover cursor-pointer');
        } else {
            $pagina.css('font-weight', '700').addClass('color1474c4');
        }

        $paginador.append($pagina);
    };

    // Primera página
    if (paginaActual > 1) {
        $paginador.append(crearBoton(1, `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256">
                <path d="M200.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L129,128ZM72,36A12,12,0,0,0,60,48V208a12,12,0,0,0,24,0V48A12,12,0,0,0,72,36Z"></path>
            </svg>`));
    }

    // Página anterior
    if (paginaActual > 1) {
        $paginador.append(crearBoton(paginaActual - 1, `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256">
                <path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"></path>
            </svg>`));
    }

    // Páginas
    if (paginaActual - 1 >= 1) agregarPagina(paginaActual - 1);
    agregarPagina(paginaActual);
    if (paginaActual + 1 <= totalPaginas) agregarPagina(paginaActual + 1);

    if (paginaActual + 2 < totalPaginas) {
        $paginador.append(`<div class="anchura-35-px altura-35-px flex flex-center margin-0px-5px color1474c4 border-1-px-6d6d6d76 borde-redondeado-50-por-ciento cursor-default">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 256 256">
                        <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"></path>
                    </svg>
                </span>
            </div>`);
    }

    if (paginaActual + 1 < totalPaginas) agregarPagina(totalPaginas);

    // Página siguiente
    if (paginaActual < totalPaginas) {
        $paginador.append(crearBoton(paginaActual + 1, `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256">
                <path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"></path>
            </svg>`));
    }

    // Última página
    if (paginaActual < totalPaginas) {
        $paginador.append(crearBoton(totalPaginas, ` <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256">
                <path d="M152.49,119.51a12,12,0,0,1,0,17l-80,80a12,12,0,0,1-17-17L127,128,55.51,56.49a12,12,0,0,1,17-17ZM184,36a12,12,0,0,0-12,12V208a12,12,0,0,0,24,0V48A12,12,0,0,0,184,36Z"></path>
            </svg>`));
    }

    // Contador
    $("#ContenedorContadorPaginas").html(`
        <div class="cursor-pointer padding-10px-lateral altura-35-px font-09-rem bg-color-dbedf8 color1474c4 flex flex-center borde-redondeado-50-px" id="ContenedorTotalPaginas">
            <span id="SpanTotalPaginas">${paginaActual} de ${totalPaginas} páginas</span>
        </div>
        <input type="check" id="InputCheckVerTotalPaginas" style="display:none">
    `);
    $("#ContenedorTotalPaginas").on("click", function () {
        var inputCheckbox = $("#InputCheckVerTotalPaginas");

        // Alternar el estado del checkbox oculto
        var isChecked = inputCheckbox.prop('checked');
        inputCheckbox.prop('checked', !isChecked);

        // Actualizar el texto directamente aquí
        if (inputCheckbox.prop('checked')) {
            $("#SpanTotalPaginas").text(totalRegistros + ' productos');
        } else {
            $("#SpanTotalPaginas").text(paginaActual + ' de ' + totalPaginas + ' páginas');
        }
    });
}

function EventosEstructuraPaginaProductos() {
    $("#BotonBuscarProducto").click(function (e) {
        // Verificar si el div ya existe
        var $contenedor = $("#ContenedorBarraAccionesAdicionalesProducto");

        if ($contenedor.length === 0) {
            // Si el div no existe, crearlo y agregarlo
            $("#ContenedorBarraAccionesPaginaProductos").append(`
                <div id="ContenedorBarraAccionesAdicionalesProducto" class="padding-10px-lateral anchura-80-por-ciento altura-40-px bg-color-white position-absolute flex flex-center box-shadow-1 borde-redondeado-50-px">
                    <div class="altura-30-px anchura-100-por-ciento flex flex-center">
                        <div class="altura-100-por-ciento anchura-100-por-ciento-menos-80-px padding-10px-lateral flex flex-center">
                            <input class="input" placeholder="Buscar producto ..." id="InputBuscarProducto" style="border:none">
                        </div>
                        <div class="anchura-30-px altura-100-por-ciento flex flex-center margin-0px-5px">
                            <a class="boton boton-solo-icono anchura-30-px altura-30-px tarjeta-hover borde-redondeado-50-px flex flex-center" id="BotonLimpiarInputBuscarProducto">
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.75 4a3.25 3.25 0 0 1 3.245 3.066L22 7.25v9.5a3.25 3.25 0 0 1-3.066 3.245L18.75 20h-8.501a3.25 3.25 0 0 1-2.085-.756l-.155-.139-4.995-4.75a3.25 3.25 0 0 1-.116-4.594l.116-.116 4.995-4.75a3.25 3.25 0 0 1 2.032-.888L10.25 4h8.501Zm-7.304 4.397a.75.75 0 0 0-1.049 1.05l.073.083L12.94 12l-2.47 2.47-.073.084a.75.75 0 0 0 1.05 1.049l.083-.073L14 13.061l2.47 2.47.084.072a.75.75 0 0 0 1.049-1.05l-.073-.083L15.061 12l2.47-2.47.072-.084a.75.75 0 0 0-1.05-1.049l-.083.073L14 10.939l-2.47-2.47-.084-.072Z"/>
                                </svg>
                            </a>
                        </div>
                        <div class="anchura-30-px altura-100-por-ciento flex flex-center margin-0px-5px">
                            <a class="boton boton-solo-icono anchura-30-px altura-30-px tarjeta-hover borde-redondeado-50-px flex flex-center" id="BotonCerrarBusquedaProducto">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>`);

            // Calcular la posición correcta para el nuevo div
            const posicion = $("#BotonBuscarProducto").parent().offset();
            const leftPos = posicion.left - $("#ContenedorBarraAccionesAdicionalesProducto").outerWidth(); // 10px de margen

            // Verificar si el div se sale del lado izquierdo de la ventana
            if (leftPos < 0) {
                $("#ContenedorBarraAccionesAdicionalesProducto").css('left', '10px'); // Pegado al borde izquierdo
            } else {
                $("#ContenedorBarraAccionesAdicionalesProducto").css('left', leftPos + 'px');
            }

        } else {
            // Si el div ya existe, solo actualizar el contenido y la posición

            // Actualizar el contenido
            $("#ContenedorBarraAccionesAdicionalesProducto").html(`
                <div class="altura-30-px anchura-100-por-ciento flex flex-center">
                    <div class="altura-100-por-ciento anchura-100-por-ciento-menos-80-px padding-10px-lateral flex flex-center">
                        <input class="input" placeholder="Buscar producto ..." id="InputBuscarProducto" style="border:none">
                    </div>
                    <div class="anchura-30-px altura-100-por-ciento flex flex-center margin-0px-5px">
                        <a class="boton boton-solo-icono anchura-30-px altura-30-px tarjeta-hover borde-redondeado-50-px flex flex-center" id="BotonLimpiarInputBuscarProducto">
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.75 4a3.25 3.25 0 0 1 3.245 3.066L22 7.25v9.5a3.25 3.25 0 0 1-3.066 3.245L18.75 20h-8.501a3.25 3.25 0 0 1-2.085-.756l-.155-.139-4.995-4.75a3.25 3.25 0 0 1-.116-4.594l.116-.116 4.995-4.75a3.25 3.25 0 0 1 2.032-.888L10.25 4h8.501Zm-7.304 4.397a.75.75 0 0 0-1.049 1.05l.073.083L12.94 12l-2.47 2.47-.073.084a.75.75 0 0 0 1.05 1.049l.083-.073L14 13.061l2.47 2.47.084.072a.75.75 0 0 0 1.049-1.05l-.073-.083L15.061 12l2.47-2.47.072-.084a.75.75 0 0 0-1.05-1.049l-.083.073L14 10.939l-2.47-2.47-.084-.072Z"/>
                            </svg>
                        </a>
                    </div>
                    <div class="anchura-30-px altura-100-por-ciento flex flex-center margin-0px-5px">
                        <a class="boton boton-solo-icono anchura-30-px altura-30-px tarjeta-hover borde-redondeado-50-px flex flex-center" id="BotonCerrarBusquedaProducto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path>
                            </svg>
                        </a>
                    </div>
                </div>`);

            // Calcular la nueva posición del div
            const posicion = $("#BotonBuscarProducto").parent().offset();
            const leftPos = posicion.left - $contenedor.outerWidth(); // 10px de margen

            // Verificar si el div se sale del lado izquierdo de la ventana
            if (leftPos < 0) {
                $contenedor.css('left', '10px'); // Pegado al borde izquierdo
            } else {
                $contenedor.css('left', leftPos + 'px');
            }
        }

        // Llamar a la función que necesitas
        EventoBuscarProducto();
    });


    $("#BotonFiltrarProductos").click(function (e) {
        let $contenedor = $("#ContenedorBarraAccionesAdicionalesProducto");
    
        // Generar botones desde las opciones
        const botones = opcionesMenuFiltroProductos.map(opcion => `
            <a class="boton altura-30-px margin-0px-5px padding-10px-lateral boton-secundario border-1-px-6d6d6d76 flex flex-center font-09-rem position-relative borde-redondeado-15-px botones-ancho-fijo">
                <div class="altura-100-por-ciento padding-10px-lateral flex flex-center">
                    <span>${opcion.titulo}</span>
                </div>
                <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                        <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                </div>
            </a>
        `).join("");
    
        // Si el contenedor no existe, crearlo
        if ($contenedor.length === 0) {
            $("#ContenedorBarraAccionesPaginaProductos").append(`
                <div id="ContenedorBarraAccionesAdicionalesProducto" class="padding-10px-lateral anchura-80-por-ciento altura-40-px bg-color-white position-absolute flex flex-center box-shadow-1 borde-redondeado-50-px">
                    <div class="altura-100-por-ciento anchura-100-por-ciento-menos-60-px margin-0px-10px flex flex-center contenedor overflow-auto">
                        <div class="contenedor-botones-ancho-fijo" id="ContenedorBotonesAccionesFiltroProductos">
                            ${botones}
                        </div>
                    </div>
                    <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                        <a class="boton boton-solo-icono anchura-30-px altura-30-px tarjeta-hover borde-redondeado-50-px flex flex-center" id="BotonCerrarFiltroProductos">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                                <path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            `);
    
            $contenedor = $("#ContenedorBarraAccionesAdicionalesProducto"); // Reasignar ahora que existe
        } else {
            // Solo actualizamos los botones, sin borrar el contenedor
            $("#ContenedorBotonesAccionesFiltroProductos").html(botones);
        }
    
        // Calcular y aplicar la posición
        const posicion = $("#BotonFiltrarProductos").parent().offset();
        const leftPos = posicion.left - $contenedor.outerWidth();
    
        $contenedor.css('left', (leftPos < 0 ? 10 : leftPos) + 'px');
    
        // Evento para cerrar
        $("#BotonCerrarFiltroProductos").off("click").on("click", function () {
            RenderizarProductos(1);
            $contenedor.remove();
        });
    });
}

function EventoBuscarProducto() {
    $("#InputBuscarProducto").on('keyup', function () {
        clearTimeout(debounceTimer); // limpia el temporizador anterior
        const valor = $(this).val().trim();

        debounceTimer = setTimeout(() => {
            RenderizarProductosFiltrados(valor, 1); // inicia desde página 1
        }, 300); // espera 300 ms después del último tecleo
    });
    $("#BotonLimpiarInputBuscarProducto").click(function (e) {
        if ($("#InputBuscarProducto").val().length != 0) {
            $("#InputBuscarProducto").val('')
            RenderizarProductos(1)
        }
    })
    $("#BotonCerrarBusquedaProducto").click(function (e) {
        const valorBusqueda = $("#InputBuscarProducto").val().trim();

        if (valorBusqueda !== "") {
            RenderizarProductos(1);
        }
        $("#ContenedorBarraAccionesAdicionalesProducto").remove();
    });


}

async function Obtener_Productos_Busqueda_Base_Datos(pagina = 1, valor = '') {
    try {
        if (pagina <= 0 || RegistrosPorPagina <= 0) {
            throw new Error("Los parámetros 'pagina' y 'RegistrosPorPagina' deben ser mayores que 0.");
        }

        const data = {
            accion: 'Buscar_Productos_Con_Existencias',
            data: {
                pagina,
                registrosPorPagina: RegistrosPorPagina,
                valorBusqueda: valor
            }
        };

        const response = await ajaxConParametros(undefined, data);
        const parsedResponse = JSON.parse(response);

        return parsedResponse; // Si hay error, se maneja en el catch
    } catch (error) {
        console.error("Error al obtener productos:", error);

        const contenido = ComponerContenidoAdvertencia(
            '../../icons/windows/eliminar.png',
            'Error',
            'Intenta más tarde'
        );
        MostrarModal(contenido, false);

        return {
            success: false,
            data: []
        };
    }
}

async function RenderizarProductosFiltrados(valor, pagina = 1) {
    try {
        const parsedResponse = await Obtener_Productos_Busqueda_Base_Datos(pagina, valor);

        if (parsedResponse.success) {
            const productos = parsedResponse.data;

            if (productos.length === 0) {
                $("#ContenedorTarjetasExistenciasProductos, #ContenedorTarjetasInformacionProductos, #ContenedorTarjetasDescripcionProducto").empty();
                $("#ContenedorTablaProductos").html(ImprimirNoHayResultados($("#ContenedorTablaProductos"), 'No hay productos')).addClass('flex flex-center');
            } else {
                $("#ContenedorTablaProductos").removeClass('flex flex-center').empty();
                if ($("#ContenedorTablaProductos").is(":empty")) {
                    ImprimirContenedorTablaProductos()
                }
                ProcesarInformacionProductos(productos, 'ContenedorTablaProductos');
                EventosTablaProductos();
                VerificarSeleccionTodosProductos()
                ActualizarPaginador(
                    parsedResponse.totalRegistros,
                    parsedResponse.paginaActual,
                    parsedResponse.registrosPorPagina,
                    (nuevaPagina) => RenderizarProductosFiltrados(valor, nuevaPagina)
                );
            }
        } else {
            const contenido = ComponerContenidoAdvertencia(
                '../../icons/windows/eliminar.png',
                'Error',
                parsedResponse.message || 'No se encontraron productos'
            );
            MostrarModal(contenido, false);
        }
    } catch (error) {
        console.error(error);
        const contenido = ComponerContenidoAdvertencia(
            '../../icons/windows/eliminar.png',
            'Error',
            'Intenta más tarde'
        );
        MostrarModal(contenido, false);
    }
}


function ImprimirContenedorTablaProductos() {
    $("#ContenedorTablaProductos").html(`<div class="anchura-100-por-ciento" style="height:calc(100% - 50px)">
                        <div class="anchura-100-por-ciento altura-60-px flex flex-center font-09-rem">
                            <div class=" altura-100-por-ciento anchura-300-px">
                                <div class="botones-ancho-fijo altura-60-px flex flex-center padding-5px-lateral borde-redondeado-5-px-izquierdo" style="width: calc(100% - 10px);font-weight: 600;">
                                    <div class="anchura-40-px altura-40-px flex flex-center">
                                        <input type="checkbox" class="checkbox-round" id="CheckSelectTodosProductos">
                                    </div>
                                    <div class="altura-100-por-ciento anchura-100-por-ciento-menos-40-px flex flex-center">
                                        <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral flex flex-left padding-5px-lateral">
                                            <span>Descripción</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="altura-100-por-ciento padding-5px-lateral" style="width: calc(100% - 450px - 10px);">
                                <div class="contenedor-botones-ancho-fijo scroll-invisible anchura-100-por-ciento" id="ContenedorCabecerasTablaListaCompra" style="display: flex;font-weight: 600;">
                                    <div class="botones-ancho-fijo altura-60-px anchura-250-px flex flex-center padding-5px-lateral " >
                                        <span>Departamento</span>
                                    </div>
                                    <div class="botones-ancho-fijo altura-60-px anchura-200-px flex flex-center padding-5px-lateral bg-color-input">
                                        <span>Costo</span>
                                    </div>
                                    <div class="botones-ancho-fijo altura-60-px anchura-200-px flex flex-center padding-5px-lateral ">
                                        <span>Precio menudeo</span>
                                    </div>
                                    <div class="botones-ancho-fijo altura-60-px anchura-200-px flex flex-center padding-5px-lateral bg-color-input">
                                        <span>Precio medio mayoreo</span>
                                    </div>
                                    <div class="botones-ancho-fijo altura-60-px anchura-200-px flex flex-center  padding-5px-lateral">
                                        <span>Precio mayoreo</span>
                                    </div>
                                    <div class="botones-ancho-fijo altura-60-px anchura-200-px flex flex-center padding-5px-lateral bg-color-input">
                                        <span>Unidad de venta</span>
                                    </div>
                                    <div class="botones-ancho-fijo altura-60-px anchura-150-px flex flex-center padding-5px-lateral ">
                                        <span>Tipo de venta</span>
                                    </div>
                                    <div class="botones-ancho-fijo altura-60-px anchura-100-px flex flex-center padding-5px-lateral  bg-color-input">
                                        <span>I.V.A.</span>
                                    </div>
                                    <div class="botones-ancho-fijo altura-60-px anchura-100-px flex flex-center padding-5px-lateral">
                                        <span>I.E.P.S.</span>
                                    </div>
                                </div>
                            </div>

                            <div class="anchura-150-px altura-100-por-ciento botones-ancho-fijo">
                                <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral flex flex-center" style="font-weight:600">
                                    <span>Existencias</span>
                                </div>
                            </div>
                        </div>
                        <div class="anchura-100-por-ciento flex flex-center" style="height: calc(100% - 65px);">
                            <div class="altura-100-por-ciento padding-5px-lateral" style="width: calc(300px - 10px);">
                                <div class="anchura-100-por-ciento altura-100-por-ciento overflow-auto scroll-invisible" id="DivContenedorTarjetasDescripcionProducto">
                                    <div class="anchura-100-por-ciento overflow-auto" id="ContenedorTarjetasDescripcionProducto"></div>
                                </div>
                            </div>
                            <div class="altura-100-por-ciento padding-5px-lateral" style="width: calc(100% - 300px - 150px - 10px);">
                                <div class="anchura-100-por-ciento altura-100-por-ciento overflow-auto scroll-invisible" id="DivContenedorTarjetasInformacionProductos">
                                    <div class="anchura-100-por-ciento" id="ContenedorTarjetasInformacionProductos"></div>
                                </div>
                            </div>
                            <div class="anchura-150-px altura-100-por-ciento overflow-auto" id="DivContenedorTarjetasExistenciasProductos">
                                <div class="anchura-100-por-ciento overflow-auto" id="ContenedorTarjetasExistenciasProductos">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="anchura-100-por-ciento altura-40-px margin-5-px-auto flex flex-center">
                        <div class="altura-100-por-ciento flex flex-center" style="width:150px; font-weight:600" id="ContenedorContadorPaginas"></div>
                        <div class="altura-100-por-ciento flex flex-center" style="width:calc(100% - 230px - 150px)" id="PaginadorProductos"></div>
                        <div class="altura-100-por-ciento flex flex-center padding-5px-lateral">
                            <div class=" anchura-60-px altura-100-por-ciento flex flex-center font-09-rem padding-5px-lateral">
                                <span>Mostrar:</span>
                            </div> 
                            <div class="anchura-80-px altura-100-por-ciento flex flex-center">
                                <div class="altura-35-px anchura-100-por-ciento flex flex-center">
                                    <select id="SelectRegistros">
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value="250">250</option>
                                        <option value="500">500</option>
                                    </select>
                                </div>
                            </div>
                            <div class="altura-100-por-ciento flex flex-center anchura-60-px font-09-rem padding-5px-lateral">
                                <span>registros</span>
                            </div>
                        </div>
                </div>`)
}

function VerificarSeleccionTodosProductos() {
    const totalChecks = $("input[name='InputCheckSelectProductos']").length;
    const totalChecksSeleccionados = $("input[name='InputCheckSelectProductos']:checked").length;

    // Si todos están seleccionados, marcar el checkbox maestro
    $("#CheckSelectTodosProductos").prop("checked", totalChecks > 0 && totalChecks === totalChecksSeleccionados);
}