<!DOCTYPE html>
<html class="font-family-Montserrat contenedor color-letra-2">

<head>
    <?php
    include_once "../include/head.php";
    ?>
    <link rel="stylesheet" href="../../css/view/login.css">
</head>

<body>
    <div class=" anchura-100-por-ciento-menos-20-px padding-10px-lateral altura-100-por-ciento overflow-auto" style="background-color: white;">
        <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral altura-50-px margin-10-px-auto flex flex-center">
            <div class="altura-100-por-ciento flex flex-left" style="width: calc(100% - 150px);">
                <div class=" padding-10px flex flex-center" style="font-weight: 600; ">
                    <span id="SpanNombreProductoExistencias"></span>
                </div>
            </div>
            <div class=" anchura-150-px altura-100-por-ciento flex flex-right">
                <div class=" padding-10px borde-redondeado-10-px flex flex-center color1474c4" style="font-weight: 600; ">
                    <span id="SpanCodigoProductoExistencias"></span>
                </div>
            </div>
        </div>
        <div class="anchura-100-por-ciento position-relative" id="ContenedorTablaExistenciasProductos" style="height:calc(100% - 70px)">
            
        </div>
    </div>
</body>
<?php
include_once "../include/footer.php"
?>
<script src="../../js/view/existencias-producto.js"></script>

</html>