var InformacionUsuario = []
var ContactoUsuario = []
var InformacionCuenta = []
var InformacionPIN = []
const dominios = ["@gmail.com", "@hotmail.com", "@outlook.com", "@yahoo.com"];
const imagenError = '../../icons/windows/error.png';
const tituloError = 'Revisa la información';
var NumeroTarjetaSeleccionada = 1;
$(document).ready(function (e) {
    CargarPaginaCrearUsuario(1)

})

function CargarPaginaCrearUsuario(pagina) {
    try {

        CrearLoader('CargandoPaginaCrearUsuario', "ContenedorPaginaCrearUsuario")
        switch (pagina) {
            case 1:
                ContenidoPaginaCrearUsuario_1()
                break;
            case 2:
                ContenidoPaginaCrearUsuario_2()
                break;
            case 3:
                if (InformacionUsuario.length != 0) {
                    ContenidoPaginaCrearUsuario_3();
                } else {
                    ContenidoPaginaCrearUsuario_1()
                }
                break
            case 4:
                if (InformacionUsuario.length != 0 && ContactoUsuario.length != 0) {
                    ContenidoPaginaCrearUsuario_4();
                } else {
                    ContenidoPaginaCrearUsuario_1()
                }
                break;
            case 5:
                if (InformacionUsuario.length != 0 && ContactoUsuario.length != 0 && InformacionCuenta.length != 0) {
                    ContenidoPaginaCrearUsuario_5();
                } else {
                    ContenidoPaginaCrearUsuario_1()
                }
                break;
            default:
                break;
        }
        if (window.self !== window.top) {
            $("#ColumnaTarjetaLogin").removeClass('anchura-80-por-ciento').addClass('anchura-100-por-ciento')
            $("#DivContenedorPaginaCrearUsuario").removeClass('min-height-650px');
            $("form > div").css('max-height', '350px');
            $("#ContenedorPaginaCrearUsuario").removeClass('box-shadow-1')
            $('html, body').css('background-color','#ffffff')
        }
        EliminarLoader('CargandoPaginaCrearUsuario')
        FuncionesInputCrearUsuario()
    } catch (error) {
        EliminarLoader('CargandoPaginaCrearUsuario')
        $("#ContenedorPaginaCrearUsuario").removeClass('box-shadow-1')
        ContenidoPaginaGuardado(false, 'Error al obtener información', $("#ContenedorContenidoPaginaCrearUsuario"))
        console.log(error)
    }
}

