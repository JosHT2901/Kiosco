var contadorProductos = 0, arrayProductos=[]
$(document).ready(function (e) {
    AjustarAnchuraContenedoresListaCompra()

    $("#BotonAgregarProductoListaCompra").click(function (e) {
        AgregarFilaProducto()
    })

})

$(document).on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        console.log("2323")
        AgregarFilaProducto()
    }
});
$("#ContenedorFilasPreciosTablaListaCompra").on('scroll', function () {
    $('#ContenedorCabecerasTablaListaCompra').scrollLeft($(this).scrollLeft());
});

$("#ContenedorFilasPreciosTablaListaCompra").on('scroll', function () {
    $("#ContenedorFilasProductos").scrollTop($(this).scrollTop());
})

$("#ContenedorCabecerasTablaListaCompra").on('scroll', function () {
    $('#ContenedorFilasPreciosTablaListaCompra').scrollLeft($(this).scrollLeft());
});

$("#ContenedorFilasProductos").on('scroll', function () {
    $("#ContenedorFilasPreciosTablaListaCompra").scrollTop($(this).scrollTop());
})


$('#ContenedorFilasPreciosTablaListaCompra').on('wheel', function (event) {
    if (event.ctrlKey) {
        event.preventDefault();
        this.scrollLeft += event.originalEvent.deltaY;
    }
});

