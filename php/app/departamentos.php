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
<html class="font-family-Montserrat contenedor color-letra-2" style="min-width: 700px;">

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
    <div class="anchura-100-por-ciento altura-100-por-ciento-menos-60-px min-height-500px overflow-auto bg-color-white">
        <div class="anchura-100-por-ciento altura-40-px margin-10-px-auto">
            <div class="altura-100-por-ciento anchura-100-por-ciento-menos-20-px padding-10px-lateral flex flex-left ">
                <div class="anchura-100-por-ciento altura-100-por-ciento flex flex-center borde-redondeado-10-px color1474c4" >
                    <div class="anchura-200-px altura-100-por-ciento flex flex-left">
                        <a class="boton altura-30-px padding-10px-lateral boton-secundario border-1-px-6d6d6d76 flex flex-center min-width-110px position-relative borde-redondeado-5-px margin-0px-5px" href="productos.php">
                            <div class="anchura-35-px altura-100-por-ciento flex flex-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.295 19.716a1 1 0 0 0 1.404-1.425l-5.37-5.29h13.67a1 1 0 1 0 0-2H6.336L11.7 5.714a1 1 0 0 0-1.404-1.424l-6.924 6.822a1.25 1.25 0 0 0 0 1.78l6.924 6.823Z" />
                                </svg>
                            </div>
                            <div class="altura-100-por-ciento padding-5px-lateral flex flex-center" style="width: calc(100% - 35px - 10px);">
                                <span>Productos</span>
                            </div>
                        </a>
                    </div>
                    <div class="altura-100-por-ciento padding-10px-lateral flex flex-left bg-color-input borde-redondeado-5-px" style="width: calc(100% - 150px - 20px);font-weight: 600;">
                        <span>Departamentos</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="anchura-100-por-ciento altura-100-por-ciento-menos-60-px flex flex-center">
            <div class="altura-100-por-ciento anchura-100-por-ciento-menos-20-px padding-10px-lateral flex flex-center">
                <div class="anchura-300-px altura-100-por-ciento" id="ContenedorContenidoDepartamentos"></div>
                <div class="altura-100-por-ciento padding-5px-lateral" style="width:calc(100% - 300px - 10px)">
                    <div class=" anchura-100-por-ciento-menos-20-px padding-10px-lateral altura-40-px margin-10-px-auto flex flex-right">
                        <a class="boton altura-35-px padding-10px-lateral boton-importante bg-color-boton-secundario flex flex-center min-width-110px position-relative borde-redondeado-5-px margin-0px-5px" id="BotonAgregarNuevoDepartamento">
                            <span>Agregar</span>
                        </a>
                    </div>
                    <div class="anchura-100-por-ciento altura-100-por-ciento-menos-60-px overflow-auto" id="ContenedorInformacionDepartamento">

                    </div>
                </div>
            </div>

        </div>
    </div>
</body>
<?php
include_once "../include/footer.php"
?>
<script src="../../js/view/departamentos.js"></script>

</html>