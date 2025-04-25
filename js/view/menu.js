$("#BotonMenuPrincipal").click(function (e) {
    if ($("#ContenedorBotonesMenuPrincipal").is(":visible")) {

        $("#ContenedorBotonesMenuPrincipal").slideUp();
        $("#ContenedorTarjetasMenu").css('overflow', 'hidden');
    } else {
        ajustarContenedor();
        $("#ContenedorTarjetasMenu").css('overflow', 'hidden');
        $("#ContenedorBotonesMenuPrincipal").slideDown(function () {
            $("#ContenedorTarjetasMenu").css('overflow', 'auto');
        });
    }
});


$(window).resize(function (e) {
    ajustarContenedor();
    ObtenerMedidasMenuCuenta()
})

function ajustarContenedor() {
    var anchuraTarjeta = 96;
    var margenTarjeta = 20;
    var anchoScrollbar = obtenerAnchuraScrollBar($('#ContenedorTarjetasMenu').parent());
    var paddingInterno = (16 * 2) + anchoScrollbar; // 16px a cada lado

    var anchoTotalTarjeta = anchuraTarjeta + margenTarjeta;
    var anchoVentana = $(window).width();

    // Restar el padding interno del ancho disponible
    var anchoDisponible = anchoVentana - paddingInterno;

    // Calcular cuántas tarjetas caben en el espacio disponible
    var tarjetasQueCaben = Math.floor(anchoDisponible / anchoTotalTarjeta);

    // Calcular el ancho que debe tener el contenedor para esas tarjetas
    var anchoContenedor = tarjetasQueCaben * anchoTotalTarjeta + paddingInterno;

    // Ajustar el ancho del contenedor principal
    $("#ContenedorBotonesMenuPrincipal").css('width', anchoContenedor + 'px');
}

$(document).on('click', function (e) {
    // Si el clic NO fue dentro del div ni en el botón, se cierra
    if (!$(e.target).closest('#ContenedorBotonesMenuPrincipal, #BotonMenuPrincipal').length) {
        $("#ContenedorBotonesMenuPrincipal").slideUp();
        $("#ContenedorTarjetasMenu").css('overflow', 'hidden');
    }
    if (!$(e.target).closest('#ContenedorMenuCuenta, #BotonMenuCuentaUsuario').length) {
        $("#ContenedorMenuCuenta").slideUp();
    }

    if (!$(e.target).closest('#ContenedorMenuSucursales, #BotonCambiarSucursal').length) {
        $("#ContenedorTarjetasSucursalesMenu").parent().css('overflow', 'hidden')
        $("#ContenedorMenuSucursales").slideUp(() => {
            $("#ContenedorMenuSucursales").empty()
        });
    }
});

$(document).ready(function () {
    function actualizarHora() {
        var ahora = new Date();

        // Obtener horas y minutos
        var horas = ahora.getHours();
        var minutos = String(ahora.getMinutes()).padStart(2, '0');

        // Determinar AM o PM
        var amPm = horas >= 12 ? 'PM' : 'AM';

        // Convertir horas al formato de 12 horas
        horas = horas % 12;
        horas = horas ? String(horas).padStart(2, '0') : '12'; // 0 -> 12 para el formato de 12 horas

        var horaFormateada = horas + ':' + minutos + ' ' + amPm;

        // Mostrar la hora en el div
        $('#SpanHora').text(horaFormateada);
    }

    // Actualizamos la hora inmediatamente al cargar la página (sin retraso)
    actualizarHora();

    // Sincronizamos la próxima actualización con el tiempo exacto
    var now = new Date();
    var nextMinute = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1, 0, 0); // El próximo minuto exacto

    // Calcular el tiempo hasta el próximo minuto exacto
    var timeUntilNextMinute = nextMinute.getTime() - now.getTime();

    // Esperamos hasta el próximo minuto exacto para la primera actualización
    setTimeout(function () {
        // Después de este primer timeout, actualizamos cada minuto
        actualizarHora(); // Actualización inmediata
        setInterval(actualizarHora, 60000); // Luego actualizamos cada minuto
    }, timeUntilNextMinute);
});

$("#BotonMenuCuentaUsuario").click(function (e) {

    ObtenerMedidasMenuCuenta()
    if ($("#ContenedorMenuCuenta").is(':visible')) {
        $("#ContenedorMenuCuenta").slideUp()
    } else {
        $("#ContenedorMenuCuenta").slideDown()
    }

})

