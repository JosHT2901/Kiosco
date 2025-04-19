<?php
session_start();
// Verificar si la sesión NO está activa o NO definida
if (empty($_SESSION)) {
    // Redirige al login si no hay sesión válida
    header("Location: login.php");
    exit;
}
else if($_SESSION['Activo']==true)
{
    header("Location: inicio.php");
    exit;
}
?>
<!DOCTYPE html>
<html class="font-family-Montserrat contenedor color-letra-2">

<head>
    <?php
    include_once "../include/head.php";
    ?>
    <link rel="stylesheet" href="../../css/view/login.css">
</head>

<body>
    <div class="anchura-100-por-ciento altura-100-vh flex-center flex min-height-500px">
        <div class="altura-100-por-ciento anchura-400-px flex flex-center tarjeta-ajustable-450-100">
            <div class="anchura-100-por-ciento padding-20px borde-redondeado-5-px box-shadow-1 bg-color-white tj-login position-relative" id="ContenedorLogin">
                <div class="overflow-auto">
                    <div class="anchura-100-por-ciento altura-50-px flex flex-center margin-15-px-auto">
                        <div class="flex flex-left altura-100-por-ciento">
                            <img src="../../images/logotipo/logotipo-gris-2023-v1.jpg" class="altura-80-por-ciento">
                        </div>
                    </div>
                    <div class="anchura-100-por-ciento-con-padding-5px-lateral font-11-rem font-family-Montserrat-Semi-Bold padding-5px-lateral altura-30-px flex flex-center margin-10-px-auto">
                        <span>¿En que sucursal te encuentras?</span>
                    </div>
                    <form class="overflow-auto margin-10-px-auto" id="FormularioSeleccionarSucursal">
                       
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>
<?php
include_once "../include/footer.php"
?>
<script src="../../js/view/seleccionar-sucursal.js"></script>

</html>