function AjustarAnchuraContenedoresListaCompra() {
    AjustarAnchuraCabecera()
    var $contenedorScroll = $("#ContenedorFilasPreciosTablaListaCompra");
    var scrollbarInferior = obtenerAnchuraScrollBarHorizontal($contenedorScroll);

    var $div = $("#ContenedorFilasProductos");

    $div.css({
        "padding-bottom": scrollbarInferior + "px",
        "height": 'calc(100% - ' + scrollbarInferior + 'px)'
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

function CalcularPrecioCaja($totalPagado, $cajasCompradas, $inputPrecioPorCaja) {
    const total = parseFloat($totalPagado.val());
    const cajas = parseFloat($cajasCompradas.val());

    if (isFinite(total) && isFinite(cajas) && total > 0 && cajas > 0) {
        const precio = total / cajas;
        $inputPrecioPorCaja.val(precio.toFixed(2));
    } else {
        $inputPrecioPorCaja.val('');
    }
}

function CalcularPrecioPieza($precioCaja, $piezasPorCaja, $inputPrecioPieza) {
    const caja = parseFloat($precioCaja.val());
    const piezas = parseFloat($piezasPorCaja.val());
    console.log(piezas)
    if (isFinite(caja) && isFinite(piezas) && caja > 0 && piezas > 0) {
        const precio = caja / piezas;
        $inputPrecioPieza.val(precio.toFixed(2));
    } else {
        $inputPrecioPieza.val('');
    }
}

function CalcularPrecioSugerido($precioPieza, $InputPrecioSugeridoPieza) {
    const pieza = parseFloat($precioPieza.val());

    if (isFinite(pieza) && pieza > 0) {
        const sugerido = pieza * 1.2;
        $InputPrecioSugeridoPieza.val(sugerido.toFixed(2));
    } else {
        $InputPrecioSugeridoPieza.val('');
    }
}

function AjustarAnchuraCabecera() {
    var $contenedor = $("#ContenedorFilasPreciosTablaListaCompra");
    var $cabecera = $("#ContenedorCabecerasTablaListaCompra");
    var anchoContenedor = $cabecera.parent().width();

    // Verificar si hay scroll vertical
    var tieneScrollVertical = $contenedor[0].scrollHeight > $contenedor[0].clientHeight;

    if (tieneScrollVertical) {
        var scrollbarWidth = obtenerAnchuraScrollBar($contenedor);
        var nuevoAncho = anchoContenedor - scrollbarWidth;

        // Asegurar que el ancho no sea negativo
        nuevoAncho = Math.max(nuevoAncho, 0);

        $cabecera.css("width", nuevoAncho + "px");
    } else {
        // Si no hay scroll, usar ancho completo
        $cabecera.css("width", anchoContenedor + "px");
    }
}


$(window).on('resize', function () {
    AjustarAnchuraCabecera()
});

function AgregarFilaPreciosListaCompra(contador) {
    return ` <div class="padding-5px-superior-inferior margin-10-px-auto borde-redondeado-5-px contenedor-fila">

                                        <div class="contenedor-botones-ancho-fijo"
                                            style="display: flex; ">

                                            <!-- Celda 1 -->
                                            <div class="botones-ancho-fijo altura-40-px anchura-150-px flex flex-center padding-5px-lateral"
                                                style="flex-shrink: 0;">
                                                <div style="width: 30px; height: 40px; display: flex; align-items: center; justify-content: center;">
                                                    <img src="../../icons/basic/pesos-sing.png" style="height: 30px;">
                                                </div>
                                                <div class="anchura-100-por-ciento-menos-30-px flex flex-center altura-100-por-ciento">
                                                    <input type="text" class="input text-align-right" name="InputListaCompra" data-id="${contador}" data-name="InputTotalPagadoListaCompra">
                                                </div>
                                            </div>

                                            <!-- Celda 2 -->
                                            <div class="botones-ancho-fijo altura-40-px anchura-150-px flex flex-center padding-5px-lateral borde-izquierdo-derecho bg-color-input"
                                                style="flex-shrink: 0;">
                                                <div style="width: 30px; height: 40px; display: flex; align-items: center; justify-content: center;">
                                                    <svg width="25" height="25" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13.409 2.512a3.75 3.75 0 0 0-2.818 0l-7.498 3.04A1.75 1.75 0 0 0 2 7.174v9.652a1.75 1.75 0 0 0 1.093 1.622l7.498 3.04a3.75 3.75 0 0 0 2.818 0l7.498-3.04A1.75 1.75 0 0 0 22 16.826V7.175a1.75 1.75 0 0 0-1.093-1.622l-7.498-3.04Zm-7.36 5.472a.75.75 0 0 1 .967-.435L12 9.439l4.984-1.89a.75.75 0 1 1 .532 1.402L12.75 10.76v5.491a.75.75 0 0 1-1.5 0v-5.49L6.484 8.95a.75.75 0 0 1-.435-.967Z" />
                                                    </svg>
                                                </div>
                                                <!-- Input -->
                                                <div class=" anchura-100-por-ciento-menos-30-px flex flex-center altura-100-por-ciento">
                                                    <input type="text" class="input text-align-right" name="InputListaCompra" data-id="${contador}" data-name="InputCajasCompradasListaCompra">
                                                </div>
                                            </div>

                                            <!-- Celda 3 -->
                                            <div class="botones-ancho-fijo altura-40-px anchura-150-px flex flex-center padding-5px-lateral"
                                                style="flex-shrink: 0;">
                                                <div style="width: 30px; height: 40px; display: flex; align-items: center; justify-content: center;">
                                                    <img src="../../icons/basic/pesos-sing.png" style="height: 30px;">
                                                </div>
                                                <div class="anchura-100-por-ciento-menos-30-px flex flex-center altura-100-por-ciento">
                                                    <input type="text" disabled class="input text-align-right" name="InputListaCompra" data-id="${contador}" data-name="InputPrecioCajaListaCompra">
                                                </div>
                                            </div>

                                            <!-- Celda 4 -->
                                            <div class="botones-ancho-fijo altura-40-px anchura-150-px flex flex-center padding-5px-lateral  borde-izquierdo-derecho bg-color-input"
                                                style="flex-shrink: 0;">
                                                <div style="width: 30px; height: 40px; display: flex; align-items: center; justify-content: center;">
                                                    <svg width="25" height="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="m18.492 2.33 3.179 3.179a2.25 2.25 0 0 1 0 3.182l-2.584 2.584A2.25 2.25 0 0 1 21 13.5v5.25A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.75V5.25A2.25 2.25 0 0 1 5.25 3h5.25a2.25 2.25 0 0 1 2.225 1.915L15.31 2.33a2.25 2.25 0 0 1 3.182 0ZM4.5 18.75c0 .414.336.75.75.75l5.999-.001.001-6.75H4.5v6Zm8.249.749h6.001a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-6.001v6.75Zm-2.249-15H5.25a.75.75 0 0 0-.75.75v6h6.75v-6a.75.75 0 0 0-.75-.75Zm2.25 4.81v1.94h1.94l-1.94-1.94Zm3.62-5.918-3.178 3.178a.75.75 0 0 0 0 1.061l3.179 3.179a.75.75 0 0 0 1.06 0l3.18-3.179a.75.75 0 0 0 0-1.06l-3.18-3.18a.75.75 0 0 0-1.06 0Z" />
                                                    </svg>
                                                </div>
                                                <!-- Input -->
                                                <div class=" anchura-100-por-ciento-menos-30-px flex flex-center altura-100-por-ciento">
                                                    <input type="text" class="input text-align-right" name="InputListaCompra" data-id="${contador}" data-name="InputPiezasPorCajaListaCompra">
                                                </div>
                                            </div>

                                            <!-- Celda 5 -->
                                            <div class="botones-ancho-fijo altura-40-px anchura-150-px flex flex-center padding-5px-lateral"
                                                style="flex-shrink: 0;">
                                                <div style="width: 30px; height: 40px; display: flex; align-items: center; justify-content: center;">
                                                    <img src="../../icons/basic/pesos-sing.png" style="height: 30px;">
                                                </div>
                                                <div class="anchura-100-por-ciento-menos-30-px flex flex-center altura-100-por-ciento">
                                                    <input type="text" disabled class="input text-align-right" name="InputListaCompra" data-id="${contador}" data-name="InputPrecioPiezaListaCompra">
                                                </div>
                                            </div>

                                            <!-- Celda 6 -->
                                            <div class="botones-ancho-fijo altura-40-px anchura-200-px flex flex-center padding-5px-lateral  borde-izquierdo-derecho bg-color-input"
                                                style="flex-shrink: 0;">
                                                <div style="width: 30px; height: 40px; display: flex; align-items: center; justify-content: center;">
                                                    <img src="../../icons/basic/pesos-sing.png" style="height: 30px;">
                                                </div>
                                                <div class="anchura-100-por-ciento-menos-30-px flex flex-center altura-100-por-ciento">
                                                    <input type="text" class="input text-align-right" name="InputListaCompra" data-id="${contador}" disabled data-name="InputPrecioSugeridoPiezaListaCompra">
                                                </div>
                                            </div>
                                            <!-- Celda 7-->
                                            <div class="botones-ancho-fijo altura-40-px anchura-100-px flex flex-center padding-5px-lateral"
                                                style="flex-shrink: 0;">
                                                <div class="flex flex-center altura-40-px">
                                                    <input type="checkbox" class="checkbox-round" name="InputCheckDivisibleListaCompra" data-id="${contador}" data-name="InputCheckDivisibleListaCompra">
                                                </div>
                                            </div>
                                            <!-- Celda 8-->
                                            <div class="botones-ancho-fijo altura-40-px anchura-150-px flex flex-center padding-5px-lateral  borde-izquierdo-derecho bg-color-input"
                                                style="flex-shrink: 0;">
                                                <div style="width: 30px; height: 40px; display: flex; align-items: center; justify-content: center;">
                                                    <svg width="25" height="25" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M20.25 11.993c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 0 1-1.75 1.75h-2.5a1.75 1.75 0 0 1-1.75-1.75v-2.5c0-.966.784-1.75 1.75-1.75h2.5Zm-14 0c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 0 1-1.75 1.75h-2.5A1.75 1.75 0 0 1 2 16.243v-2.5c0-.966.784-1.75 1.75-1.75h2.5Zm7 0c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 0 1-1.75 1.75h-2.5A1.75 1.75 0 0 1 9 16.243v-2.5c0-.966.784-1.75 1.75-1.75h2.5Zm7 1.5h-2.5a.25.25 0 0 0-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 0 0 .25-.25v-2.5a.25.25 0 0 0-.25-.25Zm-14 0h-2.5a.25.25 0 0 0-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 0 0 .25-.25v-2.5a.25.25 0 0 0-.25-.25Zm7 0h-2.5a.25.25 0 0 0-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 0 0 .25-.25v-2.5a.25.25 0 0 0-.25-.25Zm0-8.5c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 0 1-1.75 1.75h-2.5A1.75 1.75 0 0 1 9 9.243v-2.5c0-.966.784-1.75 1.75-1.75h2.5Zm7 0c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 0 1-1.75 1.75h-2.5A1.75 1.75 0 0 1 16 9.243v-2.5c0-.966.784-1.75 1.75-1.75h2.5Zm-14 0c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 0 1-1.75 1.75h-2.5A1.75 1.75 0 0 1 2 9.243v-2.5A1.75 1.75 0 0 1 3.606 5l.144-.006h2.5Zm7 1.5h-2.5a.25.25 0 0 0-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 0 0 .25-.25v-2.5a.25.25 0 0 0-.25-.25Zm7 0h-2.5a.25.25 0 0 0-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 0 0 .25-.25v-2.5a.25.25 0 0 0-.25-.25Zm-14 0h-2.5l-.057.007a.25.25 0 0 0-.193.243v2.5c0 .138.112.25.25.25h2.5a.25.25 0 0 0 .25-.25v-2.5a.25.25 0 0 0-.25-.25Z" />
                                                    </svg>
                                                </div>
                                                <!-- Input -->
                                                <div class=" anchura-100-por-ciento-menos-30-px flex flex-center altura-100-por-ciento">
                                                    <input type="text" class="input text-align-right" disabled name="InputListaCompra" data-id="${contador}" data-name="InputUnidadesPorPiezaListaCompra">
                                                </div>
                                            </div>
                                            <!-- Celda 9-->
                                            <div class="botones-ancho-fijo altura-40-px anchura-150-px flex flex-center padding-5px-lateral"
                                                style="flex-shrink: 0;">
                                                <div style="width: 30px; height: 40px; display: flex; align-items: center; justify-content: center;">
                                                    <img src="../../icons/basic/pesos-sing.png" style="height: 30px;">
                                                </div>
                                                <div class="anchura-100-por-ciento-menos-30-px flex flex-center altura-100-por-ciento">
                                                    <input type="text" class="input text-align-right" disabled name="InputListaCompra" data-id="${contador}" data-name="InputPrecioUnidadListaCompra">
                                                </div>
                                            </div>
                                            <!-- Celda 10-->
                                            <div class="botones-ancho-fijo altura-40-px anchura-200-px flex flex-center padding-5px-lateral  borde-izquierdo-derecho bg-color-input"
                                                style="flex-shrink: 0;">
                                                <div style="width: 30px; height: 40px; display: flex; align-items: center; justify-content: center;">
                                                    <img src="../../icons/basic/pesos-sing.png" style="height: 30px;">
                                                </div>
                                                <div class="anchura-100-por-ciento-menos-30-px flex flex-center altura-100-por-ciento">
                                                    <input type="text" class="input text-align-right" disabled name="InputListaCompra" data-id="${contador}" data-name="InputPrecioSugeridoUnidadListaCompra">
                                                </div>
                                            </div>
                                            <!-- Podés seguir agregando más con el mismo patrón -->

                                        </div>
                                    </div>`
}

function AgregarFilaProductoListaCompra(contador) {
    return `<div class=" anchura-100-por-ciento-con-borde-1px margin-10-px-auto borde-redondeado-5-px padding-5px-superior-inferior" style="border: 1px solid #e6e6e6;">
                                            <div class="anchura-100-por-ciento altura-40-px flex flex-center">
                                                <div class=" altura-100-por-ciento anchura-30-px flex flex-center">
                                                    <input type="checkbox" class="checkbox-round" id="CheckBoxViewPassword" />
                                                </div>
                                                <div class=" altura-100-por-ciento padding-5px-lateral" style="width: calc(100% - 30px - 10px);">
                                                    <input type="text" class="input" data-id="${contador}">
                                                </div>
                                            </div>
                                        </div>`
}

function AgregarFilaProducto() {
    if (contadorProductos == 0) {
        $("#ContenedorCabecerasTablaListaCompra").css('display', 'flex')
        $("#ContenedorFilasPreciosTablaListaCompra").empty()
    }

    $("#ContenedorFilasProductos").append(AgregarFilaProductoListaCompra(contadorProductos))
    $("#ContenedorFilasPreciosTablaListaCompra").append(AgregarFilaPreciosListaCompra(contadorProductos))
    AjustarAnchuraContenedoresListaCompra()
    contadorProductos++
    EventosInputsListaCompra()
}

function EventosInputsListaCompra() {
    $("input[name='InputListaCompra']")
        .off("focus")
        .on("focus", function () {
            const $this = $(this);
            if ($this.val().trim() === "") {
                $this.val("0.00");
            }
            posicionarCursorFinal(this);
        });

    $("input[name='InputListaCompra']")
        .off("keydown")
        .on("keydown", function (e) {
            const tecla = e.key;
            const $this = $(this);
            let valor = $this.val().replace(".", "");

            if (!/^[0-9]$/.test(tecla) && tecla !== "Backspace" && tecla !== "Delete") {
                return;
            }

            e.preventDefault(); // evita duplicación

            if (tecla === "Backspace" || tecla === "Delete") {
                valor = valor.slice(0, -1);
            } else if (/^[0-9]$/.test(tecla)) {
                if (valor.length >= 12) return;
                valor += tecla;
            }

            // Remover ceros iniciales que no afecten los centavos
            valor = valor.replace(/^0+(?=\d{3,})/, "");

            while (valor.length < 3) {
                valor = "0" + valor;
            }

            const parteEntera = valor.slice(0, -2);
            const parteDecimal = valor.slice(-2);
            const formateado = parteEntera + "." + parteDecimal;

            $this.val(formateado);
            posicionarCursorFinal(this);
        });

    $("input[name='InputListaCompra']")
        .off("mousedown click")
        .on("mousedown click", function () {
            posicionarCursorFinal(this);
        });


    $('[data-name="InputTotalPagadoListaCompra"], [data-name="InputCajasCompradasListaCompra"]').on('keyup', function () {
        var id = $(this).data('id');
        var selector = '[data-id="' + id + '"]';

        var $totalPagado = $('[data-name="InputTotalPagadoListaCompra"]' + selector);
        var $cajasCompradas = $('[data-name="InputCajasCompradasListaCompra"]' + selector);
        var $precioCaja = $('[data-name="InputPrecioCajaListaCompra"]' + selector);

        CalcularPrecioCaja($totalPagado, $cajasCompradas, $precioCaja);
    });

    // Calcular precio por pieza y sugerido
    $('[data-name="InputPrecioCajaListaCompra"], [data-name="InputPiezasPorCajaListaCompra"]').on('keyup', function () {
        var id = $(this).data('id');
        var selector = '[data-id="' + id + '"]';

        var $precioCaja = $('[data-name="InputPrecioCajaListaCompra"]' + selector);
        var $piezasPorCaja = $('[data-name="InputPiezasPorCajaListaCompra"]' + selector);
        var $precioPieza = $('[data-name="InputPrecioPiezaListaCompra"]' + selector);
        var $precioSugerido = $('[data-name="InputPrecioSugeridoPiezaListaCompra"]' + selector);

        CalcularPrecioPieza($precioCaja, $piezasPorCaja, $precioPieza);
        CalcularPrecioSugerido($precioPieza, $precioSugerido);
    });

    $('[data-name="InputCheckDivisibleListaCompra"]').off('change').on('change', function (e) {
        var id = $(this).data('id');
        console.log(id)
        var selector = '[data-id="' + id + '"]';
        var $inputUnidadesPieza = $('[data-name="InputUnidadesPorPiezaListaCompra"]' + selector);
        var $inputPrecioUnidad = $('[data-name="InputPrecioUnidadListaCompra"]' + selector)
        var $inputPrecioSugeridoUnidad = $('[data-name="InputPrecioSugeridoUnidadListaCompra"]' + selector)
        if ($(this).is(':checked')) {
            $inputUnidadesPieza.prop('disabled', false);
        } else {
            $inputUnidadesPieza.prop('disabled', true).val('');
            $inputPrecioUnidad.val('')
            $inputPrecioSugeridoUnidad.val('')
        }
    });

    $('[data-name="InputUnidadesPorPiezaListaCompra"]').on('keyup', function () {
        var id = $(this).data('id');
        var selector = '[data-id="' + id + '"]';
        var $precioPieza = $('[data-name="InputPrecioPiezaListaCompra"]' + selector);
        var $unidadesPorPieza = $('[data-name="InputUnidadesPorPiezaListaCompra"]' + selector);
        var $precioUnidad = $('[data-name="InputPrecioUnidadListaCompra"]' + selector);
        var $precioSugeridoUnidad = $('[data-name="InputPrecioSugeridoUnidadListaCompra"]' + selector);

        CalcularPrecioPieza($precioPieza, $unidadesPorPieza, $precioUnidad);
        CalcularPrecioSugerido($precioUnidad, $precioSugeridoUnidad);
    })

}