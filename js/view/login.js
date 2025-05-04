let imagenError = '../../icons/windows/exclamacion.png'
$("#BotonVerPasswordLogin").click(function (e) {
    CambiarTipoInputPassword($("#InputPasswordLogin").get(0));
})

$("#BotonIniciarSesion").click(function (e) {
    var usuario = $("#InputUsuarioLogin").val().trim()
    var password = $("#InputPasswordLogin").val().trim()
    if (usuario.length == 0) {
        contenido = ComponerContenidoAdvertencia(imagenError, 'Verifica', 'Ingresa tu usuario');
        MostrarModal(contenido);
    } else if (password.length == 0) {
        contenido = ComponerContenidoAdvertencia(imagenError, 'Verifica', 'Ingresa tu contraseña o tu PIN');
        MostrarModal(contenido);
    } else {
        CrearLoader('CargandoLogin', "ContenedorLogin")
        var usuario = $("#InputUsuarioLogin").val().trim()
        var password = $("#InputPasswordLogin").val().trim()

        const data = {
            accion: 'Iniciar_sesion',
            data: {
                'Usuario': usuario,
                'Password': password
            }
        };
        ajaxConParametros(undefined, data)
            .then(response => {
                response = JSON.parse(response)
                if (!response.success) {
                    EliminarLoader('CargandoLogin')
                    contenido = ComponerContenidoAdvertencia('../../icons/windows/error.png', 'Error', response.message);
                    MostrarModal(contenido,false);
                    setTimeout(() => {
                        CerrarModal
                    }, 1000);

                } else if (response.success) {
                    if (response.tienePermisos) {
                        const params = new URLSearchParams(window.location.search);
                        const returnParam = params.get("return");
                        if (returnParam) {
                            window.location.href = `seleccionar-sucursal.php?return=${encodeURIComponent(returnParam)}`;
                        } else {
                            window.location.href = "seleccionar-sucursal.php";
                        }
                    } else {
                        window.location.href = "inicio.php";
                    }
                    
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