function EventosBotonesPaginaCrearUsuario() {
    $("#BotonInformacionBasica, #BotonEditarInformacionBasica").click(function (e) {
        CargarPaginaCrearUsuario(2)
    })
    $("#BotonGuardarInformacionCrearUsuario").click(function (e) {
        let contenido;
        const nombre = $("#CrearUsuarioNombre").val().trim();
        const apellidoPaterno = $("#CrearUsuarioApellidoPaterno").val().trim();
        const apellidoMaterno = $("#CrearUsuarioApellidoMaterno").val().trim();
        const fechaNacimiento = $("#CrearUsuarioFechaNacimiento").val().trim();

        if (nombre.length === 0) {
            contenido = ComponerContenidoAdvertencia(imagenError, tituloError, 'Ingresa el nombre');
            MostrarModal(contenido);
        } else if (apellidoPaterno.length === 0) {
            contenido = ComponerContenidoAdvertencia(imagenError, tituloError, 'Ingresa el apellido paterno');
            MostrarModal(contenido);
        } else if (apellidoMaterno.length === 0) {
            contenido = ComponerContenidoAdvertencia(imagenError, tituloError, 'Ingresa el apellido materno');
            MostrarModal(contenido);
        } else if (fechaNacimiento.length === 0) {
            contenido = ComponerContenidoAdvertencia(imagenError, tituloError, 'Selecciona la fecha de nacimiento');
            MostrarModal(contenido);
        } else {
            ContenidoPaginaGuardando($("#ContenedorContenidoPaginaCrearUsuario"))
            setTimeout(() => {
                upsertArray({
                        Nombre: nombre,
                        ApellidoPaterno: apellidoPaterno,
                        ApellidoMaterno: apellidoMaterno,
                        FechaNacimiento: fechaNacimiento
                    }, InformacionUsuario).then(result => {
                        ContenidoPaginaGuardado(true, 'Información agregada',$("#ContenedorContenidoPaginaCrearUsuario"))
                        setTimeout(() => {
                            NumeroTarjetaSeleccionada = 2
                            CargarPaginaCrearUsuario(1);
                        }, 1000);
                    })
                    .catch(error => {
                        ContenidoPaginaGuardado(false, 'Error al agregar información',$("#ContenedorContenidoPaginaCrearUsuario"))
                        console.log(error)
                        CargarPaginaCrearUsuario(1);
                    });
            }, 1000);


        }
    })

    $("#BotonInformacionContacto, #BotonEditarInformacionContacto").click(function (e) {
        CargarPaginaCrearUsuario(3)
    })

    $("#BotonGuardarContactoCrearUsuario").click(function (e) {
        if ($("#InputCorreoCrearUsuario").val().length == 0) {
            contenido = ComponerContenidoAdvertencia(imagenError, tituloError, 'Ingresa un correo electrónico');
            MostrarModal(contenido);
        } else if (!validarCorreo($("#InputCorreoCrearUsuario").val())) {
            contenido = ComponerContenidoAdvertencia(imagenError, tituloError, 'Ingresa un correo electrónico válido');
            MostrarModal(contenido);
        } else if ($("#TelefonoCrearUsuario").val().length == 0) {
            contenido = ComponerContenidoAdvertencia(imagenError, tituloError, 'Ingresa un teléfono de contacto');
            MostrarModal(contenido);
        } else if (LimpiarTelefono(($("#TelefonoCrearUsuario").val())).length < 10) {
            contenido = ComponerContenidoAdvertencia(imagenError, tituloError, 'Ingresa un teléfono a 10 digitos');
            MostrarModal(contenido);
        } else {
            var correo = $("#InputCorreoCrearUsuario").val().trim()
            var Telefono = LimpiarTelefono($("#TelefonoCrearUsuario").val().trim())
            ContenidoPaginaGuardando($("#ContenedorContenidoPaginaCrearUsuario"))
            setTimeout(() => {
                upsertArray({
                        Correo: correo,
                        Telefono: Telefono
                    }, ContactoUsuario).then(result => {
                        ContenidoPaginaGuardado(true, 'Información agregada',$("#ContenedorContenidoPaginaCrearUsuario"))
                        setTimeout(() => {
                            NumeroTarjetaSeleccionada = 3
                            CargarPaginaCrearUsuario(1);
                        }, 1000);
                    })
                    .catch(error => {
                        ContenidoPaginaGuardado(false, 'Error al agregar información',$("#ContenedorContenidoPaginaCrearUsuario"))
                        console.log(error)
                        CargarPaginaCrearUsuario(1);
                    });
            }, 1000);
        }
    })

    $("#BotonInformacionUsuario, #BotonEditarInformacionCuenta").click(function (e) {
        CargarPaginaCrearUsuario(4)
    })

    $("#BotonGuardarInformacionUsuarioCrearUsuario").click(function (e) {
        if ($("#InputUsuarioCrearUsuario").val().length == 0) {
            contenido = ComponerContenidoAdvertencia(imagenError, tituloError, 'Ingresa un nombre de usuario');
            MostrarModal(contenido);
        } else if ($("#InputPasswordCrearUsuario").val().length == 0) {
            contenido = ComponerContenidoAdvertencia(imagenError, tituloError, 'Ingresa una contraseña');
            MostrarModal(contenido);
        } else if (!validarContraseña($("#InputPasswordCrearUsuario").val())) {
            contenido = ComponerContenidoAdvertencia(imagenError, tituloError, 'Ingresa una contraseña válida');
            MostrarModal(contenido);
        } else if ($("#InputConfirmarPasswordCrearUsuario").val().length == 0) {
            contenido = ComponerContenidoAdvertencia(imagenError, tituloError, 'Confirma la contraseña');
            MostrarModal(contenido);
        } else if ($("#InputConfirmarPasswordCrearUsuario").val().length == 0) {
            contenido = ComponerContenidoAdvertencia(imagenError, tituloError, 'Confirma la contraseña');
            MostrarModal(contenido);
        } else if ($("#InputConfirmarPasswordCrearUsuario").val() !== $("#InputPasswordCrearUsuario").val()) {
            contenido = ComponerContenidoAdvertencia(imagenError, tituloError, 'Las contraseñas no coinciden');
            MostrarModal(contenido);
        } else {
            var usuario = $("#InputUsuarioCrearUsuario").val().trim()
            var password = $("#InputPasswordCrearUsuario").val().trim()
            var confirmarPassword = $("#InputConfirmarPasswordCrearUsuario").val().trim()
            ContenidoPaginaGuardando($("#ContenedorContenidoPaginaCrearUsuario"))
            setTimeout(() => {
                upsertArray({
                        Usuario: usuario,
                        Password: password,
                        ConfirmarPassword: confirmarPassword
                    }, InformacionCuenta).then(result => {
                        ContenidoPaginaGuardado(true, 'Información agregada',$("#ContenedorContenidoPaginaCrearUsuario"))
                        setTimeout(() => {
                            CargarPaginaCrearUsuario(5);
                        }, 1000);
                    })
                    .catch(error => {
                        ContenidoPaginaGuardado(false, 'Error al agregar información',$("#ContenedorContenidoPaginaCrearUsuario"))
                        console.log(error)
                        CargarPaginaCrearUsuario(1);
                    });
            }, 1000);
        }
    })

    $("#BotonGuardarUsuario").click(function (e) {
        var PIN = $("#InputPINCrearUsuario").val().trim()
        var confirmaPIN = $("#InputConfirmarPINCrearUsuario").val().trim()
        ContenidoPaginaGuardando($("#ContenedorContenidoPaginaCrearUsuario"))
        upsertArray({
            PIN: PIN,
            ConfirmarPIN: confirmaPIN
        }, InformacionPIN)
        var array = InformacionUsuario.concat(ContactoUsuario, InformacionCuenta, InformacionPIN);
        const accion = 'Crear_Nuevo_Usuario';
        const data = {
            accion: accion,
            data: array
        };
        ajaxConParametros(undefined, data)
            .then(response => {
                console.log(response)
                response = JSON.parse(response)
                if (response == 'Este correo y/o teléfono y/o usuario ya está registrado') {
                    ContenidoPaginaGuardado(false, response,$("#ContenedorContenidoPaginaCrearUsuario"))
                    setTimeout(() => {
                        NumeroTarjetaSeleccionada = 3
                        CargarPaginaCrearUsuario(1);

                    }, 2000);
                } else {
                    ContenidoPaginaGuardado(true, response,$("#ContenedorContenidoPaginaCrearUsuario"))
                    setTimeout(() => {
                        var token = btoa(Generar_Token());
                        localStorage.setItem('token_confirmacion', token);
                        var redirectUrl = "confirmar-contacto.php?token=" + token;
                        window.location.href = redirectUrl;
                    }, 1000);
                }

            })
            .catch(error => {
                NumeroTarjetaSeleccionada = 1
                ContenidoPaginaGuardado(false, error,$("#ContenedorContenidoPaginaCrearUsuario"))
                console.log(error)
                InformacionUsuario = []
                ContactoUsuario = []
                InformacionCuenta = []
                InformacionPIN = []
                CargarPaginaCrearUsuario(1);
            });
    })

    $("#BotonAtrasPaginaInformacionCrearUsuario, #BotonAtrasPaginaContactoCrearUsuario, #BotonAtrasPaginaCuentaCrearUsuario").click(function (e) {
        CargarPaginaCrearUsuario(1)
    })
}

