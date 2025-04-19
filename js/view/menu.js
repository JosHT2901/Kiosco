$("#BotonMenuPrincipal").click(function (e) {
    if ($("#ContenedorBotonesMenuPrincipal").is(":visible")) {
        $("#ContenedorBotonesMenuPrincipal").slideUp()
    } else {
        ajustarContenedor();
        $("#ContenedorBotonesMenuPrincipal").slideDown();
    }

})

$(window).resize(function (e) {
    ajustarContenedor();
})

function ajustarContenedor() {
    var anchuraTarjeta = 96;
    var margenTarjeta = 20;
    var anchoScrollbar = obtenerAnchuraScrollBar($('#ContenedorTarjetasMenu').parent());
    var paddingInterno = (16 * 2)+anchoScrollbar; // 16px a cada lado

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


