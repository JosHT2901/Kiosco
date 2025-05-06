let respuesta
let debounceTimeout;
let ordenAscendente = true;
$(document).ready(function (e) {
    MostrarModal(ComponerModalCargando('Obteniendo información', 'auto', '400px'), false, false);
    Inicializar_Pagina_Existencias()
})
// Función principal de inicialización
function Inicializar_Pagina_Existencias() {
   

    DesencriptarURLToken()
        .then(id => {
            const data = {
                accion: 'Obtener_Existencias_Producto',
                data: id
            };
            ajaxConParametros(undefined, data)
                .then(response => {
                    response = JSON.parse(response)
                    respuesta = response.existencias
                    if (response.success) {
                        $("#SpanNombreProductoExistencias").text(response.producto.Descripcion)
                        $("#SpanCodigoProductoExistencias").text(response.producto.Codigo)
                        $("#SpanCodigoProductoExistencias").parent().addClass('bg-color-dbedf8 ')
                        ImprimirEstructuraDivTablaExistencias(response.existencias)
                    } else {
                        if (response.message == 'No hay existencias registradas para este producto.') {
                            $("#SpanNombreProductoExistencias").text(response.producto.Descripcion)
                            $("#SpanCodigoProductoExistencias").text(response.producto.Codigo)
                            $("#SpanCodigoProductoExistencias").parent().addClass('bg-color-dbedf8 ')
                            ImprimirNoHayResultados($("#ContenedorTablaExistenciasProductos"), 'No hay existencias')
                        } else {
                            ImprimirNoHayResultados(parent.$("#ContenedorContenidoModal"), 'Upps. Ocurrió un error')
                        }
                    }
                    CerrarModal();
                });
        })
        .catch(error => {
            console.error("Error al inicializar la página:", error);
            ImprimirNoHayResultados(parent.$("#ContenedorContenidoModal"), 'Upps. Ocurrió un error')
        })
}

function ImprimirEstructuraDivTablaExistencias(data) {
    tarjetas = mostrarResultados(data)
    $("#ContenedorTablaExistenciasProductos").html(`<div class="anchura-100-por-ciento altura-40-px margin-10-px-auto">
                <div class="anchura-100-por-ciento altura-100-por-ciento borde-redondeado-10-px bg-color-input flex flex-center">
                    <div class="altura-100-por-ciento anchura-100-por-ciento-menos-40-px">
                        <input class="input" placeholder="Buscar sucursal..." id="InputBuscarSucursalExistenciasProducto" style="border:none;height:100%">
                    </div>
                    <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                        <a class="boton boton-solo-icono anchura-30-px altura-30-px tarjeta-hover borde-redondeado-50-px flex flex-center" id="BotonBuscarProducto" title="Buscar producto">
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="m4.21 4.387.083-.094a1 1 0 0 1 1.32-.083l.094.083L12 10.585l6.293-6.292a1 1 0 1 1 1.414 1.414L13.415 12l6.292 6.293a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.32.083l-.094-.083L12 13.415l-6.293 6.292a1 1 0 0 1-1.414-1.414L10.585 12 4.293 5.707a1 1 0 0 1-.083-1.32l.083-.094-.083.094Z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div class="anchura-100-por-ciento margin-10-px-auto borde-redondeado-10-px padding-10px-superior-inferior" id="PanelExistenciasTabla">
                ${ImprimirTablaExistencias(tarjetas)}
            </div>`)
    EventosBuscarSucursalExistencias()
}

