<?php
session_start();
// Verificar si la sesión NO está activa o NO definida
if (empty($_SESSION) || !isset($_SESSION['Activo']) || $_SESSION['Activo'] !== true) {
    // Redirige al login si no hay sesión válida
    header("Location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<html class="font-family-Montserrat contenedor color-letra-2">

<head>
    <?php
    include_once "../include/head.php";
    ?>
        <link rel="stylesheet" href="../../css/view/menu.css">
</head>

<body>
    <?php
    include_once "../include/menu.php";
    ?>
</body>
<?php
include_once "../include/footer.php"
?>
</html>