function ContenidoPaginaCrearUsuario_1() {
    $("#ColumnaTarjetaLogin").addClass('anchura-400-px').removeClass('anchura-80-por-ciento')
    var tarjeta1 = `
    <div class="anchura-100-por-ciento altura-70-px flex flex-center margin-10-px-auto borde-redondeado-5-px padding-5px-superior-inferior ${NumeroTarjetaSeleccionada==1?`tarjeta-hover box-shadow-1`:''}">
        <div class="anchura-70-px altura-100-por-ciento flex flex-center">
            <svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.754 14a2.249 2.249 0 0 1 2.25 2.249v.918a2.75 2.75 0 0 1-.513 1.599C17.945 20.929 15.42 22 12 22c-3.422 0-5.945-1.072-7.487-3.237a2.75 2.75 0 0 1-.51-1.595v-.92a2.249 2.249 0 0 1 2.249-2.25h11.501ZM12 2.004a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"/>
            </svg>
        </div>
        <div class="anchura-100-por-ciento-menos-70-px altura-100-por-ciento flex flex-center">
            <div class="anchura-100-por-ciento-menos-90-px altura-100-por-ciento flex flex-center">
                <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral">
                    <div class="anchura-100-por-ciento altura-30-px flex flex-left">
                        <span>Información básica</span>
                    </div>
                    <div class="anchura-100-por-ciento flex flex-left font-08-rem margin-5-px-auto color-letra-subtitulo">
                        <span>Agrega tu información</span>
                    </div>
                </div>
            </div>
            <div class="anchura-90-px altura-100-por-ciento flex flex-center">
                                ${InformacionUsuario.length==0?`<a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem  position-relative borde-redondeado-5-px" id="BotonInformacionBasica">
                                <span>Agregar</span>
                                </a>`:`
                                <a class="boton altura-35-px anchura-35-px boton-importante borde-redondeado-50-por-ciento flex flex-center" id="BotonEditarInformacionBasica">
                                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.94 5 19 10.06 9.062 20a2.25 2.25 0 0 1-.999.58l-5.116 1.395a.75.75 0 0 1-.92-.921l1.395-5.116a2.25 2.25 0 0 1 .58-.999L13.938 5Zm7.09-2.03a3.578 3.578 0 0 1 0 5.06l-.97.97L15 3.94l.97-.97a3.578 3.578 0 0 1 5.06 0Z" fill="#ffffff"/></svg>
                                </a>`}
            </div>
        </div>
    </div>
`;

    var tarjeta2 = `
    <div class="anchura-100-por-ciento altura-70-px flex flex-center margin-10-px-auto borde-redondeado-5-px padding-5px-superior-inferior ${NumeroTarjetaSeleccionada==2?`tarjeta-hover box-shadow-1`:''}"">
        <div class="anchura-70-px altura-100-por-ciento flex flex-center">
            <svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 8.608v8.142a3.25 3.25 0 0 1-3.066 3.245L18.75 20H5.25a3.25 3.25 0 0 1-3.245-3.066L2 16.75V8.608l9.652 5.056a.75.75 0 0 0 .696 0L22 8.608ZM5.25 4h13.5a3.25 3.25 0 0 1 3.234 2.924L12 12.154l-9.984-5.23a3.25 3.25 0 0 1 3.048-2.919L5.25 4h13.5-13.5Z"/>
            </svg>
        </div>
        <div class="anchura-100-por-ciento-menos-70-px altura-100-por-ciento flex flex-center">
            <div class="anchura-100-por-ciento-menos-90-px altura-100-por-ciento flex flex-center">
                <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral">
                    <div class="anchura-100-por-ciento altura-30-px flex flex-left">
                        <span>Contacto</span>
                    </div>
                    <div class="anchura-100-por-ciento flex flex-left font-08-rem margin-5-px-auto color-letra-subtitulo">
                        <span>Agrega tu contacto</span>
                    </div>
                </div>
            </div>
            <div class="anchura-90-px altura-100-por-ciento flex flex-center">
            ${
                 ContactoUsuario.length == 0 && NumeroTarjetaSeleccionada==2
                  ? `
                    <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem position-relative borde-redondeado-2-px" id="BotonInformacionContacto">
                      <span>Agregar</span>
                    </a>
                  `
                  : ContactoUsuario.length != 0 && InformacionUsuario.length!=0
                  ? `
                    <a class="boton altura-35-px anchura-35-px boton-importante borde-redondeado-50-por-ciento flex flex-center" id="BotonEditarInformacionContacto">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.94 5 19 10.06 9.062 20a2.25 2.25 0 0 1-.999.58l-5.116 1.395a.75.75 0 0 1-.92-.921l1.395-5.116a2.25 2.25 0 0 1 .58-.999L13.938 5Zm7.09-2.03a3.578 3.578 0 0 1 0 5.06l-.97.97L15 3.94l.97-.97a3.578 3.578 0 0 1 5.06 0Z" fill="#ffffff"/>
                      </svg>
                    </a>
                  `
                  : ``
              }
              
            </div>
        </div>
    </div>
`;

    var tarjeta3 = `
    <div class="anchura-100-por-ciento altura-70-px flex flex-center margin-10-px-auto borde-redondeado-5-px padding-5px-superior-inferior ${NumeroTarjetaSeleccionada==3?`tarjeta-hover box-shadow-1`:''}"">
        <div class="anchura-70-px altura-100-por-ciento flex flex-center">
            <svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.25 5A3.25 3.25 0 0 0 2 8.25v7.5A3.25 3.25 0 0 0 5.25 19h13.5A3.25 3.25 0 0 0 22 15.75v-7.5A3.25 3.25 0 0 0 18.75 5H5.25Zm1.03 5.22.72.72.72-.72a.75.75 0 1 1 1.06 1.06l-.719.72.72.718A.75.75 0 1 1 7.72 13.78L7 13.06l-.72.72a.75.75 0 0 1-1.06-1.06l.72-.72-.72-.72a.75.75 0 0 1 1.06-1.06Zm5.5 0 .72.72.72-.72a.75.75 0 1 1 1.06 1.06l-.719.72.72.718a.75.75 0 1 1-1.061 1.061l-.72-.719-.72.72a.75.75 0 1 1-1.06-1.06l.72-.72-.72-.72a.75.75 0 0 1 1.06-1.06Zm3.97 4.03a.75.75 0 0 1 .75-.75h1.75a.75.75 0 0 1 0 1.5H16.5a.75.75 0 0 1-.75-.75Z"/>
            </svg>
        </div>
        <div class="anchura-100-por-ciento-menos-70-px altura-100-por-ciento flex flex-center">
            <div class="anchura-100-por-ciento-menos-90-px altura-100-por-ciento flex flex-center">
                <div class="anchura-100-por-ciento">
                    <div class="anchura-100-por-ciento altura-30-px flex flex-left">
                        <span>Usuario y contraseña</span>
                    </div>
                    <div class="anchura-100-por-ciento flex flex-left font-08-rem margin-5-px-auto color-letra-subtitulo">
                        <span>Configuración de la cuenta</span>
                    </div>
                </div>
            </div>
            <div class="anchura-90-px altura-100-por-ciento flex flex-center">
            ${(NumeroTarjetaSeleccionada === 3 
                && InformacionUsuario.length > 0 
                && ContactoUsuario.length > 0 
                && InformacionCuenta.length == 0) ? `
              <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem position-relative borde-redondeado-2-px" id="BotonInformacionUsuario">
                <span>Agregar</span>
              </a>
            ` :NumeroTarjetaSeleccionada==3
            &&  InformacionUsuario.length > 0 
            && ContactoUsuario.length > 0 
            && InformacionCuenta.length > 0? `<a class="boton altura-35-px anchura-35-px boton-importante borde-redondeado-50-por-ciento flex flex-center" id="BotonEditarInformacionCuenta">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.94 5 19 10.06 9.062 20a2.25 2.25 0 0 1-.999.58l-5.116 1.395a.75.75 0 0 1-.92-.921l1.395-5.116a2.25 2.25 0 0 1 .58-.999L13.938 5Zm7.09-2.03a3.578 3.578 0 0 1 0 5.06l-.97.97L15 3.94l.97-.97a3.578 3.578 0 0 1 5.06 0Z" fill="#ffffff"/>
                      </svg>
                    </a>`:``}
            </div>
        </div>
    </div>
`;
    $("#ContenedorContenidoPaginaCrearUsuario").html(`<div class="overflow-auto">
                    <div class="anchura-100-por-ciento-con-padding-5px-lateral font-11-rem font-family-Montserrat-Semi-Bold padding-5px-lateral altura-30-px flex flex-center margin-10-px-auto">
                        <span id="SpantituloCrearUsuario">Crear usuario</span>
                    </div>
                    <form class="overflow-auto margin-10-px-auto">
                    ${tarjeta1+tarjeta2+tarjeta3}
                    </form>
                    <div class="anchura-100-por-ciento-con-padding-10px-lateral padding-10px-lateral margin-15px-auto-0px-auto altura-50-px flex flex-center">
                        <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-left">
                            <a class="boton boton-solo-letra" href="login.php">Iniciar sesión</a>
                        </div>
                        <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-right">
                        </div>
                    </div>
    </div>`)
    EventosBotonesPaginaCrearUsuario()
}

