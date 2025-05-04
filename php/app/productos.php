<?php
session_start();
require_once "../include/pagina-protegida.php";
// Verificar si la sesión NO está activa o NO definida
if (empty($_SESSION) || !isset($_SESSION['Activo']) || $_SESSION['Activo'] !== true) {
    // Redirige al login si no hay sesión válida
    /*header("Location: login.php");
    exit;*/
}
?>
<!DOCTYPE html>
<html class="font-family-Montserrat contenedor color-letra-2" style="min-width: 800px;">

<head>
    <?php
    include_once "../include/head.php";
    include_once "../include/pagina-protegida.php"
    ?>
    <link rel="stylesheet" href="../../css/view/menu.css">
    <link rel="stylesheet" href="../../css/view/lista-compra.css">
    <script src="../../js/include/opciones-menu.js"></script>
</head>

<body>
    <?php
    include_once "../include/menu.php";
    ?>
    <div class=" anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral altura-100-por-ciento-menos-60-px min-height-500px overflow-auto bg-color-white" >
        <div class="anchura-100-por-ciento margin-10-px-auto overflow-auto contenedor" id="ContenedorBotonesPaginaProductos">
            <div class="contenedor-botones-ancho-fijo">

                <a class="tarjeta-botones-opciones tarjeta-hover boton botones-ancho-fijo " id="BotonAgregarNuevoProducto">
                    <div class="anchura-100-por-ciento altura-60-px flex flex-center">
                        <img src="../../icons/basic/mas.png" class="anchura-40-px">
                    </div>
                    <div class="anchura-100-por-ciento altura-30-px flex flex-center font-08-rem" style="font-weight: 600;">
                        <span>Agregar</span>
                    </div>
                </a>
                <a class="tarjeta-botones-opciones tarjeta-hover boton botones-ancho-fijo" href="departamentos.php">
                    <div class="anchura-100-por-ciento altura-60-px flex flex-center">
                        <img src="../../icons/basic/capas.png" class="anchura-40-px">
                    </div>
                    <div class="anchura-100-por-ciento altura-30-px flex flex-center font-08-rem" style="font-weight: 600;">
                        <span>Departamentos</span>
                    </div>
                </a>
                <a class="tarjeta-botones-opciones tarjeta-hover boton botones-ancho-fijo ">
                    <div class="anchura-100-por-ciento altura-60-px flex flex-center">
                        <img src="../../icons/basic/caja.png" class="anchura-40-px">
                    </div>
                    <div class="anchura-100-por-ciento altura-30-px flex flex-center font-08-rem" style="font-weight: 600;">
                        <span>Piezas</span>
                    </div>
                </a>
                <a class="tarjeta-botones-opciones tarjeta-hover boton botones-ancho-fijo" href="unidades-de-medida.php">
                    <div class="anchura-100-por-ciento altura-60-px flex flex-center">
                        <img src="../../icons/windows/medida.png" class="anchura-40-px">
                    </div>
                    <div class="anchura-100-por-ciento altura-30-px flex flex-center font-08-rem" style="font-weight: 600;">
                        <span>Unidades</span>
                    </div>
                </a>
                <a class="tarjeta-botones-opciones tarjeta-hover boton botones-ancho-fijo" href="departamentos.php">
                    <div class="anchura-100-por-ciento altura-60-px flex flex-center">
                        <img src="../../icons/windows/moneda.png" class="anchura-40-px">
                    </div>
                    <div class="anchura-100-por-ciento altura-30-px flex flex-center font-08-rem" style="font-weight: 600;">
                        <span>Precios</span>
                    </div>
                </a>
                <a class="tarjeta-botones-opciones tarjeta-hover boton botones-ancho-fijo ">
                    <div class="anchura-100-por-ciento altura-60-px flex flex-center">
                        <img src="../../icons/windows/compartir.png" class="anchura-40-px">
                    </div>
                    <div class="anchura-100-por-ciento altura-30-px flex flex-center font-08-rem" style="font-weight: 600;">
                        <span>Exportar lista</span>
                    </div>
                </a>
                <a class="tarjeta-botones-opciones tarjeta-hover boton botones-ancho-fijo ">
                    <div class="anchura-100-por-ciento altura-60-px flex flex-center">
                        <img src="../../icons/windows/importar.png" class="anchura-40-px">
                    </div>
                    <div class="anchura-100-por-ciento altura-30-px flex flex-center font-08-rem" style="font-weight: 600;">
                        <span>Importar lista</span>
                    </div>
                </a>
                <a class="tarjeta-botones-opciones tarjeta-hover boton botones-ancho-fijo ">
                    <div class="anchura-100-por-ciento altura-60-px flex flex-center">
                        <img src="../../icons/windows/cubo.png" class="anchura-40-px">
                    </div>
                    <div class="anchura-100-por-ciento altura-30-px flex flex-center font-08-rem" style="font-weight: 600;">
                        <span>Productos únicos</span>
                    </div>
                </a>
                <a class="tarjeta-botones-opciones tarjeta-hover boton botones-ancho-fijo ">
                    <div class="anchura-100-por-ciento altura-60-px flex flex-center">
                        <img src="../../icons/windows/estrella.png" class="anchura-40-px">
                    </div>
                    <div class="anchura-100-por-ciento altura-30-px flex flex-center font-08-rem" style="font-weight: 600;">
                        <span>Promociones</span>
                    </div>
                </a>
            </div>
        </div>
        <div class="anchura-100-por-ciento overflow-auto position-relative" id="ContenedorTablaPaginaProductos"></div>
    </div>
</body>
<?php
include_once "../include/footer.php"
?>

<script src="../../js/view/productos.js"></script>

</html>