var seleccion = 0
$(document).ready(function () {
    MostrarModal(ComponerModalCargando('Obteniendo información', 'auto', '400px'), false)
    InicializarPaginaSeleccionarSucursal()
});

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

async function InicializarPaginaSeleccionarSucursal() {
    try {
        var sucursales = await Obtener_Sucursales();
        sucursales = JSON.parse(sucursales)
        ImprimirEstructuraPaginaSeleccionarSucursal(sucursales)
        if (sucursales != 'No hay resultados') {
            tarjetas = await ImprimirTarjetas(sucursales)
            $("#ContenedorTarjetasSucursal").html(tarjetas)
            EventoBuscarSucursal(sucursales)
            EventoCheckSeleccionarSucursal()
        }
        CerrarModal()
        $("#BotonAgregarNuevaSucursal").click(function (e) {
            AbrirModalIframe('nueva-sucursal.php', '530px')
        })
    } catch (error) {
        console.error("Error al obtener sucursales:", error);
    }
}

async function ImprimirTarjetas(objeto) {
    var tarjetas = []
    $.each(objeto, function (index, sucursal) {
        tarjetas.push(`<label>
                            <div class=" anchura-100-por-ciento-con-borde-1px altura-60-px flex flex-center tarjeta-3d borde-redondeado-10-px margin-10-px-auto" style="border: 1px solid #f1f1f1;">
                                <div class="anchura-60-px altura-60-px flex flex-center">
                                    <input type="radio" name="InputRadioSelectSucursal" class="checkbox-round" data-id="${sucursal.ID}" data-nombre="${sucursal.Nombre}" ${seleccion==sucursal.ID?'checked':''} />
                                </div>
                                <div class="altura-100-por-ciento anchura-100-por-ciento-menos-60-px flex flex-center">
                                    <div class="altura-100-por-ciento anchura-100-por-ciento-menos-20-px padding-10px-lateral flex flex-left font-11-rem">
                                        <span>${sucursal.Nombre}</span>
                                    </div>
                                </div>
                            </div>
                        </label>`)

    })
    return tarjetas
    tarjetas = []
}

async function ImprimirEstructuraPaginaSeleccionarSucursal(objeto) {
    var contenido
    if (objeto == 'No hay resultados') {
        contenido = ` <div class="anchura-100-por-ciento">
                        <div class="anchura-100-por-ciento altura-150-px flex flex-center">
                            <img src="../../icons/color bold/lupa.png" class=" altura-80-por-ciento">
                        </div>
                        <div class="anchura-100-por-ciento altura-30-px margin-10-px-auto flex flex-center color-letra-subtitulo font-11-rem">
                            <span>No se encontraron sucursales</span>
                        </div>
                    </div>
                    <div class="anchura-100-por-ciento altura-70-px margin-10-px-auto flex flex-center">
                        <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem min-width-110px position-relative borde-redondeado-2-px" id="BotonAgregarNuevaSucursal">
                            <span>Agregar nueva sucursal</span>
                        </a>
                    </div>`
    } else {
        contenido = `<div class="anchura-100-por-ciento altura-50-px margin-10-px-auto">
                        <div class="anchura-100-por-ciento altura-40-px flex flex-center bg-color-input borde-redondeado-5-px">
                            <div class="altura-100-por-ciento anchura-40-px flex flex-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 2.5a7.5 7.5 0 0 1 5.964 12.048l4.743 4.745a1 1 0 0 1-1.32 1.497l-.094-.083-4.745-4.743A7.5 7.5 0 1 1 10 2.5Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" />
                                </svg>
                            </div>
                            <div class="anchura-100-por-ciento-menos-40-px altura-100-por-ciento flex flex-center">
                                <div class=" altura-100-por-ciento anchura-100-por-ciento ">
                                    <input type="text" class="input" placeholder="Buscar sucursal..." id="InputBuscarSucursalSeleccionarSucursal">
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="anchura-100-por-ciento overflow-auto contenedor" style="height: 300px;">
                        <div class="anchura-100-por-ciento overflow-auto" id="ContenedorTarjetasSucursal" style="min-height:100%">
                        </div>
                    </div>`

    }
    $("#FormularioSeleccionarSucursal").html(contenido)
}

function EventoBuscarSucursal(objeto) {
    $("#InputBuscarSucursalSeleccionarSucursal").on('input', async function (e) {
        var textoBusqueda = $(this).val().toLowerCase(); // Convertir a minúsculas
        var sucursalesFiltradas = objeto.filter(function (sucursal) {
            return sucursal.Nombre.toLowerCase().includes(textoBusqueda); // Filtrar por nombre
        });

        if (sucursalesFiltradas.length != 0) {
            tarjetas = await ImprimirTarjetas(sucursalesFiltradas)
        } else {
            tarjetas = `<div class="anchura-100-por-ciento altura-100-por-ciento flex flex-center" style="min-height:300px">
                        <div>
                            <div class="anchura-100-por-ciento altura-150-px flex flex-center">
                                <img src="../../icons/color bold/lupa.png" class=" altura-80-por-ciento">
                            </div>
                            <div class="anchura-100-por-ciento altura-30-px margin-10-px-auto flex flex-center color-letra-subtitulo font-11-rem">
                                <span>No se encontraron sucursales</span>
                            </div>
                        </div>
                    </div>`
        }
        $("#ContenedorTarjetasSucursal").html(tarjetas)
        EventoCheckSeleccionarSucursal()
    })
}

function EventoCheckSeleccionarSucursal() {
    $("input[name='InputRadioSelectSucursal']").change(function (e) {
        MostrarModal(ComponerModalCargando('Espera un momento...', 'auto', '400px'), false)
        var id = $(this).data('id')
        var nombre = $(this).data('nombre')
        seleccion = id
        const data = {
            accion: 'Seleccionar_sucursal',
            data: {
                'ID': id,
                'Nombre': nombre,
            }
        };

        ajaxConParametros(undefined, data)
            .then(response => {
                response=JSON.parse(response)
                if (response == 'Información guardada') {
                    window.location.href = "inicio.php";
                } else if (response == 'Datos incompletos') {
                    contenido = ComponerContenidoAdvertencia('../../icons/windows/eliminar.png', 'Error', 'Intenta más tarde');
                    console.log(error)
                    MostrarModal(contenido, false)
                    setTimeout(() => {
                        CerrarModal()
                    }, 1000);
                }
            })
            .catch(error => {
                contenido = ComponerContenidoAdvertencia('../../icons/windows/eliminar.png', 'Error', 'Intenta más tarde');
                console.log(error)
                MostrarModal(contenido, false)
                setTimeout(() => {
                    CerrarModal()
                }, 1000);
            })
    });
}