function ContenidoPaginaCrearUsuario_2() {
    const hoy = new Date();
    hoy.setFullYear(hoy.getFullYear() - 18); // Restar 18 años
    const maxFecha = hoy.toISOString().split('T')[0];
    $("#ColumnaTarjetaLogin").removeClass('anchura-400-px').addClass('anchura-80-por-ciento')
    $("#ContenedorContenidoPaginaCrearUsuario").html(` <div class="overflow-auto">
                    <div class="anchura-100-por-ciento-con-padding-5px-lateral font-11-rem font-family-Montserrat-Semi-Bold padding-5px-lateral altura-30-px flex flex-center margin-10-px-auto">
                        <span>Información básica</span>
                    </div>
                    <form class="overflow-auto margin-10-px-auto">
                        <div class="overflow-auto">
                            <div class="anchura-100-por-ciento flex flex-center flex-wrap">
                                <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto contenedor-input-resizable-50-por-ciento-margin-30px">
                                    <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                        <span class="label-input">Nombre(s)</span>
                                    </div>
                                    <div class="anchura-100-por-ciento altura-40-px">
                                        <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                                            <input type="text" class="input" id="CrearUsuarioNombre" ${InformacionUsuario.length!=0?'value="'+InformacionUsuario[0]['Nombre']+'"':''}>
                                        </div>
                                    </div>
                                </div>

                                <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto contenedor-input-resizable-50-por-ciento-margin-30px">
                                    <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                        <span class="label-input">Apellido paterno</span>
                                    </div>
                                    <div class="anchura-100-por-ciento altura-40-px">
                                        <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                                            <input type="text" class="input" id="CrearUsuarioApellidoPaterno" ${InformacionUsuario.length!=0?'value="'+InformacionUsuario[0]['ApellidoPaterno']+'"':''}>
                                        </div>
                                    </div>
                                </div>

                                <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto contenedor-input-resizable-50-por-ciento-margin-30px">
                                    <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                        <span class="label-input">Apellido materno</span>
                                    </div>
                                    <div class="anchura-100-por-ciento altura-40-px">
                                        <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                                            <input type="text" class="input" id="CrearUsuarioApellidoMaterno" ${InformacionUsuario.length!=0?'value="'+InformacionUsuario[0]['ApellidoMaterno']+'"':''}>
                                        </div>
                                    </div>
                                </div>

                                <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto contenedor-input-resizable-50-por-ciento-margin-30px">
                                    <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                        <span class="label-input">Fecha de nacimiento</span>
                                    </div>
                                    <div class="anchura-100-por-ciento altura-40-px">
                                        <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                                            <input type="date" max="${maxFecha}" class="input" id="CrearUsuarioFechaNacimiento" ${InformacionUsuario.length!=0?'value="'+InformacionUsuario[0]['FechaNacimiento']+'"':''}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="anchura-100-por-ciento-con-padding-10px-lateral padding-10px-lateral margin-15px-auto-0px-auto altura-50-px flex flex-center">
                        <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-left">
                            <a class="boton boton-solo-letra" id="BotonAtrasPaginaInformacionCrearUsuario">Atrás</a>
                        </div>
                        <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-right">
                            <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem min-width-110px position-relative borde-redondeado-5-px" id="BotonGuardarInformacionCrearUsuario">
                                <span>Continuar</span>
                            </a>
                        </div>
                    </div>
    </div>`)
    EventosBotonesPaginaCrearUsuario()
}

