let imagenError = '../../icons/windows/exclamacion.png'
$("#BotonVerPasswordLogin").click(function (e) {
    CambiarTipoInputPassword($("#InputPasswordLogin").get(0));
})

$("#BotonIniciarSesion").click(function (e) {
    if ($("#InputUsuarioLogin").val().length == 0) {
        contenido = ComponerContenidoAdvertencia(imagenError, 'Verifica', 'Ingresa tu usuario');
        MostrarModal(contenido);
    } else if ($("#InputPasswordLogin").val().length == 0) {
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
                console.log(response)
                response = JSON.parse(response)
                console.log(response)
                if (response == 'Este usuario no está registrado o está deshabilitado.')
                {
                    EliminarLoader('CargandoLogin')
                    contenido = ComponerContenidoAdvertencia(imagenError, 'Error',response);
                    MostrarModal(contenido);
                }
                else if(response=='Contraseña incorrecta.')
                {
                    EliminarLoader('CargandoLogin')
                    contenido = ComponerContenidoAdvertencia(imagenError, 'Error', 'Verifica tu contraseña');
                    MostrarModal(contenido);
                }
                else if(response=='Inicio correcto')
                {
                    window.location.href='seleccionar-sucursal.php'
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