function ObtenerMedidasMenuCuenta() {
    var medidas = ObtenerMedidas($("#BotonMenuCuentaUsuario"));
    var anchoMenu = $("#ContenedorMenuCuenta").outerWidth();
    var anchoVentana = $(window).width();

    // Intentamos centrar el menú respecto al botón
    var leftDeseado = medidas.left + (medidas.width / 2) - (anchoMenu / 2);

    // Ajustamos para que no se salga de la pantalla
    var leftFinal = Math.max(0, Math.min(leftDeseado, anchoVentana - anchoMenu));

    $("#ContenedorMenuCuenta").css({
        "top": '60px',
        "left": leftFinal + 'px'
    });
}

$("#BotonCerrarSesion").click(function (e) {
    $("#ContenedorMenuCuenta").slideUp();
    ModalPreguntaCerrarSesion()
})


function ModalPreguntaCerrarSesion() {
    MostrarModal(ComponerModalConfirmarAccion('<img src="../../icons/windows/llave.png" class=" altura-80-por-ciento">', '¿Quieres cerrar sesión?', 'Por favor confirma', 'auto', '400px'), true);
    $("#BotonRespuestaSiAccionModal").click(function (e) {
        MostrarModal(
            ComponerModalCargando('Cerrando sesión', 'auto', '400px'),
            false
        );
        const data = {
            accion: 'Cerrar_sesion'
        };

        ajaxConParametros(undefined, data)
            .then(response => {
                response = JSON.parse(response)
                if (response.success) {
                    contenido = ComponerContenidoAdvertencia('../../icons/basic/adios.png', 'Hasta luego', 'Sesión cerrada correctamente');
                    MostrarModal(contenido, false)
                    setTimeout(() => {
                        CerrarModal()
                        window.location.href = 'login.php';
                    }, 1000);
                } else {
                    const contenido = ComponerContenidoAdvertencia(
                        '../../icons/windows/eliminar.png',
                        'Error',
                        'Intenta más tarde'
                    );
                    console.error(response.message);
                    MostrarModal(contenido, false);
                    setTimeout(() => {
                        CerrarModal();
                    }, 1000);
                }
            })
            .catch(error => {
                const contenido = ComponerContenidoAdvertencia(
                    '../../icons/windows/eliminar.png',
                    'Error',
                    'Intenta más tarde'
                );
                console.error(error);
                MostrarModal(contenido, false);
                setTimeout(() => {
                    CerrarModal();
                }, 1000);
            });
    })

    $("#BotonRespuestaNoAccionModal").click(function (e) {
        CerrarModal()
    })
}

$("#BotonCambiarSucursal").click(function (e) {
    const $menu = $('#ContenedorMenuSucursales');

    if (!$menu.is(":visible")) {
        posicionarMenuSucursales();
        $menu.slideDown(() => {

            CrearLoader('CargandoSucursales', "ContenedorMenuSucursales");

            const data = {
                accion: 'Obtener_Sucursales_Con_Sucursal_Actual'
            };

            ajaxConParametros(undefined, data)
                .then(response => {
                    response = JSON.parse(response);
                    console.log(response);

                    if (response.success) {
                        $menu.html(`
                            <div class="anchura-100-por-ciento-padding-10px altura-100-por-ciento-menos-20-px padding-10px position-relative">
                                <div class="anchura-100-por-ciento altura-40-px flex flex-center margin-10-px-auto">
                                    <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                                        <input type="text" class="input" id="InputBuscarSucursalMenu" placeholder="Buscar sucursal...">
                                    </div>
                                </div>
                                <div class="anchura-100-por-ciento altura-100-por-ciento-menos-60-px margin-10-px-auto overflow-auto">
                                    <div class="anchura-100-por-ciento altura-100-por-ciento overflow-auto" style="max-height: 200px;">
                                        <div class="anchura-100-por-ciento overflow-auto" id="ContenedorTarjetasSucursalesMenu"></div>
                                    </div>
                                </div>
                            </div>
                        `);

                        ImprimirTarjetasSucursalesMenu(response.data);
                        EventoBuscarSucursalesMenu(response.data)
                        EventoCheckSeleccionarSucursalMenu()
                    } else {
                        if (response.message === 'No hay otras sucursales disponibles') {
                            $menu.html(`
                                <div class="anchura-100-por-ciento">
                                    <div class="anchura-100-por-ciento flex flex-center margin-10-px-auto position-relative">
                                        <img src="../../icons/basic/astronauta.png" style="height:80px">
                                    </div>
                                    <div class="anchura-100-por-ciento altura-50-px flex flex-center">
                                        <span>No hay sucursales disponibles</span>
                                    </div>
                                </div>
                            `).addClass('flex flex-center');
                        } else {
                            const contenido = ComponerContenidoAdvertencia('../../icons/windows/eliminar.png', 'Error', 'Intenta más tarde');
                            MostrarModal(contenido, false);
                            setTimeout(CerrarModal, 1000);
                        }
                    }
                    EliminarLoader('CargandoSucursales');
                })
                .catch(error => {
                    EliminarLoader('CargandoSucursales');
                    console.error(error);
                    const contenido = ComponerContenidoAdvertencia('../../icons/windows/eliminar.png', 'Error', 'Intenta más tarde');
                    MostrarModal(contenido, false);
                    setTimeout(CerrarModal, 1000);
                });
        });
    } else {
        $("#ContenedorTarjetasSucursalesMenu").parent().css('overflow', 'hidden')
        $menu.slideUp(() => {
            $menu.empty()
        });
    }
});