function ContenidoPaginaCrearUsuario_3() {
    $("#ColumnaTarjetaLogin").removeClass('anchura-400-px').addClass('anchura-80-por-ciento')
    $("#ContenedorContenidoPaginaCrearUsuario").html(` <div class="overflow-auto">
                    <div class="anchura-100-por-ciento-con-padding-5px-lateral font-11-rem font-family-Montserrat-Semi-Bold padding-5px-lateral altura-30-px flex flex-center margin-10-px-auto">
                        <span>Información de contacto</span>
                    </div>
                    <form class="overflow-auto margin-10-px-auto">
                        <div class="overflow-auto">
                            <div class="anchura-100-por-ciento flex flex-center flex-wrap">
                                <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto contenedor-input-resizable-50-por-ciento-margin-30px">
                                    <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                        <span class="label-input">Correo electrónico</span>
                                    </div>
                                    <div class="anchura-100-por-ciento altura-40-px">
                                        <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                                            <input type="text" class="input" id="InputCorreoCrearUsuario" value="${ContactoUsuario.length!=0?ContactoUsuario[0]['Correo']:''}">
                                        </div>
                                    </div>
                                </div>
                                <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto contenedor-input-resizable-50-por-ciento-margin-30px">
                                    <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                        <span class="label-input">Teléfono</span>
                                    </div>
                                    <div class="anchura-100-por-ciento altura-40-px flex flex-center bg-color-input borde-redondeado-5-px">

                                        <div class="altura-100-por-ciento anchura-70-px flex flex-center color-letra-subtitulo" id="ContainerCodigoAreaCrearUsuario">
                                               <span>+52</span>
                                        </div>
                                        <div class="anchura-100-por-ciento-menos-70-px altura-100-por-ciento flex flex-center">
                                            <div class=" altura-100-por-ciento anchura-100-por-ciento ">
                                                <input type="text" class="input" id="TelefonoCrearUsuario" value="${ContactoUsuario.length!=0?LimpiarTelefono(ContactoUsuario[0]['Telefono']):''}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </form>
                    <div class="anchura-100-por-ciento-con-padding-10px-lateral padding-10px-lateral margin-15px-auto-0px-auto altura-50-px flex flex-center">
                        <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-left">
                            <a class="boton boton-solo-letra" id="BotonAtrasPaginaContactoCrearUsuario">Atrás</a>
                        </div>
                        <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-right">
                            <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem min-width-110px position-relative borde-redondeado-5-px" id="BotonGuardarContactoCrearUsuario">
                                <span>Continuar</span>
                            </a>
                        </div>
                    </div>
                </div>`)
    EventosBotonesPaginaCrearUsuario()
}

