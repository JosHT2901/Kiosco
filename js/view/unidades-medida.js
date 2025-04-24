let debounceTimerBuscarUnidad, unidades;
$(document).ready(function (e) {
    InicializarPaginaUnidadesMedida()
})
$("#BotonAgregarNuevaUnidad").click(function (e) {
    AbrirModalIframe('nueva-unidad-de-medida.php', '440px')
})

function InicializarPaginaUnidadesMedida() {
    MostrarModal(ComponerModalCargando('Obteniendo información', 'auto', '400px'), false)
    const data = {
        accion: 'Obtener_Unidades_Medida'
    };

    ajaxConParametros(undefined, data)
        .then(response => {
            response = JSON.parse(response)

            if (response.success) {

                if (response.message == '' || response.data.length == 0) {
                    const $contenedor = $("#ContenedorMedidasUtilizadas")
                    ImprimirNoHayResultados($contenedor, 'No hay resultados');
                } else {
                    $("#ContenedorMedidasUtilizadas").empty()
                    ImprimirEstructuraPaginaUnidades()
                    unidades = response.data
                    $("#ContenedorTarjetasUnidades").html(ImprimirTarjetasUnidades(unidades)).removeClass('altura-100-por-ciento')
                    EventoBotonEliminar()
                    EventoInputBuscarUnidad()
                }
            } else {
                $("#ContenedorMedidasUtilizadas").html(`<div class="anchura-100-por-ciento altura-100-por-ciento flex flex-center">
                    <div class="anchura-100-por-ciento">
                        <div class="anchura-100-por-ciento altura-150-px flex flex-center margin-10-px-auto">
                            <img src="../../icons/basic/monkey.png" class="altura-80-por-ciento">
                        </div>
                        <div class="anchura-100-por-ciento altura-30-px flex flex-center font-11-rem" style="font-weight: 600;">
                            <span>Error al obtener informacion</span>
                        </div>
                    </div>
                </div>`)
            }

            CerrarModal()
        })
        .catch(error => {
            contenido = ComponerContenidoAdvertencia('../../icons/windows/eliminar.png', 'Error', 'Intenta más tarde');
            console.log(error)
            MostrarModal(contenido, false)
            setTimeout(() => {
                CerrarModal()
            }, 1000);
        })
}

function ImprimirEstructuraPaginaUnidades() {
    if ($("#ContenedorMedidasUtilizadas").is(":empty")) {
        $("#ContenedorMedidasUtilizadas").html(`<div class="anchura-100-por-ciento altura-100-por-ciento overflow-auto">
                    <div class="anchura-100-por-ciento altura-50-px margin-10-px-auto flex flex-center font-12-rem" style="font-weight: 600;">
                        <div class="altura-100-por-ciento flex flex-left padding-10px-lateral" style="width:calc(100% - 300px - 20px)">
                            <span>Medidas utilizadas</span>    
                        </div>
                        <div class="altura-100-por-ciento" style="width:300px">
                            <div class="anchura-100-por-ciento-con-padding-5px-lateral altura-100-por-ciento flex flex-center padding-5px-lateral">
                                    <div class="altura-40-px padding-10px-lateral box-shadow-1 borde-redondeado-10-px font-09-rem flex flex-center" style="min-width: 80%;">
                                        <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 2.5a7.5 7.5 0 0 1 5.964 12.048l4.743 4.745a1 1 0 0 1-1.32 1.497l-.094-.083-4.745-4.743A7.5 7.5 0 1 1 10 2.5Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z"></path>
                                            </svg>
                                        </div>
                                        <div class="altura-100-por-ciento anchura-100-por-ciento-menos-80-px flex flex-center">
                                            <div class="anchura-100-por-ciento altura-35-px flex flex-center">
                                                <input type="text" class="input" placeholder="Buscar unidad..." id="InputBuscarUnidadUnidadesMedida">
                                            </div>
                                        </div>
                                        <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                                            <a class="boton boton-solo-icono anchura-35-px altura-35-px tarjeta-hover borde-redondeado-5-px flex flex-center margin-0px-5px" id="LimpiarInputBuscarUnidadUnidadesMedida">
                                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M18.75 4a3.25 3.25 0 0 1 3.245 3.066L22 7.25v9.5a3.25 3.25 0 0 1-3.066 3.245L18.75 20h-8.501a3.25 3.25 0 0 1-2.085-.756l-.155-.139-4.995-4.75a3.25 3.25 0 0 1-.116-4.594l.116-.116 4.995-4.75a3.25 3.25 0 0 1 2.032-.888L10.25 4h8.501Zm-7.304 4.397a.75.75 0 0 0-1.049 1.05l.073.083L12.94 12l-2.47 2.47-.073.084a.75.75 0 0 0 1.05 1.049l.083-.073L14 13.061l2.47 2.47.084.072a.75.75 0 0 0 1.049-1.05l-.073-.083L15.061 12l2.47-2.47.072-.084a.75.75 0 0 0-1.05-1.049l-.083.073L14 10.939l-2.47-2.47-.084-.072Z"></path>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class=" anchura-100-por-ciento-menos-20-px padding-10px overflow-auto" style="height: calc(100% - 70px - 20px);" >
                        <div class="anchura-100-por-ciento altura-100-por-ciento overflow-auto ">
                            <div class="flex-wrap flex flex-left" id="ContenedorTarjetasUnidades"></div>
                        </div>
                    </div>
                </div>`)
    }
}

