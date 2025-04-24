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
<html class="font-family-Montserrat contenedor color-letra-2">

<head>
    <?php
    include_once "../include/head.php";
    ?>
    <link rel="stylesheet" href="../../css/view/menu.css">
    <link rel="stylesheet" href="../../css/view/lista-compra.css">
</head>

<body>
    <?php
    include_once "../include/menu.php";
    ?>
    <div class=" anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral altura-100-por-ciento-menos-60-px min-height-500px overflow-auto bg-color-white">
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
        <div class="anchura-100-por-ciento overflow-auto" id="ContenedorTablaPaginaProductos">
            <div class="anchura-100-por-ciento altura-50-px margin-5-px-auto borde-redondeado-5-px bg-color-input flex flex-center">
                <div class="altura-100-por-ciento anchura-200-px flex flex-center">
                    <a class="boton boton-solo-icono anchura-40-px altura-40-px tarjeta-hover borde-redondeado-50-px flex flex-center margin-0px-5px">
                        <svg width="25" height="25" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 16h4a1 1 0 0 1 .117 1.993L14 18h-4a1 1 0 0 1-.117-1.993L10 16h4-4Zm-2-5h8a1 1 0 0 1 .117 1.993L16 13H8a1 1 0 0 1-.117-1.993L8 11h8-8ZM5 6h14a1 1 0 0 1 .117 1.993L19 8H5a1 1 0 0 1-.117-1.993L5 6h14H5Z" />
                        </svg>
                    </a>
                    <a class="boton altura-35-px padding-10px-lateral boton-secundario bg-color-boton-secundario flex flex-center font-08-rem min-width-110px position-relative borde-redondeado-5-px margin-0px-5px" id="BotonAgregarProductoListaCompra">
                        <span>Acciones</span>
                    </a>

                </div>
                <div class="altura-100-por-ciento" style="width: calc(100% - 200px);">
                    <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral flex flex-right">
                        <div class="altura-40-px padding-10px-lateral box-shadow-1 borde-redondeado-10-px font-09-rem flex flex-center" style="min-width: 80%;">
                            <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 2.5a7.5 7.5 0 0 1 5.964 12.048l4.743 4.745a1 1 0 0 1-1.32 1.497l-.094-.083-4.745-4.743A7.5 7.5 0 1 1 10 2.5Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" />
                                </svg>
                            </div>
                            <div class="altura-100-por-ciento anchura-100-por-ciento-menos-80-px flex flex-center">
                                <div class="anchura-100-por-ciento altura-35-px flex flex-center">
                                    <input type="text" class="input" placeholder="Buscar productos...">
                                </div>
                            </div>
                            <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                                <a class="boton boton-solo-icono anchura-35-px altura-35-px tarjeta-hover borde-redondeado-5-px flex flex-center margin-0px-5px">
                                    <svg width="25" height="25" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 16h4a1 1 0 0 1 .117 1.993L14 18h-4a1 1 0 0 1-.117-1.993L10 16h4-4Zm-2-5h8a1 1 0 0 1 .117 1.993L16 13H8a1 1 0 0 1-.117-1.993L8 11h8-8ZM5 6h14a1 1 0 0 1 .117 1.993L19 8H5a1 1 0 0 1-.117-1.993L5 6h14H5Z"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="anchura-100-por-ciento" style="height: calc(100% - 50px - 10px);">
                <div class="anchura-100-por-ciento altura-100-por-ciento">
                    <div class="anchura-100-por-ciento altura-60-px flex flex-center font-09-rem">
                        <div class=" altura-100-por-ciento anchura-300-px">
                            <div class="botones-ancho-fijo altura-60-px flex flex-center padding-5px-lateral bg-color-input borde-redondeado-5-px-izquierdo" style="width: calc(100% - 10px);">
                                <div class="anchura-40-px altura-40-px flex flex-center">
                                    <input type="checkbox" class="checkbox-round" id="CheckBoxViewPassword">
                                </div>
                                <div class="altura-100-por-ciento anchura-100-por-ciento-menos-40-px flex flex-center">
                                    <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral flex flex-left padding-5px-lateral">
                                        <span>Descripción</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="altura-100-por-ciento" style="width: calc(100% - 450px);">
                            <div class="contenedor-botones-ancho-fijo scroll-invisible anchura-100-por-ciento" id="ContenedorCabecerasTablaListaCompra" style="display: flex;">
                                <div class="botones-ancho-fijo altura-60-px anchura-250-px flex flex-center padding-5px-lateral ">
                                    <span>Departamento</span>
                                </div>
                                <div class="botones-ancho-fijo altura-60-px anchura-200-px flex flex-center padding-5px-lateral bg-color-input">
                                    <span>Costo</span>
                                </div>
                                <div class="botones-ancho-fijo altura-60-px anchura-200-px flex flex-center borde-redondeado-5-px-superior padding-5px-lateral ">
                                    <span>Precio menudeo</span>
                                </div>
                                <div class="botones-ancho-fijo altura-60-px anchura-200-px flex flex-center padding-5px-lateral bg-color-input">
                                    <span>Precio medio mayoreo</span>
                                </div>
                                <div class="botones-ancho-fijo altura-60-px anchura-200-px flex flex-center borde-redondeado-5-px-superior padding-5px-lateral">
                                    <span>Precio mayoreo</span>
                                </div>
                                <div class="botones-ancho-fijo altura-60-px anchura-200-px flex flex-center padding-5px-lateral bg-color-input">
                                    <span>Unidad de venta</span>
                                </div>
                                <div class="botones-ancho-fijo altura-60-px anchura-150-px flex flex-center borde-redondeado-5-px-superior padding-5px-lateral ">
                                    <span>Tipo de venta</span>
                                </div>
                                <div class="botones-ancho-fijo altura-60-px anchura-100-px flex flex-center borde-redondeado-5-px-superior padding-5px-lateral ">
                                    <span>I.V.A.</span>
                                </div>
                                <div class="botones-ancho-fijo altura-60-px anchura-100-px flex flex-center padding-5px-lateral bg-color-input">
                                    <span>I.E.P.S.</span>
                                </div>
                            </div>
                        </div>

                        <div class="anchura-150-px altura-100-por-ciento botones-ancho-fijo">
                            <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral">
                                <div class="anchura-100-por-ciento altura-30-px flex flex-center">
                                    <span>Existencias</span>
                                </div>
                                <div class="anchura-100-por-ciento altura-30-px">
                                    <select class="input" id=""></select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="anchura-100-por-ciento flex flex-center" style="height: calc(100% - 65px);">
                        <div class="altura-100-por-ciento padding-5px-lateral" style="width: calc(300px - 10px);">
                            <div class="anchura-100-por-ciento altura-100-por-ciento overflow-auto scroll-invisible">
                                <div class="anchura-100-por-ciento overflow-auto ">
                                    <?php
                                    for ($i = 0; $i < 20; $i++) {
                                    ?>
                                        <div class=" anchura-100-por-ciento-con-borde-1px border-1-px-6d6d6d76 altura-50-px margin-5-px-auto flex flex-center borde-redondeado-5-px-izquierdo">
                                            <div class="anchura-40-px altura-40-px flex flex-center">
                                                <input type="checkbox" class="checkbox-round" id="CheckBoxViewPassword">
                                            </div>
                                            <div class="altura-100-por-ciento anchura-100-por-ciento-menos-40-px flex flex-center">
                                                <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral flex flex-left padding-5px-lateral">
                                                    <span class="texto-truncado ">Charola jaguar 06dssdsdsdsdsdsdsdsdsd6</span>
                                                </div>
                                            </div>
                                        </div>
                                    <?php
                                    }
                                    ?>
                                </div>
                            </div>
                        </div>
                        <div class="altura-100-por-ciento padding-5px-lateral" style="width: calc(100% - 300px - 150px - 10px);">
                            <div class="anchura-100-por-ciento altura-100-por-ciento overflow-auto">
                                <div class="anchura-100-por-ciento">
                                    <?php
                                    for ($i = 0; $i < 20; $i++) {
                                    ?>
                                        <div class=" padding-5px-superior-inferior margin-5-px-auto flex flex-center contenedor-fila">
                                            <div class="contenedor-botones-ancho-fijo">
                                                <div class="botones-ancho-fijo altura-40-px anchura-250-px flex flex-center padding-5px-lateral ">
                                                    <span>Departamento</span>
                                                </div>
                                                <div class="botones-ancho-fijo altura-40-px anchura-200-px flex flex-center padding-5px-lateral bg-color-input">
                                                    <span>Costo</span>
                                                </div>
                                                <div class="botones-ancho-fijo altura-40-px anchura-200-px flex flex-center borde-redondeado-5-px-superior padding-5px-lateral ">
                                                    <span>Precio menudeo</span>
                                                </div>
                                                <div class="botones-ancho-fijo altura-40-px anchura-200-px flex flex-center padding-5px-lateral bg-color-input">
                                                    <span>Precio medio mayoreo</span>
                                                </div>
                                                <div class="botones-ancho-fijo altura-40-px anchura-200-px flex flex-center borde-redondeado-5-px-superior padding-5px-lateral">
                                                    <span>Precio mayoreo</span>
                                                </div>
                                                <div class="botones-ancho-fijo altura-40-px anchura-200-px flex flex-center padding-5px-lateral bg-color-input">
                                                    <span>Unidad de venta</span>
                                                </div>
                                                <div class="botones-ancho-fijo altura-40-px anchura-150-px flex flex-center borde-redondeado-5-px-superior padding-5px-lateral ">
                                                    <span>Tipo de venta</span>
                                                </div>
                                                <div class="botones-ancho-fijo altura-40-px anchura-100-px flex flex-center borde-redondeado-5-px-superior padding-5px-lateral ">
                                                    <span>I.V.A.</span>
                                                </div>
                                                <div class="botones-ancho-fijo altura-40-px anchura-100-px flex flex-center padding-5px-lateral bg-color-input">
                                                    <span>I.E.P.S.</span>
                                                </div>
                                            </div>
                                        </div>
                                    <?php
                                    }
                                    ?>
                                </div>
                            </div>
                        </div>
                        <div class="anchura-150-px altura-100-por-ciento">
                            <div class="anchura-100-por-ciento altura-100-por-ciento">
                                <div class="anchura-100-por-ciento-con-borde-1px border-1-px-6d6d6d76 padding-5px-superior-inferior margin-5-px-auto flex flex-center borde-redondeado-5-px-izquierdo">
                                    <div class=" altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral flex flex-center altura-40-px">
                                        <div class="anchura-50-por-ciento altura-100-por-ciento">
                                            <div class="anchura-100-por-ciento altura-20-px flex flex-center" style="font-size: 0.65rem; font-weight:600">
                                                <span>Esta sucursal</span>
                                            </div>
                                            <div class="anchura-anchura-50-por-ciento flex flex-center" style="height: calc(100% - 20px);">
                                                <span>10</span>
                                            </div>
                                        </div>
                                        <div class="anchura-50-por-ciento altura-100-por-ciento">
                                        <div class="anchura-100-por-ciento altura-20-px flex flex-center" style="font-size: 0.65rem; font-weight:600">
                                                <span>Total</span>
                                            </div>
                                            <div class="anchura-anchura-50-por-ciento flex flex-center" style="height: calc(100% - 20px);">
                                                <span>10</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
<?php
include_once "../include/footer.php"
?>
<script src="../../js/view/productos.js"></script>
</html>