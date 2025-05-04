<?php 
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (!(isset($_SESSION['Activo']) && $_SESSION['Activo'] === true)) {
    $protocolo = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'];
    $ruta = $_SERVER['REQUEST_URI'];

    $url_actual = $protocolo . '://' . $host . $ruta;

    // Redirige al usuario a la página de inicio de sesión y pasa la URL actual como parámetro de retorno
    header('Location: login.php?return=' . urlencode($url_actual));
    exit; // Detiene la ejecución del script para evitar que se siga ejecutando
}