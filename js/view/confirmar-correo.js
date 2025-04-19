let verificado = false
$(document).ready(function (e) {
    soloNumeros($(".input-codigo-confirmacion"))
    limitarCaracteres(".input-codigo-confirmacion", 1)
    var urlParams = new URLSearchParams(window.location.search);
    var tokenFromUrl = urlParams.get('token');

    // Obtener el token guardado en localStorage o una variable
    var tokenFromStorage = localStorage.getItem('token_confirmacion'); // Si lo guardaste en localStorage

    if (!tokenFromUrl || !tokenFromStorage || tokenFromUrl !== tokenFromStorage) {
        // Si no hay token o no coinciden, redirigir
        window.location.href = "crear-usuario.php";
    } else {
        InicializarPaginaEnviarCorreo()
    }
})

$(".input-codigo-confirmacion").focus(function (e) {
    ResaltarInput2px($(this).parent())
})
$(".input-codigo-confirmacion").blur(function (e) {
    NoResaltarInput2px($(this).parent())
    let inputsVacios = $(".input-codigo-confirmacion").filter(function () {
        return $(this).val().trim() === '';
    });

    if (inputsVacios.length === $(".input-codigo-confirmacion").length) {
        $(".input-codigo-confirmacion").eq(0).focus();
    }
})
// Detecta cuando el usuario escribe algo en los inputs con clase .input-codigo-confirmacion
$(".input-codigo-confirmacion").on('input', function (e) {
    let $this = $(this);
    let value = $this.val();
    let $inputs = $(".input-codigo-confirmacion");

    if ($.isNumeric(value)) {
        let index = $inputs.index($this);
        if (index + 1 < $inputs.length) {
            $inputs.eq(index + 1).prop('disabled', false).focus();
            ResaltarInput2px($inputs.eq(index + 1).parent())
        }
        let todosLlenos = true;
        $inputs.each(function () {
            if ($(this).val().trim() === '') {
                todosLlenos = false;
                return false; // Salir del bucle si se encuentra un input vacío
            }
        });
        if (todosLlenos && !verificado) {
            verificado = true
            VerificarCodigoIntroducido()
        }
    }
}).on('keydown', function (e) {
    if (e.key === 'Backspace') {
        let $this = $(this);
        let $inputs = $(".input-codigo-confirmacion");
        let index = $inputs.index($this);
        if ($this.val() !== '') {
            // Si el input no está vacío, borrar el valor
            $this.val('');
        } else {
            // Si el input está vacío, mover el foco al input anterior
            if (index - 1 >= 0) {
                $inputs.eq(index).prop('disabled', true)
                $inputs.eq(index - 1).focus();

            }
        }

        // Evitar el comportamiento por defecto de la tecla Delete
        e.preventDefault();
    }
    if (e.key === 'ArrowRight') {
        let $inputs = $(".input-codigo-confirmacion");
        let $this = $(this);
        let index = $inputs.index($this);
        let newIndex = (index + 1) % $inputs.length; // Calcula el nuevo índice

        $inputs.eq(index).blur();
        NoResaltarInput2px($inputs.eq(index).parent());
        $inputs.eq(newIndex).focus();
        ResaltarInput2px($inputs.eq(newIndex).parent());
    }


    if (e.key === 'ArrowLeft') {
        let $this = $(this);
        let $inputs = $(".input-codigo-confirmacion");
        let index = $inputs.index($this);
        let newIndex = (index - 1 + $inputs.length) % $inputs.length; // Calcula el nuevo índice

        $inputs.eq(index).blur();
        NoResaltarInput2px($inputs.eq(index).parent());
        $inputs.eq(newIndex).focus();
        ResaltarInput2px($inputs.eq(newIndex).parent());
    }
    $(".input-codigo-confirmacion").on('paste', function (e) {
        let $this = $(this);
        let pastedData = (e.originalEvent || e).clipboardData.getData('text/plain');
        let digits = pastedData.match(/\d/g);
        let $inputs = $(".input-codigo-confirmacion");
        let currentIndex = $inputs.index($this);

        if (digits && digits.length === 6) {
            digits.forEach(function (digit, index) {
                let nextIndex = currentIndex + index;
                if (nextIndex < $inputs.length) {
                    $inputs.eq(nextIndex).val(digit);
                }
            });
            $inputs.not($inputs.eq(currentIndex + digits.length - 1)).blur()
            $inputs.prop('disabled', false)
            $inputs.eq(currentIndex + digits.length - 1).focus();

            let todosLlenos = true;
            $inputs.each(function () {
                if ($(this).val().trim() === '') {
                    todosLlenos = false;
                    return false; // Salir del bucle si se encuentra un input vacío
                }
            });
            if (todosLlenos && !verificado) {
                verificado = true; // Marca que ya se ejecutó la función
                VerificarCodigoIntroducido();
            }
        }

    })

})