function ContenidoPaginaCrearUsuario_4() {
    console.log(InformacionCuenta)
    $("#ColumnaTarjetaLogin").removeClass('anchura-400-px').addClass('anchura-80-por-ciento')
    $("#ContenedorContenidoPaginaCrearUsuario").html(`<div class="overflow-auto">
                    <div class="anchura-100-por-ciento-con-padding-5px-lateral font-11-rem font-family-Montserrat-Semi-Bold padding-5px-lateral altura-30-px flex flex-center margin-10-px-auto">
                        <span>Información de usuario y contraseña</span>
                    </div>
                    <form class="overflow-auto margin-10-px-auto">
                        <div class="overflow-auto">
                            <div class="anchura-100-por-ciento flex flex-center flex-wrap" style="max-height: 400px;">
                                <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto">
                                    <div class="altura-70-px anchura-100-por-ciento flex flex-center margin-15-px-auto">
                                        <div class="altura-100-por-ciento anchura-100-por-ciento-menos-130-px flex flex-center">
                                            <div class="altura-100-por-ciento anchura-100-por-ciento-menos-20-px margin-10-px-auto">
                                                <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                                    <span class="label-input">Usuario</span>
                                                </div>
                                                <div class="anchura-100-por-ciento altura-40-px">
                                                    <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                                                        <input type="text" class="input" id="InputUsuarioCrearUsuario" ${InformacionCuenta.length!=0?'value="'+InformacionCuenta[0].Usuario:''}">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="altura-100-por-ciento anchura-130-px flex flex-center">
                                            <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem position-relative borde-redondeado-5-px" id="BotonGenerarUsuarioCrearUsuario">
                                                <span>Generar</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div class=" anchura-100-por-ciento-menos-30-px margin-10-px-auto  font-09-rem flex flex-center bg-color-dbedf8  borde-redondeado-5-px">
                                    <div class="altura-100-por-ciento anchura-100-por-ciento-menos-20-px padding-10px color1474c4" style="font-weight: 500; text-align: justify;">
                                        <span>Para garantizar la seguridad de tu cuenta, utiliza una contraseña de al menos 8 caracteres que combinan letras mayúsculas y minúsculas, números y símbolos. Evita usar información personal o secuencias fáciles de adivinar.</span>
                                    </div>
                                </div>
                                <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-10-px-auto contenedor-input-resizable-50-por-ciento-margin-30px">
                                    <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                        <span class="label-input">Ingresa una contraseña</span>
                                    </div>
                                    <div class="anchura-100-por-ciento altura-40-px flex flex-center bg-color-input borde-redondeado-5-px">
                                        <div class="anchura-100-por-ciento-menos-40-px altura-100-por-ciento flex flex-center">
                                            <div class=" altura-100-por-ciento anchura-100-por-ciento ">
                                                <input type="password" autocomplete="false" class="input" id="InputPasswordCrearUsuario" ${InformacionCuenta.length!=0?'value="'+InformacionCuenta[0].Password:''}">
                                            </div>
                                        </div>
                                        <div class="altura-100-por-ciento anchura-40-px flex flex-center" id="ContenedorAlertPassword">
                                        </div>
                                    </div>
                                </div>
                                <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto contenedor-input-resizable-50-por-ciento-margin-30px">
                                    <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                        <span class="label-input">Confirma tu contraseña</span>
                                    </div>
                                    <div class="anchura-100-por-ciento altura-40-px flex flex-center bg-color-input borde-redondeado-5-px">
                                        <div class="anchura-100-por-ciento-menos-40-px altura-100-por-ciento flex flex-center">
                                            <div class=" altura-100-por-ciento anchura-100-por-ciento ">
                                                <input type="password"  autocomplete="false" class="input" id="InputConfirmarPasswordCrearUsuario" ${InformacionCuenta.length!=0?'value="'+InformacionCuenta[0].ConfirmarPassword:''}">
                                            </div>
                                        </div>
                                        <div class="altura-100-por-ciento anchura-40-px flex flex-center" id="ContenedorAlertConfirmaPassword" >
                                        </div>
                                    </div>
                                </div>
                                <div class="anchura-100-por-ciento altura-40-px margin-10-px-auto flex flex-center ">
                                    <div class="bg-color-input borde-redondeado-5-px anchura-100-por-ciento-menos-30-px margin-0-px-auto">
                                        <div class="altura-100-por-ciento anchura-100-por-ciento-menos-20-px padding-10px flex flex-center" style="font-weight: 500;">
                                            <div class="altura-100-por-ciento anchura-40-px flex flex-center">
                                                <input type="checkbox" class="checkbox-round" id="CheckBoxViewPassword" />
                                            </div>
                                            <div class="anchura-100-por-ciento-menos-40-px altura-100-por-ciento flex flex-left">
                                                <div class=" anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral">
                                                    <label for="CheckBoxViewPassword">Ver contraseña</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </form>
                    <div class="anchura-100-por-ciento-con-padding-10px-lateral padding-10px-lateral margin-15px-auto-0px-auto altura-50-px flex flex-center">
                        <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-left">
                            <a class="boton boton-solo-letra" id="BotonAtrasPaginaCuentaCrearUsuario">Atrás</a>
                        </div>
                        <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-right">
                            <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem min-width-110px position-relative borde-redondeado-5-px" id="BotonGuardarInformacionUsuarioCrearUsuario">
                                <span>Continuar</span>
                            </a>
                        </div>
                    </div>
                </div>`)
    EventosBotonesPaginaCrearUsuario()
}

function ContenidoPaginaCrearUsuario_5() {
    $("#ColumnaTarjetaLogin").removeClass('anchura-80-por-ciento').addClass('anchura-400-px')
    $("#ContenedorContenidoPaginaCrearUsuario").html(`<div class="overflow-auto">
                    <div class="anchura-100-por-ciento-con-padding-5px-lateral font-11-rem font-family-Montserrat-Semi-Bold padding-5px-lateral altura-30-px flex flex-center margin-10-px-auto">
                        <span>Configura un PIN</span>
                    </div>
                    <form class="overflow-auto margin-10-px-auto">
                        <div class="overflow-auto">
                                
                            <div class="anchura-100-por-ciento flex flex-center flex-wrap" style="max-height: 300px;">
                                <div class=" anchura-100-por-ciento font-09-rem flex flex-center bg-color-dbedf8  borde-redondeado-5-px">
                                    <div class="altura-100-por-ciento anchura-100-por-ciento-menos-20-px padding-10px color1474c4" style="font-weight: 500;">
                                        <span>Elige un PIN de 4 dígitos seguro, evitando combinaciones predecibles como "1234" o "0000" para proteger la información.</span>
                                    </div>
                                </div>
                                <div class="anchura-50-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto">
                                    <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                        <span class="label-input">PIN</span>
                                    </div>
                                    <div class="anchura-100-por-ciento altura-40-px">
                                     <div class="anchura-100-por-ciento altura-40-px flex flex-center bg-color-input borde-redondeado-5-px">
                                        <div class="anchura-100-por-ciento-menos-40-px altura-100-por-ciento flex flex-center">
                                            <div class=" altura-100-por-ciento anchura-100-por-ciento ">
                                                <input type="password"  autocomplete="false" class="input" id="InputPINCrearUsuario">
                                            </div>
                                        </div>
                                        <div class="altura-100-por-ciento anchura-40-px flex flex-center" id="ContenedorAlertPIN">
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div class="anchura-50-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto">
                                    <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                        <span class="label-input">Confirma</span>
                                    </div>
                                    <div class="anchura-100-por-ciento altura-40-px">
                                       <div class="anchura-100-por-ciento altura-40-px flex flex-center bg-color-input borde-redondeado-5-px">
                                        <div class="anchura-100-por-ciento-menos-40-px altura-100-por-ciento flex flex-center">
                                            <div class=" altura-100-por-ciento anchura-100-por-ciento ">
                                                <input type="password"  autocomplete="false" class="input" id="InputConfirmarPINCrearUsuario">
                                            </div>
                                        </div>
                                        <div class="altura-100-por-ciento anchura-40-px flex flex-center" id="ContenedorAlertConfirmarPIN">
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                 <div class="anchura-100-por-ciento altura-40-px margin-10-px-auto flex flex-center ">
                                    <div class="bg-color-input borde-redondeado-5-px anchura-100-por-ciento-con-padding-5px-lateral margin-0px-5px">
                                        <div class="altura-100-por-ciento anchura-100-por-ciento-menos-20-px padding-10px flex flex-center" style="font-weight: 500;">
                                            <div class="altura-100-por-ciento anchura-40-px flex flex-center">
                                                <input type="checkbox" class="checkbox-round" id="CheckBoxViewPIN" />
                                            </div>
                                            <div class="anchura-100-por-ciento-menos-40-px altura-100-por-ciento flex flex-left">
                                                <div class=" anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral">
                                                    <label for="CheckBoxViewPIN">Ver PIN</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="anchura-100-por-ciento-con-padding-10px-lateral padding-10px-lateral margin-15px-auto-0px-auto altura-50-px flex flex-center">
                        <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-left">
                        </div>
                        <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-right">
                            <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem min-width-110px position-relative borde-redondeado-2-px" id="BotonGuardarUsuario">
                                <span>Continuar</span>
                            </a>
                        </div>
                    </div>
                </div>`)
    EventosBotonesPaginaCrearUsuario()
}




