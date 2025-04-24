function soloLetras(selector) {
    $(selector).on('keypress', function (e) {
        const char = String.fromCharCode(e.which);
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(char)) {
            e.preventDefault();
        }
    });

    // También limpia lo que el usuario pegue
    $(selector).on('input', function () {
        this.value = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    });
}

function limitarCaracteres(selector, maxCaracteres = 50) {
    $(selector).on('input', function () {
        if (this.value.length > maxCaracteres) {
            this.value = this.value.substring(0, maxCaracteres);
        }
    });
}

function soloNumeros(selector) {
    $(selector).on('keydown', function (e) {
        // Teclas permitidas: backspace, delete, tab, escape, enter, punto (para decimales)
        if ($.inArray(e.keyCode, [46, 8, 9]) !== -1 ||
            // Permitir Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode === 88 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Permitir teclas de navegación: home, end, flechas, etc.
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            return;
        }

        // Si la tecla presionada no es un número, evitar la acción
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
            (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
}

function LimpiarTelefono(valor) {
    let nuevoValor = valor.replace(/-/g, '');
    return nuevoValor
}

function validarCorreo(correo) {
    // Expresión regular para validar correo (no es 100% infalible, pero cubre la mayoría de casos)
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo);
}

function FormatearTelefono(valor) {
    let digitos = valor.replace(/\D/g, '');

    // Verifica que tenga 10 dígitos (puedes ajustar la longitud si es necesario)
    if (digitos.length === 10) {
        let formato;
        // Comprueba si comienza con 55, 33 u 81
        if (digitos.startsWith('55') || digitos.startsWith('33') || digitos.startsWith('81')) {
            // Formato: xx-xx-xx-xx-xx
            formato = digitos.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3-$4-$5');
        } else {
            // Formato: xxx-xxx-xx-xx
            formato = digitos.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1-$2-$3-$4');
        }
        return formato;
    }
}

function CambiarTipoInputPassword(input) {
    if (input && input.type === "password") {
        input.type = "text";
    } else if (input && input.type === "text") {
        input.type = "password";
    }
}

function soloLetrasyNumeros(input) {
    input.val(input.val().replace(/[^a-zA-Z0-9]/g, ''));
}

function validarContraseña(contraseña) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(contraseña);
}


function ResaltarInput2px(input) {
    input.css('border', '2px solid #1474c4')
}

function NoResaltarInput2px(input) {
    input.css('border', '2px solid #6d6d6d76')
}

function formatearNumero(input) {
    // Obtener el valor actual del input
    let valor = input.value;

    // Asegurarse de que solo se acepten números y el punto
    valor = valor.replace(/[^0-9.]/g, '');

    // Si hay más de un punto, eliminar los extras
    const partes = valor.split('.');
    if (partes.length > 2) {
        valor = partes[0] + '.' + partes.slice(1).join('');
    }

    // Limitar el número de decimales a dos
    if (partes.length === 2) {
        valor = partes[0] + '.' + partes[1].substring(0, 2);
    }

    // Asegurarse de que siempre haya 5 caracteres (2 antes del punto y 2 después)
    // Rellenamos los ceros a la izquierda o en los decimales si es necesario
    if (valor.length < 5) {
        if (valor.includes('.')) {
            let decimales = valor.split('.')[1];
            decimales = decimales.padEnd(2, '0'); // Añadir ceros a la derecha si no hay 2 decimales
            valor = valor.split('.')[0] + '.' + decimales;
        } else {
            valor = valor.padStart(5, '0'); // Añadir ceros a la izquierda hasta llegar a 5 caracteres
        }
    }

    // Actualizar el valor del input
    input.value = valor;
}

function InputDecimal(input) {
    input
        .off("focus")
        .on("focus", function () {
            const $this = $(this);
            if ($this.val().trim() === "") {
                $this.val("0.00");
            }
            posicionarCursorFinal(this);
        });

    input
        .off("input")
        .on("input", function () {
            const $this = $(this);
            let valor = $this.val().replace(/\D/g, ""); // Elimina todo excepto dígitos

            valor = valor.slice(-8);
            valor = valor.replace(/^0+(?=\d{3,})/, "");

            // Asegura al menos 3 dígitos para poder cortar los decimales
            while (valor.length < 3) {
                valor = "0" + valor;
            }

            const parteEntera = valor.slice(0, -2);
            const parteDecimal = valor.slice(-2);
            const formateado = parteEntera + "." + parteDecimal;

            $this.val(formateado);
            posicionarCursorFinal(this);
        });

    input
        .off("mousedown click")
        .on("mousedown click", function () {
            posicionarCursorFinal(this);
        });
}


function posicionarCursorFinal(input) {
    setTimeout(() => {
        if (input.setSelectionRange) {
            const len = input.value.length;
            input.setSelectionRange(len, len);
        }
    });
}

function soloNumerosYPunto(event) {
    var valor = event.target.value;
    // Expresión regular para permitir solo números y un solo punto decimal
    if (!/^\d*\.?\d*$/.test(valor)) {
        event.target.value = valor.slice(0, -1);  // Elimina el último carácter no válido
    }
}