function VerificarCodigoIntroducido() {
    let todosConDigitos = true;
    let numeroFinal = '';
    $(".input-codigo-confirmacion").each(function () {
        let valor = $(this).val();
        if (!/\d/.test(valor)) {
            todosConDigitos = false;
        } else {
            numeroFinal += valor;
        }
    })

    if (todosConDigitos) {
        MostrarModal(ComponerModalCargando('Verificando código', 'auto', '400px'), false)
        const data = {
            accion: 'Verificar_codigo_solo_uso',
            data: ['Verificacion', numeroFinal]
        };
        ajaxConParametros(undefined, data)
            .then(response => {
                response = JSON.parse(response)
                if (response == 'Código válido') {
                    contenido = ComponerContenidoAdvertencia('../../icons/windows/check.png', 'Código correcto', 'Espera por favor');
                    MostrarModal(contenido, false)

                    setTimeout(() => {
                        CerrarModal()
                    }, 1000);
                    $("#ContenedorPaginaCrearUsuario").html(`<div class="anchura-100-por-ciento flex flex-center margin-30-px-auto">
                    <img src="../../icons/windows/fiesta.png" style="height:200px">
                </div>
                <div class="anchura-100-por-ciento altura-50-px flex flex-center margin-20-px-auto color1474c4" style="font-size: 1.5rem;">
                    <span>¡Todo listo!</span>
                </div>
                <div class="anchura-100-por-ciento flex flex-center margin-15-px-auto font-12-rem">
                    <span>Ya puedes usar tu cuenta</span>
                </div>
                <div class="anchura-100-por-ciento altura-50-px margin-30-px-auto flex flex-center">
                    <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem min-width-110px position-relative borde-redondeado-2-px" href="login.php">
                        <span>Iniciar sesión</span>
                    </a>
                </div>`)
                localStorage.removeItem('token_confirmacion'); 
                } else {
                    contenido = ComponerContenidoAdvertencia('../../icons/windows/exclamacion.png', 'Código incorrecto', 'Por favor verifica');
                    console.log(response)
                    verificado = false
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
}

async function EnviarMensajeCodigoSoloUso(tipo) {
    localStorage.removeItem('Reenvio_Correo_Verificar');
    MostrarModal(ComponerModalCargando('Enviando mensaje', 'auto', '400px'), false)
    const data = {
        accion: 'Enviar_mensaje_codigo_solo_uso',
        data: tipo
    };
    ajaxConParametros(undefined, data)
        .then(response => {
            response = JSON.parse(response)
            if (response == 'Correo enviado exitosamente') {
                contenido = ComponerContenidoAdvertencia('../../icons/windows/sobre-enviado.png', 'Mensaje enviado', 'Revisa tu correo electrónico');
                MostrarModal(contenido, false)
                actualizarContador()
                setTimeout(() => {
                    CerrarModal()
                }, 1500);
            } else {
                contenido = ComponerContenidoAdvertencia('../../icons/windows/sobre-error.png', 'Mensaje no enviado', response);
                console.log(response)
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
    ReenviarCorreo()
}

function InicializarPaginaEnviarCorreo() {
    MostrarModal(ComponerModalCargando('Generando código', 'auto', '400px'), false)
    const data = {
        accion: 'Generar_codigo',
        data: 'Verificacion'
    };
    ajaxConParametros(undefined, data)
        .then(response => {
            response = JSON.parse(response)
            if (response === 'Código vigente') {
                contenido = ComponerContenidoAdvertencia('../../icons/windows/sobre.png', 'Ya existe un código', 'Revisa tu correo electrónico');
                MostrarModal(contenido, false)
                actualizarContador()
                setTimeout(() => {
                    CerrarModal()
                }, 1000);
            } else if (response == 'Código generado') {
                limpiarContador()
                contenido = ComponerContenidoAdvertencia('../../icons/windows/check.png', 'Código generado', 'Espera por favor');
                MostrarModal(contenido, false)
                setTimeout(() => {
                    EnviarMensajeCodigoSoloUso('Verificacion')
                }, 1500);

            } else {
                contenido = ComponerContenidoAdvertencia('../../icons/windows/error.png', 'Error', 'Ocurrió un error al generar el código');
                console.log(response)
                MostrarModal(contenido, false)
            }
        })
        .catch(error => {
            contenido = ComponerContenidoAdvertencia('../../icons/windows/eliminar.png', 'Error', 'Intenta más tarde');
            console.log(error)
            MostrarModal(contenido, false)
            setTimeout(() => {
                CerrarModal()
                window.location.href = "crear-usuario.php";
            }, 1000);
        })

    $(".input-codigo-confirmacion").eq(0).focus()
    ResaltarInput2px($(".input-codigo-confirmacion").eq(0).parent())
}

function EventoBotonReenviarCorreo() {
    $("#BotonReenviarCorreo").click(function (e) {
        EnviarMensajeCodigoSoloUso('Verificacion')
        ContadorBoton()
    })
}



function ReenviarCorreo() {
    $("#BotonReenviarCorreo").click(function (e) {
        EnviarMensajeCodigoSoloUso('Verificacion').then(function (e) {
            iniciarContador()
            reenvio++;
            localStorage.setItem('Reenvio_Correo_Verificar', reenvio);
        })

    })
}

var reenvio = localStorage.getItem('Reenvio_Correo_Verificar') || 0;

function iniciarContador() {
    localStorage.setItem('fechaInicio', new Date().toISOString());
    localStorage.setItem('contadorDuracion', 180);

}

function actualizarContador() {
    var duracion = cargarContador();

    if (duracion > 0) {
        var minutos = Math.floor(duracion / 60);
        var segundos = duracion % 60;

        // Formatear los minutos y segundos para que siempre tengan dos dígitos
        // Formatear los minutos y segundos para que siempre tengan dos dígitos
        minutos = minutos < 10 ? "0" + minutos : minutos;
        segundos = segundos < 10 ? "0" + segundos : "" + segundos;

        $("#ContenedorBotonReenviarCorreo").html('<span class=" color-letra-subtitulo">Puedes reenviar el mensaje en ' + minutos + ':' + segundos + '</span>');

        setTimeout(actualizarContador, 1000);
    } else {
        limpiarContador();
        reenvio = localStorage.getItem('Reenvio_Correo_Verificar')
        if (reenvio <= 3) {
            $("#ContenedorBotonReenviarCorreo").html('<a class="boton boton-solo-letra" id="BotonReenviarCorreo">Reenviar correo</a>');
            ReenviarCorreo();
        } else {
            $("#ContenedorBotonReenviarCorreo").html('')
        }

    }
}



function cargarContador() {
    var duracion = localStorage.getItem('contadorDuracion');
    var fechaInicio = localStorage.getItem('fechaInicio');

    // Verificar si hay un contador almacenado y es mayor que cero
    if (duracion > 0 && fechaInicio) {
        // Calcular el tiempo transcurrido desde la última vez que se estableció el contador
        var tiempoTranscurrido = Math.floor((new Date() - new Date(fechaInicio)) / 1000);

        // Restar el tiempo transcurrido del tiempo original para obtener el tiempo restante
        duracion -= tiempoTranscurrido;

        // Si el tiempo restante es menor o igual a cero, limpiar el contador
        if (duracion <= 0) {
            limpiarContador();
        }
    }

    return duracion;
}

function limpiarContador() {
    localStorage.removeItem('contadorDuracion');
    localStorage.removeItem('fechaInicio');
}