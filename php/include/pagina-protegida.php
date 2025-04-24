<?php 

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (empty($_SESSION)) {
    $redirect_url = urlencode($_SERVER['REQUEST_URI']);
    header("Location: login.php?return=$redirect_url");
    exit;
}