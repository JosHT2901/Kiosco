let debounceTimerBuscarDepartamento;
$("#BotonAgregarNuevoDepartamento").click(function (e) {
    AbrirModalIframe('nuevo-departamento.php', '440px')
})
$(document).ready(function (e) {
    InicializarPaginaDepartamentos()
})

function InicializarPaginaDepartamentos() {
    MostrarModal(ComponerModalCargando('Obteniendo información', 'auto', '400px'), false)
    const data = {
        accion: 'Obtener_departamentos'
    };

    ajaxConParametros(undefined, data)
        .then(response => {
            let respuesta;

            try {
                respuesta = JSON.parse(response);
            } catch (e) {
                console.error("Respuesta no válida:", response);
                return;
            }
            if (respuesta.message == 'No hay departamentos registrados' || respuesta.data.length === 0) {
                ImprimirNoHayResultados($("#ContenedorContenidoDepartamentos"), 'Agrega un departamento')
            } else {
                if ($("#ContenedorContenidoDepartamentos").is(':empty')) {
                    ImprimirEstructuraPanelDepartamentos();
                }

                $("#ContenedorTarjetasDepartamentos").html(ImprimirTarjetasDepartamentos(respuesta.data)).removeClass('flex flex-center altura-100-por-ciento')
                EventosPaginaDepartamentos(respuesta.data)
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

function ImprimirEstructuraPanelDepartamentos() {
    $("#ContenedorContenidoDepartamentos").html(`<div class="anchura-100-por-ciento altura-40-px flex flex-center margin-10-px-auto bg-color-input borde-redondeado-5-px">
                        <div class="altura-100-por-ciento anchura-100-por-ciento flex flex-center">
                            <div class="altura-100-por-ciento anchura-100-por-ciento-menos-40-px flex flex-center">
                                    <div class=" anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral altura-35-px flex flex-center">
                                    <input type="text" class="input" placeholder="Buscar departamento..." id="InputBuscarDepartamento">
                                    </div>
                            </div>
                            <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                                <a class="boton boton-solo-icono anchura-35-px altura-35-px tarjeta-hover borde-redondeado-5-px flex flex-center margin-0px-5px" id="BotonLimpiarInputBuscarDepartamento" title="Limpiar búsqueda">
                                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.75 4a3.25 3.25 0 0 1 3.245 3.066L22 7.25v9.5a3.25 3.25 0 0 1-3.066 3.245L18.75 20h-8.501a3.25 3.25 0 0 1-2.085-.756l-.155-.139-4.995-4.75a3.25 3.25 0 0 1-.116-4.594l.116-.116 4.995-4.75a3.25 3.25 0 0 1 2.032-.888L10.25 4h8.501Zm-7.304 4.397a.75.75 0 0 0-1.049 1.05l.073.083L12.94 12l-2.47 2.47-.073.084a.75.75 0 0 0 1.05 1.049l.083-.073L14 13.061l2.47 2.47.084.072a.75.75 0 0 0 1.049-1.05l-.073-.083L15.061 12l2.47-2.47.072-.084a.75.75 0 0 0-1.05-1.049l-.083.073L14 10.939l-2.47-2.47-.084-.072Z"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="anchura-100-por-ciento altura-100-por-ciento-menos-60-px overflow-auto contenedor">
                        <div class="anchura-100-por-ciento overflow-auto" id="ContenedorTarjetasDepartamentos">
                        </div>
                    </div>`)
}

function ImprimirTarjetasDepartamentos(objeto) {
    const tarjetas = [];

    $.each(objeto, function (index, departamento) {
        const id = departamento.ID;
        const nombre = $('<div>').text(departamento.Nombre).html(); // Escapar HTML
        const esSinDepartamento = nombre === 'Sin departamento';

        let botones = '';
        if (!esSinDepartamento) {
            botones = `
                <div class="altura-100-por-ciento padding-10px-lateral flex flex-right position-absolute bg-color-white botones-tarjeta-hover" style="right: 0;">
                    <a class="boton boton-solo-icono anchura-30-px altura-30-px tarjeta-hover borde-redondeado-50-px flex flex-center margin-0px-5px" name="BotonEditarDepartamento" title="Editar" data-id="${id}">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                            <path d="M13.94 5 19 10.06 9.062 20a2.25 2.25 0 0 1-.999.58l-5.116 1.395a.75.75 0 0 1-.92-.921l1.395-5.116a2.25 2.25 0 0 1 .58-.999L13.938 5Zm7.09-2.03a3.578 3.578 0 0 1 0 5.06l-.97.97L15 3.94l.97-.97a3.578 3.578 0 0 1 5.06 0Z"/>
                        </svg>
                    </a>
                    <a class="boton boton-solo-icono anchura-30-px altura-30-px tarjeta-hover borde-redondeado-50-px flex flex-center margin-0px-5px" name="BotonEliminarDepartamento" title="Eliminar" data-id="${id}">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                            <path d="M21.5 6a1 1 0 0 1-.883.993L20.5 7h-.845l-1.231 12.52A2.75 2.75 0 0 1 15.687 22H8.313a2.75 2.75 0 0 1-2.737-2.48L4.345 7H3.5a1 1 0 0 1 0-2h5a3.5 3.5 0 1 1 7 0h5a1 1 0 0 1 1 1Zm-7.25 3.25a.75.75 0 0 0-.743.648L13.5 10v7a.75.75 0 0 0 1.493.102L15 17v-7a.75.75 0 0 0-.75-.75Zm-4.5 0a.75.75 0 0 0-.743.648L9 10v7a.75.75 0 0 0 1.493.102L10.5 17v-7a.75.75 0 0 0-.75-.75ZM12 3.5A1.5 1.5 0 0 0 10.5 5h3A1.5 1.5 0 0 0 12 3.5Z"/>
                        </svg>
                    </a>
                </div>`;
        }

        const tarjeta = `
            <div class=" anchura-100-por-ciento-con-borde-1px altura-50-px borde-redondeado-5-px tarjeta-3d box-shadow-1 margin-10-px-auto tarjeta-hover flex flex-left position-relative  border-1-px-e6e6e6" data-id="${id}" style="font-weight:600">
                <div class=" anchura-100-por-ciento-menos-20-px altura-100-por-ciento padding-10px-lateral flex flex-left">
                    <span class="texto-truncado">${nombre}</span>
                </div>
                ${botones}
            </div>`;

        tarjetas.push(tarjeta);
    });

    return tarjetas;
}

function ImprimirNoHayResultados(contenedor, texto) {
    contenedor.html(`<div class="anchura-100-por-ciento altura-100-por-ciento flex flex-center">
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

function EventosPaginaDepartamentos(objeto) {
    $("#InputBuscarDepartamento").on("keyup", function () {
        clearTimeout(debounceTimerBuscarDepartamento);

        debounceTimerBuscarDepartamento = setTimeout(() => {
            BuscarDepartamentos($(this).val().trim().toLowerCase(), objeto)
        }, 300);
    });
    $("#BotonLimpiarInputBuscarDepartamento").click(function (e) {
        if( $("#InputBuscarDepartamento").val().length!=0)
        {
            $("#InputBuscarDepartamento").val('')
            InicializarPaginaDepartamentos()
        }
    })
    $('[name="BotonEliminarDepartamento"]').click(function (e) {

        var id = $(this).data('id')
        MostrarModal(ComponerModalPregunta('Confirma', 'Esta accion no se puede deshacer', 'auto', '400px'), false);
        $('#BotonCancelarAccionModal').on('click', function (e) {
            CerrarModal()
        });
        $('#BotonConfirmarAccionModal').on('click', function (e) {
            MostrarModal(ComponerModalCargando('Eliminando', 'auto', '400px'), false)
            const data = {
                accion: 'Eliminar_departamento',
                data: id
            };

            ajaxConParametros(undefined, data)
                .then(response => {
                    response = JSON.parse(response)
                    if (response.success) {
                        if (response.mensaje == 'Departamento eliminado exitosamente.') {
                            contenido = ComponerContenidoAdvertencia('../../icons/windows/check.png', 'Listo', 'Departamento eliminado correctamentes');
                            MostrarModal(contenido, false)
                            setTimeout(() => {
                                InicializarPaginaDepartamentos()
                            }, 1000);
                        } else {
                            contenido = ComponerContenidoAdvertencia('../../icons/windows/exclamacion.png', 'Error', response.mensaje);
                            console.log(response.mensaje)
                            verificado = false
                            MostrarModal(contenido, false)
                            setTimeout(() => {
                                CerrarModal()
                            }, 1000);
                        }
                    } else {
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
    });
    $('[name="BotonEditarDepartamento"').click(function (e) {
        MostrarModal(ComponerModalCargando('Obteniendo información', 'auto', '400px'), false)
        var id = $(this).data('id')
        const data = {
            accion: 'Obtener_informacion_departamento',
            data: id
        };

        ajaxConParametros(undefined, data)
            .then(response => {
                response = JSON.parse(response)
                if (response.success) {
                    console.log(response.data)
                    $("#ContenedorInformacionDepartamento").html(`<div class="anchura-100-por-ciento altura-100-por-ciento overflow-auto">
                    <div class="anchura-100-por-ciento altura-40-px flex flex-center borde-redondeado-5-px bg-color-input margin-10-px-auto font-11-rem" style="font-weight: 600;">
                        <span>${response.data.Nombre}</span>
                    </div>
                    <div class="altura-40-px anchura-100-por-ciento flex flex-center">
                        <div class="anchura-150-px altura-100-por-ciento flex flex-left font-09-rem " style="font-weight: 600;">
                            <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral flex flex-left">
                                <span>Fecha de creación</span>
                            </div>
                        </div>
                        <div class="altura-100-por-ciento flex flex-right padding-10px-lateral" style="width: calc(100% - 150px - 10px);">
                            <span>${response.data.Fecha_creacion_formateada}</span>
                        </div>
                    </div>
                    <div class="altura-40-px anchura-100-por-ciento flex flex-center">
                        <div class="anchura-150-px altura-100-por-ciento flex flex-left font-09-rem " style="font-weight: 600;">
                            <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral flex flex-left">
                                <span>Última moficiacion</span>
                            </div>
                        </div>
                        <div class="altura-100-por-ciento flex flex-right padding-10px-lateral" style="width: calc(100% - 150px - 10px);">
                            <span>${response.data.Ultima_modificacion_formateada}</span>
                        </div>
                    </div>
                    <div class="anchura-100-por-ciento flex flex-start-start" style="height: calc(100% - (40px + 20px) - 40px - 40px);">
                        <div class="anchura-100-por-ciento overflow-auto">
                            <form class="overflow-auto margin-10-px-auto">
                                <div class="overflow-auto contenedor-form">
                                    <div class="anchura-100-por-ciento flex flex-center flex-wrap" style="max-height: 400px;">
                                        <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-10-px-auto">
                                            <div class="altura-70-px anchura-100-por-ciento flex flex-center ">
                                                <div class="altura-100-por-ciento anchura-100-por-ciento flex flex-center">
                                                    <div class="altura-100-por-ciento anchura-100-por-ciento-menos-20-px margin-10-px-auto">
                                                        <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                                            <span class="label-input">Nombre</span>
                                                        </div>
                                                        <div class="anchura-100-por-ciento altura-40-px">
                                                            <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                                                                <input type="text" class="input" id="InputNombreDepartamento" value="${response.data.Nombre}">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div class="anchura-100-por-ciento-con-padding-10px-lateral padding-10px-lateral margin-15-px-auto altura-50-px flex flex-center">
                                <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-left">
                                </div>
                                <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-right">
                                    <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem min-width-110px position-relative borde-redondeado-5-px" id="BotonGuardarInformacionDepartamento">
                                        <span>Guardar</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`)
                    CerrarModal()
                    EventoBotonGuardarInformarcionDepartamento(id)
                } else {
                    contenido = ComponerContenidoAdvertencia('../../icons/windows/eliminar.png', 'Error', 'Intenta más tarde');
                    console.log(response.mensaje)
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

    })
}

function BuscarDepartamentos(valor, objeto) {

    const resultadosFiltrados = objeto.filter(dep =>
        dep.Nombre.toLowerCase().includes(valor)
    );
    if (resultadosFiltrados.length > 0) {
        $("#ContenedorTarjetasDepartamentos").html(ImprimirTarjetasDepartamentos(resultadosFiltrados))
            .removeClass('flex flex-center altura-100-por-ciento')

    } else {
        ImprimirNoHayResultados($("#ContenedorTarjetasDepartamentos"), 'No hay resultados')
        $("#ContenedorTarjetasDepartamentos").addClass('flex flex-center altura-100-por-ciento')
    }
}

function EventoBotonGuardarInformarcionDepartamento(id) {
    $("#BotonGuardarInformacionDepartamento").click(function (e) {
        if ($("#InputNombreDepartamento").val().length == 0) {
            contenido = ComponerContenidoAdvertencia('../../icons/windows/exclamacion.png', 'Verifica', 'Ingresa un nombre válido para el departamento');
            MostrarModal(contenido);
        } else {
            MostrarModal(ComponerModalCargando('Guardando', 'auto', '400px'), false)
            var nombre = $("#InputNombreDepartamento").val()
            const data = {
                accion: 'Editar_nombre_departamento',
                data: {
                    "nombre": nombre,
                    "id": id
                }
            };

            ajaxConParametros(undefined, data)
                .then(response => {
                    response = JSON.parse(response)
                    if (response.success) {
                        contenido = ComponerContenidoAdvertencia('../../icons/windows/check.png', 'Listo', 'Departamento eliminado correctamentes');
                        MostrarModal(contenido, false)
                        $("#ContenedorInformacionDepartamento").empty()
                        setTimeout(() => {
                            InicializarPaginaDepartamentos()
                        }, 1000);

                    } else {
                        contenido = ComponerContenidoAdvertencia('../../icons/windows/eliminar.png', 'Error', response.message);
                        console.log(response.message)
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
        }
    })
}