function ImprimirTarjetasUnidades(objeto) {
    const tarjetas = [];

    $.each(objeto, function (index, unidad) {
        const tarjeta = `<div class="tarjeta-botones-opciones tarjeta-hover boton position-relative borde-redondeado-5-px" style="width:150px" title="${unidad.Descripcion}">
                                        <div class="anchura-100-por-ciento altura-60-px flex flex-center">
                                            <img src="../../icons/windows/medida.png" class="anchura-40-px">
                                        </div>
                                        <div class="anchura-100-por-ciento altura-30-px flex flex-center font-08-rem" style="font-weight: 600;">
                                            <span class="texto-truncado">${unidad.Descripcion}</span>
                                        </div>
                                        <div class="anchura-100-por-ciento altura-100-por-ciento flex flex-center position-absolute top-0 left-0 borde-redondeado-5-px botones-tarjeta-hover" style="background-color: #000000b5;z-index:100;">
                                            <a class="boton boton-solo-icono anchura-40-px altura-40-px tarjeta-hover borde-redondeado-50-px flex flex-center margin-0px-5px" name="BotonEliminarUnidad" data-id="${unidad.ID}">
                                            <svg width="24" height="24" class="svg-blanco" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.5 6a1 1 0 0 1-.883.993L20.5 7h-.845l-1.231 12.52A2.75 2.75 0 0 1 15.687 22H8.313a2.75 2.75 0 0 1-2.737-2.48L4.345 7H3.5a1 1 0 0 1 0-2h5a3.5 3.5 0 1 1 7 0h5a1 1 0 0 1 1 1Zm-7.25 3.25a.75.75 0 0 0-.743.648L13.5 10v7l.007.102a.75.75 0 0 0 1.486 0L15 17v-7l-.007-.102a.75.75 0 0 0-.743-.648Zm-4.5 0a.75.75 0 0 0-.743.648L9 10v7l.007.102a.75.75 0 0 0 1.486 0L10.5 17v-7l-.007-.102a.75.75 0 0 0-.743-.648ZM12 3.5A1.5 1.5 0 0 0 10.5 5h3A1.5 1.5 0 0 0 12 3.5Z"/></svg>
                                            </a>
                                        </div>
                                    </div>`
        tarjetas.push(tarjeta);
    });

    return tarjetas;
}

function EventoBotonEliminar() {
    $('[name="BotonEliminarUnidad"]').click(function (e) {
        var id = $(this).data('id')
        MostrarModal(ComponerModalPregunta('Eliminar unidad', 'Esta accion no se puede deshacer', 'auto', '400px'), false);
        $('#BotonCancelarAccionModal').on('click', function (e) {
            CerrarModal()
        });
        $('#BotonConfirmarAccionModal').on('click', function (e) {
            MostrarModal(ComponerModalCargando('Eliminando', 'auto', '400px'), false)
            const data = {
                accion: 'Eliminar_Unidad_Medida',
                data: id
            };

            ajaxConParametros(undefined, data)
                .then(response => {
                    response = JSON.parse(response)
                    if (response.success) {
                        if (response.message == 'Unidad eliminada correctamente.') {
                            contenido = ComponerContenidoAdvertencia('../../icons/windows/check.png', 'Listo', 'Unidad eliminada correctamente');
                            MostrarModal(contenido, false)
                            setTimeout(() => {
                                InicializarPaginaUnidadesMedida()
                            }, 1000);
                        } else {
                            contenido = ComponerContenidoAdvertencia('../../icons/windows/exclamacion.png', 'Error', response.mensaje);
                            console.log(response.message)
                            verificado = false
                            MostrarModal(contenido, false)
                            setTimeout(() => {
                                CerrarModal()
                            }, 1000);
                        }
                    } else {
                        contenido = ComponerContenidoAdvertencia('../../icons/windows/eliminar.png', 'Error', 'Intenta más tarde');
                        console.log(response.error)
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
    })

}

function EventoInputBuscarUnidad() {
    $("#InputBuscarUnidadUnidadesMedida").keyup(function (e) {
        clearTimeout(debounceTimerBuscarUnidad);

        debounceTimerBuscarUnidad = setTimeout(() => {
            BuscarUnidad($(this).val().trim().toLowerCase())
        }, 300);
    })
    $("#LimpiarInputBuscarUnidadUnidadesMedida").click(function (e) {
        if ($("#InputBuscarUnidadUnidadesMedida").val().length != 0) {
            $("#InputBuscarUnidadUnidadesMedida").val('')
            InicializarPaginaUnidadesMedida()
        }

    })
}

function BuscarUnidad(valor) {
    // Validación y limpieza del valor
    const texto = valor ?.toLowerCase().trim() || '';

    // Filtrar por coincidencias en la descripción
    const resultadosFiltrados = unidades.filter(unidad =>
        unidad.Descripcion.toLowerCase().includes(texto)
    );

    const $contenedor = $("#ContenedorTarjetasUnidades")

    if (resultadosFiltrados.length > 0) {
        $contenedor
            .html(ImprimirTarjetasUnidades(resultadosFiltrados))
            .removeClass('altura-100-por-ciento');

        EventoBotonEliminar()
    } else {
        ImprimirNoHayResultados($contenedor, 'No hay resultados');
        $contenedor.addClass('altura-100-por-ciento');
    }
}