function ImprimirTarjetasSucursalesMenu(objeto) {
    console.log(objeto)
    var tarjetas = []
    $.each(objeto, function (index, sucursal) {
        tarjetas.push(`<label><div class=" anchura-100-por-ciento-con-borde-1px altura-50-px flex flex-center borde-redondeado-10-px margin-10-px-auto tarjeta-hover" style="border: 1px solid #f1f1f1;">
                            <div class="anchura-60-px altura-100-por-ciento flex flex-center">
                                <input type="radio" name="InputRadioSelectSucursal" class="checkbox-round" data-id="${sucursal.ID}" data-nombre="${sucursal.Nombre}">
                            </div>
                            <div class="altura-100-por-ciento anchura-100-por-ciento-menos-60-px flex flex-center">
                                <div class="altura-100-por-ciento anchura-100-por-ciento-menos-20-px padding-10px-lateral flex flex-left font-11-rem">
                                    <span>${sucursal.Nombre}</span>
                                </div>
                            </div>
                        </div></label>`)
    })
    $("#ContenedorTarjetasSucursalesMenu").html(tarjetas)
}

function posicionarMenuSucursales() {
    const $boton = $('#BotonCambiarSucursal');
    const $menu = $('#ContenedorMenuSucursales');

    const medidas = $boton.offset();
    const anchoBoton = $boton.outerWidth();
    const anchoMenu = $menu.outerWidth();

    const left = medidas.left + (anchoBoton / 2) - (anchoMenu / 2);

    $menu.css({
        top: '60px',
        left: left + 'px',
        position: 'absolute',
        zIndex: 1000
    });
}

function EventoBuscarSucursalesMenu(objeto) {
    $("#InputBuscarSucursalMenu").on('input', async function (e) {
        var textoBusqueda = $(this).val().toLowerCase(); // Convertir a minúsculas
        var sucursalesFiltradas = objeto.filter(function (sucursal) {
            return sucursal.Nombre.toLowerCase().includes(textoBusqueda); // Filtrar por nombre
        });

        if (sucursalesFiltradas.length != 0) {
            tarjetas = await ImprimirTarjetasSucursalesMenu(sucursalesFiltradas)
        } else {
            tarjetas = `<div class="anchura-100-por-ciento altura-100-por-ciento flex flex-center">
                        <div>
                            <div class="anchura-100-por-ciento altura-150-px flex flex-center">
                                <img src="../../icons/basic/lupa.png" class=" altura-80-px">
                            </div>
                            <div class="anchura-100-por-ciento altura-30-px margin-10-px-auto flex flex-center color-letra-subtitulo font-11-rem">
                                <span>No se encontraron sucursales</span>
                            </div>
                        </div>
                    </div>`
        }
        $("#ContenedorTarjetasSucursalesMenu").html(tarjetas)
        EventoCheckSeleccionarSucursalMenu()
    })
}

function EventoCheckSeleccionarSucursalMenu() {
    $("input[name='InputRadioSelectSucursal']").change(function (e) {
        MostrarModal(ComponerModalCargando('Espera un momento...', 'auto', '400px'), false)
        var id = $(this).data('id')
        var nombre = $(this).data('nombre')
        seleccion = id
        const data = {
            accion: 'Cambiar_sucursal',
            data: {
                'ID': id,
                'Nombre': nombre,
            }
        };

        ajaxConParametros(undefined, data)
            .then(response => {
                response = JSON.parse(response)
                if (response.success) {
                    contenido = ComponerContenidoAdvertencia('../../icons/windows/check.png', 'Listo', response.message);
                    MostrarModal(contenido, false)
                    setTimeout(() => {
                        CerrarModal()
                        window.location.reload()
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
    });
}

$("#BotonEditarImagenUsuario").click(function(e)
{
    $("#ContenedorMenuCuenta").slideUp()
    AbrirModalIframe('editar-imagen-usuario.php', '530px')
})