function ImprimirTablaExistencias(tarjetas) {
    return `<div class="altura-40-px anchura-100-por-ciento-con-padding-5px-lateral borde-redondeado-10-px-superior bg-color-input padding-5px-lateral flex flex-center font-09-rem" style="font-weight: 600; border-bottom:2px solid #cacaca">
                    <div class=" altura-100-por-ciento flex flex-center" style="width: calc(100% - 150px - 150px - 4px); border-right:2px solid #cacaca">
                        <span>Sucursal</span>
                    </div>
                    <div class=" anchura-150-px altura-100-por-ciento flex flex-center" style="border-right:2px solid #cacaca">
                        <div class="altura-100-por-ciento padding-5px-lateral anchura-100-px flex flex-center">
                            <span class="texto-truncado">Existencias</span>
                        </div>
                        <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                            <a class="boton boton-solo-icono anchura-30-px altura-30-px tarjeta-hover borde-redondeado-50-px flex flex-center" id="BotonOrdenarExistencias" title="Ordenar existencias">
                                <svg id="IconoOrdenExistencias" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
                            </a>
                        </div>
                    </div>
                    <div class=" anchura-150-px altura-100-por-ciento flex flex-center">
                        <span>Últ. actualización</span>
                    </div>
                </div>
                <div class="anchura-100-por-ciento overflow-auto scroll-invisible" style="height: 298px">
                    <div class="overflow-auto position-relative" id="ContenedorTarjetasExistenciasSucursal">
                        ${tarjetas.join('')}
                    </div>
                </div>`
}

function EventosBuscarSucursalExistencias() {
    $("#InputBuscarSucursalExistenciasProducto").on('input', function () {
        clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(() => {
            const texto = $(this).val().toLowerCase();
            const filtrados = respuesta.filter(item => item.Sucursal.toLowerCase().includes(texto));
            const tarjetas = mostrarResultados(filtrados);

            if (filtrados.length === 0) {
                ImprimirNoHayResultados($("#ContenedorTarjetasExistenciasSucursal"), 'No se encontraron coincidencias');
                $("#ContenedorTarjetasExistenciasSucursal").addClass('altura-100-por-ciento');
            } else {
                $("#ContenedorTarjetasExistenciasSucursal")
                    .html(tarjetas.join(''))
                    .removeClass('altura-100-por-ciento');
            }
        }, 300); // Espera 300ms después del último input
    });
    $("#BotonOrdenarExistencias").click(function (e) {
        ordenAscendente = !ordenAscendente;
    
        // Rotar ícono SVG
        const icono = $("#IconoOrdenExistencias");
        icono
            .removeClass('svg-asc svg-desc')
            .addClass(ordenAscendente ? 'svg-asc' : 'svg-desc');
    
        // Ordenar resultados
        const ordenados = [...respuesta].sort((a, b) => {
            return ordenAscendente ?
                a.Existencia - b.Existencia :
                b.Existencia - a.Existencia;
        });
    
        const tarjetas = mostrarResultados(ordenados);
    
        const contenedor = $("#ContenedorTarjetasExistenciasSucursal");
        if (ordenados.length === 0) {
            ImprimirNoHayResultados(contenedor, 'No se encontraron coincidencias');
            contenedor.addClass('altura-100-por-ciento');
        } else {
            contenedor
                .html(tarjetas.join(''))
                .removeClass('altura-100-por-ciento');
        }
    });
    
}

function mostrarResultados(array) {
    const contenedor = $('#resultados');
    contenedor.empty();

    const tarjetas = [];

    if (array.length === 0) {
        const mensaje = 'No se encontraron resultados';
        tarjetas.push(mensaje);
        return tarjetas;
    }

    array.forEach(item => {
        tarjetas.push(`
            <div class="anchura-100-por-ciento-con-padding-5px-lateral tarjeta-hover margin-5-px-auto altura-40-px flex flex-center">
                <div class="altura-100-por-ciento flex flex-center font-09-rem" style="width: calc(100% - 304px); border-right: 2px solid #cacaca;">
                    <span class="texto-truncado">${item.Sucursal}</span>
                </div>
                <div class="anchura-150-px altura-100-por-ciento flex flex-center" style="border-right: 2px solid #cacaca;">
                    <span class="texto-truncado">${item.Existencia}</span>
                </div>
                <div class="anchura-150-px altura-100-por-ciento flex flex-center font-09-rem">
                    <span class="texto-truncado">${item.Última_actualización}</span>
                </div>
            </div>
        `);
    });
    

    return tarjetas;
}