function FuncionesInputCrearUsuario() {
    soloLetras('#CrearUsuarioNombre');
    limitarCaracteres("#CrearUsuarioNombre")
    soloLetras('#CrearUsuarioApellidoPaterno')
    limitarCaracteres("#CrearUsuarioApellidoPaterno")
    soloLetras('#CrearUsuarioApellidoMaterno')
    limitarCaracteres("#CrearUsuarioApellidoMaterno")
    limitarCaracteres("#InputCorreoCrearUsuario")
    limitarCaracteres($("#TelefonoCrearUsuario"), 10)
    soloNumeros("#TelefonoCrearUsuario")
    limitarCaracteres($("#InputUsuarioCrearUsuario"), 20)
    limitarCaracteres($("#InputPasswordCrearUsuario"), 15)
    limitarCaracteres($("#InputConfirmarPasswordCrearUsuario"), 15)

    soloNumeros($("#InputConfirmarPINCrearUsuario"))
    soloNumeros($("#InputPINCrearUsuario"))
    limitarCaracteres($("#InputConfirmarPINCrearUsuario"), 4)
    limitarCaracteres($("#InputPINCrearUsuario"), 4)


    $('#InputCorreoCrearUsuario').on('keyup', function (e) {
        const input = $(this);
        const valor = input.val().toLowerCase(); // Obtener el texto ingresado por el usuario
        const posicionArroba = valor.indexOf('@'); // Encontrar la posición de @

        if (posicionArroba !== -1) {
            SetContainerOpciones($("#InputCorreoCrearUsuario").parent(), dominios, 'OpcionesCorreo');
            const dominio = valor.slice(posicionArroba); // Obtener el texto después del '@'
            let foundExactMatch = false;
            var noCoincidencia = true
            $('#contenedor-opciones li').each(function () {
                const li = $(this);
                const textoLi = li.text().trim().toLowerCase(); // Obtener el texto del <li>
                let textoNuevo = '';
                let index = 0; // Índice del texto del li

                for (let i = 0; i < textoLi.length; i++) {
                    const letra = textoLi[i].toLowerCase();
                    if (dominio[index] && letra === dominio[index]) {
                        textoNuevo += `<strong>${textoLi[i]}</strong>`;
                        index++; // Avanzar al siguiente carácter ingresado por el usuario
                    } else {
                        // Si no coincide, solo añadir la letra tal cual
                        textoNuevo += textoLi[i];
                    }

                }

                // Actualiza el HTML del li con el texto modificado (letras en negrita)
                li.html(textoNuevo);

                // Mostrar u ocultar el li según si tiene alguna coincidencia con el dominio
                if (textoLi.includes(dominio) && dominio.length > 0) {
                    li.show();
                    noCoincidencia = false;
                } else {
                    li.hide()
                }
                if (noCoincidencia) {
                    $('#contenedor-opciones').hide();
                }
                if (textoLi == dominio) {
                    foundExactMatch = true; // Se encontró una coincidencia exacta
                }
                $('#contenedor-opciones li').on('click', function () {
                    var user = valor.slice(0, posicionArroba);
                    const textoSeleccionado = $(this).text().trim();
                    $('#InputCorreoCrearUsuario').val(user + textoSeleccionado);
                    // Opcional: ocultar el contenedor de opciones después de seleccionar
                    $('#contenedor-opciones').remove();
                });
            });
            if (foundExactMatch) {
                $('#contenedor-opciones').remove();
            }
        }
    });
    $("#TelefonoCrearUsuario").on('blur', function () {
        $(this).val(FormatearTelefono($(this).val()))
    });

    $("#TelefonoCrearUsuario").on('focus', function () {
        $(this).val(LimpiarTelefono($(this).val()));
    });

    $("#CheckBoxViewPassword").change(function (e) {
        CambiarTipoInputPassword($("#InputPasswordCrearUsuario").get(0));
        CambiarTipoInputPassword($("#InputConfirmarPasswordCrearUsuario").get(0));
    });

    $("#InputUsuarioCrearUsuario").on('input', function (e) {
        soloLetrasyNumeros($("#InputUsuarioCrearUsuario"))
    })

    $("#BotonGenerarUsuarioCrearUsuario").click(function (e) {
        const usuario = InformacionUsuario[0];

        const nombre = usuario.Nombre;
        const apellidoPaterno = usuario.ApellidoPaterno;
        const apellidoMaterno = usuario.ApellidoMaterno;
        const fechaNacimiento = usuario.FechaNacimiento;

        // Selección aleatoria de las letras del nombre y apellidos
        const nombreAleatorio = nombre.substring(0, Math.floor(Math.random() * nombre.length) + 1).toLowerCase(); // Tomamos entre 1 y 3 letras del nombre
        const apellidoPaternoAleatorio = apellidoPaterno.substring(0, Math.floor(Math.random() * apellidoPaterno.length) + 1).toLowerCase(); // Tomamos entre 1 y 3 letras del apellido paterno
        const apellidoMaternoAleatorio = apellidoMaterno.substring(0, Math.floor(Math.random() * apellidoMaterno.length) + 1).toLowerCase(); // Tomamos entre 1 y 3 letras del apellido materno

        // Crear una combinación aleatoria de letras del nombre y apellidos con el año de nacimiento
        const usuarioGenerado = `${nombreAleatorio}${apellidoPaternoAleatorio}${apellidoMaternoAleatorio}${Math.floor(Math.random() * 100)}`; // Agregamos un número aleatorio para hacerlo único
        $("#InputUsuarioCrearUsuario").val(usuarioGenerado)
    })

    $("#InputPasswordCrearUsuario").on("keyup", function () {
        const contraseña = $(this).val();

        if (validarContraseña(contraseña)) {
            $("#ContenedorAlertPassword").html(`<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm3.22 6.97-4.47 4.47-1.97-1.97a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l5-5a.75.75 0 1 0-1.06-1.06Z" fill="#009929"/></svg>`)
        } else {
            $("#ContenedorAlertPassword").html(`<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm3.53 6.47-.084-.073a.75.75 0 0 0-.882-.007l-.094.08L12 10.939l-2.47-2.47-.084-.072a.75.75 0 0 0-.882-.007l-.094.08-.073.084a.75.75 0 0 0-.007.882l.08.094L10.939 12l-2.47 2.47-.072.084a.75.75 0 0 0-.007.882l.08.094.084.073a.75.75 0 0 0 .882.007l.094-.08L12 13.061l2.47 2.47.084.072a.75.75 0 0 0 .882.007l.094-.08.073-.084a.75.75 0 0 0 .007-.882l-.08-.094L13.061 12l2.47-2.47.072-.084a.75.75 0 0 0 .007-.882l-.08-.094-.084-.073.084.073Z" fill="#af0d0d"/></svg>`)
        }
    });

    $("#InputConfirmarPasswordCrearUsuario, #InputPasswordCrearUsuario").on('keyup', function (e) {
        ValidarContraseñasCoinciden($("#InputPasswordCrearUsuario").val(),
            $("#InputConfirmarPasswordCrearUsuario").val(),
            $("#ContenedorAlertConfirmaPassword"))
    })

    $("#CheckBoxViewPIN").change(function (e) {
        CambiarTipoInputPassword($("#InputPINCrearUsuario").get(0));
        CambiarTipoInputPassword($("#InputConfirmarPINCrearUsuario").get(0));
    })
    $("#InputPINCrearUsuario").on("keyup", function () {
        const pin = $(this).val();

        if (validarPIN(pin)) {
            $("#ContenedorAlertPIN").html(`<svg  width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm3.22 6.97-4.47 4.47-1.97-1.97a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l5-5a.75.75 0 1 0-1.06-1.06Z" fill="#009929"/></svg>`)
        } else {
            $("#ContenedorAlertPIN").html(`<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm3.53 6.47-.084-.073a.75.75 0 0 0-.882-.007l-.094.08L12 10.939l-2.47-2.47-.084-.072a.75.75 0 0 0-.882-.007l-.094.08-.073.084a.75.75 0 0 0-.007.882l.08.094L10.939 12l-2.47 2.47-.072.084a.75.75 0 0 0-.007.882l.08.094.084.073a.75.75 0 0 0 .882.007l.094-.08L12 13.061l2.47 2.47.084.072a.75.75 0 0 0 .882.007l.094-.08.073-.084a.75.75 0 0 0 .007-.882l-.08-.094L13.061 12l2.47-2.47.072-.084a.75.75 0 0 0 .007-.882l-.08-.094-.084-.073.084.073Z" fill="#af0d0d"/></svg>`)
        }
    });
    $("#InputPINCrearUsuario, #InputConfirmarPINCrearUsuario").on('keyup', function (e) {
        ValidarContraseñasCoinciden($("#InputPINCrearUsuario").val(),
            $("#InputConfirmarPINCrearUsuario").val(),
            $("#ContenedorAlertConfirmarPIN"))
    })
}



