<!DOCTYPE html>
<html class="font-family-Montserrat contenedor color-letra-2">

<head>
    <?php
    include_once "../include/head.php";
    ?>
</head>

<body>
    <div class="anchura-100-por-ciento altura-100-por-ciento overflow-auto" style="background-color: white;">
        <form class="overflow-auto margin-10-px-auto">
            <div class="overflow-auto contenedor-form">
                <div class="anchura-100-por-ciento flex flex-center flex-wrap" style="max-height: 400px;">
                    <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-10-px-auto">
                        <div class="altura-70-px anchura-100-por-ciento flex flex-center ">
                            <div class="altura-100-por-ciento anchura-100-por-ciento flex flex-center">
                                <div class="altura-100-por-ciento anchura-100-por-ciento-menos-20-px margin-10-px-auto">
                                    <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                        <span class="label-input">Nombre</span>
                                    </div>
                                    <div class="anchura-100-por-ciento altura-40-px">
                                        <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px" id="ContenedorSelectBuscarUnidadMedida">
                                            <select name="" id="SelectBuscarUnidadMedida"></select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div class="anchura-100-por-ciento-con-padding-10px-lateral padding-10px-lateral margin-15-px-auto altura-50-px flex flex-center">
            <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-left">
            </div>
            <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-right">
                <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem min-width-110px position-relative borde-redondeado-5-px" id="BotonGuardarInformacionNuevaUnidad">
                    <span>Guardar</span>
                </a>
            </div>
        </div>
    </div>
</body>
<?php 
include_once "../include/footer.php"
?>
<script src="../../js/view/nueva-unidad-medida.js"></script>

</html>