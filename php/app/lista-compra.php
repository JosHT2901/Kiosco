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
    <div class="anchura-100-por-ciento altura-100-por-ciento-menos-60-px min-height-500px overflow-auto bg-color-white">
        <div class=" anchura-100-por-ciento-menos-20-px altura-40-px margin-10-px-auto flex flex-center padding-10px-lateral">
            <div class=" anchura-60-px altura-100-por-ciento flex flex-left borde-redondeado-5-px" style="background-color: #d6d6d6;">
                <div class="altura-100-por-ciento padding-10px-lateral flex flex-left">
                    <a class="boton boton-solo-icono anchura-30-px altura-30-px tarjeta-hover borde-redondeado-50-px flex flex-center margin-0px-5px">
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 1.75a3.25 3.25 0 0 1 3.245 3.066L15.25 5h5.25a.75.75 0 0 1 .102 1.493L20.5 6.5h-.796l-1.28 13.02a2.75 2.75 0 0 1-2.561 2.474l-.176.006H8.313a2.75 2.75 0 0 1-2.714-2.307l-.023-.174L4.295 6.5H3.5a.75.75 0 0 1-.743-.648L2.75 5.75a.75.75 0 0 1 .648-.743L3.5 5h5.25A3.25 3.25 0 0 1 12 1.75Zm6.197 4.75H5.802l1.267 12.872a1.25 1.25 0 0 0 1.117 1.122l.127.006h7.374c.6 0 1.109-.425 1.225-1.002l.02-.126L18.196 6.5ZM13.75 9.25a.75.75 0 0 1 .743.648L14.5 10v7a.75.75 0 0 1-1.493.102L13 17v-7a.75.75 0 0 1 .75-.75Zm-3.5 0a.75.75 0 0 1 .743.648L11 10v7a.75.75 0 0 1-1.493.102L9.5 17v-7a.75.75 0 0 1 .75-.75Zm1.75-6a1.75 1.75 0 0 0-1.744 1.606L10.25 5h3.5A1.75 1.75 0 0 0 12 3.25Z" />
                        </svg>
                    </a>
                </div>
            </div>
            <div class=" anchura-100-por-ciento-menos-60-px altura-100-por-ciento flex flex-right">
                <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem min-width-110px position-relative borde-redondeado-5-px margin-0px-5px">
                    <span>Nuevo producto</span>
                </a>
                <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem min-width-110px position-relative borde-redondeado-5-px margin-0px-5px">
                    <span>Guardar</span>
                </a>
            </div>
        </div>
        <div class="anchura-100-por-ciento-menos-20-px altura-100-por-ciento-menos-60-px overflow-auto padding-10px-lateral">
            <div class="anchura-100-por-ciento altura-100-por-ciento-menos-20-px padding-10px-superior-inferior overflow-auto" style="min-width:600px">
                <div class="tabla-contenedor altura-100-por-ciento">
                    <div class="anchura-100-por-ciento altura-100-por-ciento">
                        <div class="anchura-100-por-ciento altura-40-px flex flex-center font-09-rem">
                            <div class="altura-100-por-ciento flex flex-center borde-redondeado-5-px-superior" style="width: 300px;background-color: #e6e6e6;">
                                <div class="anchura-40-px altura-40-px flex flex-center">
                                    <input type="checkbox" class="checkbox-round" id="CheckBoxViewPassword">
                                </div>
                                <div class="altura-100-por-ciento flex flex-left" style="width: calc(100%  - 40px);">
                                    <div class="altura-100-por-ciento" style="width: calc(100% - 150px);">
                                        <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral flex flex-left" style="font-weight: 600;">
                                            <span>Productos</span>
                                        </div>
                                    </div>

                                    <div class="altura-100-por-ciento anchura-150-px flex flex-center">
                                        <a class="boton altura-30-px padding-10px-lateral boton-importante flex flex-center font-08-rem min-width-110px position-relative borde-redondeado-5-px margin-0px-5px" id="BotonAgregarProductoListaCompra">
                                            <span>Añadir (enter)</span>
                                        </a>
                                    </div>
                                </div>

                            </div>
                            <div class="altura-100-por-ciento flex flex-left padding-5px-lateral scroll-invisible" style="width: calc(100% - 300px - 10px);">
                                <div class="contenedor-botones-ancho-fijo scroll-invisible anchura-100-por-ciento" id="ContenedorCabecerasTablaListaCompra" style="display: none;">
                                    <div class="botones-ancho-fijo altura-40-px anchura-150-px flex flex-center padding-5px-lateral">
                                        <span>Total pagado</span>
                                    </div>
                                    <div class="botones-ancho-fijo altura-40-px anchura-150-px flex flex-center borde-redondeado-5-px-superior padding-5px-lateral  borde-izquierdo-derecho bg-color-input">
                                        <span>Cajas compradas</span>
                                    </div>
                                    <div class="botones-ancho-fijo altura-40-px anchura-150-px flex flex-center padding-5px-lateral">
                                        <span>Precio por caja</span>
                                    </div>
                                    <div class="botones-ancho-fijo altura-40-px anchura-150-px flex flex-center borde-redondeado-5-px-superior padding-5px-lateral  borde-izquierdo-derecho bg-color-input">
                                        <span>Piezas por caja</span>
                                    </div>
                                    <div class="botones-ancho-fijo altura-40-px anchura-150-px flex flex-center padding-5px-lateral">
                                        <span>Precio por pieza</span>
                                    </div>
                                    <div class="botones-ancho-fijo altura-40-px anchura-200-px flex flex-center borde-redondeado-5-px-superior padding-5px-lateral  borde-izquierdo-derecho bg-color-input">
                                        <span>Precio sugerido (20%)</span>
                                    </div>
                                    <div class="botones-ancho-fijo altura-40-px anchura-100-px flex flex-center padding-5px-lateral">
                                        <span>¿Es divisible?</span>
                                    </div>
                                    <div class="botones-ancho-fijo altura-40-px anchura-150-px flex flex-center borde-redondeado-5-px-superior padding-5px-lateral  borde-izquierdo-derecho bg-color-input">
                                        <span>Unidades por pieza</span>
                                    </div>
                                    <div class="botones-ancho-fijo altura-40-px anchura-150-px flex flex-center padding-5px-lateral">
                                        <span>Precio por unidad</span>
                                    </div>
                                    <div class="botones-ancho-fijo altura-40-px anchura-200-px flex flex-center borde-redondeado-5-px-superior padding-5px-lateral  borde-izquierdo-derecho bg-color-input">
                                        <span>Precio sugerido (20%)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="anchura-100-por-ciento flex flex-center" style="height: calc(100% - 40px);">
                            <div class="overflow-auto scroll-invisible" style="width: 300px;" id="ContenedorFilasProductos">
                                <div class=" anchura-100-por-ciento overflow-auto" id="DivContenedorFilasProductos">
                                    
                                </div>
                            </div>
                            <div class="altura-100-por-ciento overflow-auto padding-5px-lateral" style="width: calc(100% - 300px - 10px);" id="ContenedorFilasPreciosTablaListaCompra">
                                <div class="anchura-100-por-ciento altura-100-por-ciento flex flex-center">
                                    <div class="anchura-100-por-ciento">
                                        <div class="anchura-100-por-ciento altura-150-px margin-10-px-auto flex flex-center">
                                            <img src="../../icons/basic/astronauta.png" class="altura-100-por-ciento">
                                        </div>
                                        <div class="anchura-100-por-ciento altura-40-px flex flex-center font-12-rem">
                                            <span>Agrega un producto</span>
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
<script src="../../js/view/lista-compra.js"></script>
<?php
include_once "../include/footer.php"
?>

</html>