<?php

function Generar_Codigo()
{
    return str_pad(mt_rand(0, 999999), 6, '0', STR_PAD_LEFT);
}

function DestruirSesiones()
{
    session_start();

    // Destruye todos los datos de sesión previos
    session_unset();      // Limpia las variables de sesión
    session_destroy();
}

function FormatearFechaCompleta($fecha) {
    // Asegura zona horaria
    date_default_timezone_set('America/Mexico_City');

    // Convierte a timestamp
    $timestamp = strtotime($fecha);

    // Formatter en español
    $formatter = new IntlDateFormatter(
        'es_ES',
        IntlDateFormatter::FULL,
        IntlDateFormatter::MEDIUM,
        'America/Mexico_City',
        IntlDateFormatter::GREGORIAN,
        "EEEE d 'de' MMMM 'de' yyyy HH:mm:ss"
    );

    return $formatter->format($timestamp);
}

function generarCodigoBarras($longitud = 12) {
    $caracteres = '0123456789';  // Solo números
    $codigoBarras = '';
    
    for ($i = 0; $i < $longitud; $i++) {
        $codigoBarras .= $caracteres[rand(0, strlen($caracteres) - 1)];
    }
    
    return $codigoBarras;
}