function ValidarContraseñasCoinciden(password, confirmar, contenedor) {

    if (password.length != 0 && password === confirmar) {
        contenedor.html(`<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm3.22 6.97-4.47 4.47-1.97-1.97a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l5-5a.75.75 0 1 0-1.06-1.06Z" fill="#009929"/></svg>`)
    } else {
        contenedor.html(`<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm3.53 6.47-.084-.073a.75.75 0 0 0-.882-.007l-.094.08L12 10.939l-2.47-2.47-.084-.072a.75.75 0 0 0-.882-.007l-.094.08-.073.084a.75.75 0 0 0-.007.882l.08.094L10.939 12l-2.47 2.47-.072.084a.75.75 0 0 0-.007.882l.08.094.084.073a.75.75 0 0 0 .882.007l.094-.08L12 13.061l2.47 2.47.084.072a.75.75 0 0 0 .882.007l.094-.08.073-.084a.75.75 0 0 0 .007-.882l-.08-.094L13.061 12l2.47-2.47.072-.084a.75.75 0 0 0 .007-.882l-.08-.094-.084-.073.084.073Z" fill="#af0d0d"/></svg>`)
    }
}

function validarPIN(pin) {
    const regex = /^\d{4}$/;
    if (!regex.test(pin)) return false;

    // Evitar combinaciones comunes
    const comunes = ["1234", "4321", "1111", "0000", "2222"];
    if (comunes.includes(pin)) return false;

    // Validar que no tenga más de 2 números consecutivos (asc o desc)
    let consecutivos = 1;

    for (let i = 1; i < pin.length; i++) {
        const diff = pin[i] - pin[i - 1];

        if (diff === 1 || diff === -1) {
            consecutivos++;
            if (consecutivos > 2) return false;
        } else {
            consecutivos = 1;
        }
    }

    return true;
}

function Generar_Token() {
    var array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return array.join('');
}