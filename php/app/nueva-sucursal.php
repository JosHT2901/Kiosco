<!DOCTYPE html>
<html class="font-family-Montserrat contenedor color-letra-2">

<head>
    <?php
    include_once "../include/head.php";
    ?>
    <link rel="stylesheet" href="../../css/view/login.css">
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
                                        <span class="label-input">Nombre de sucursal</span>
                                    </div>
                                    <div class="anchura-100-por-ciento altura-40-px">
                                        <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                                            <input type="text" class="input" id="InputNombreNuevaSucursal">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-10-px-auto contenedor-input-resizable-33-por-ciento-margin-30px">
                        <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                            <span class="label-input">Calle</span>
                        </div>
                        <div class="anchura-100-por-ciento altura-40-px flex flex-center bg-color-input borde-redondeado-5-px">

                            <div class=" altura-100-por-ciento anchura-100-por-ciento ">
                                <input type="text"  class="input" id="InputCalleNuevaSucursal">
                            </div>
                        </div>
                    </div>
                    <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-10-px-auto contenedor-input-resizable-33-por-ciento-margin-30px">
                        <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                            <span class="label-input">Número exterior</span>
                        </div>
                        <div class="anchura-100-por-ciento altura-40-px flex flex-center bg-color-input borde-redondeado-5-px">

                            <div class=" altura-100-por-ciento anchura-100-por-ciento ">
                                <input type="text" class="input" id="InputNumeroExteriorNuevaSucursal">
                            </div>
                        </div>
                    </div>
                    <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto contenedor-input-resizable-33-por-ciento-margin-30px">
                        <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                            <span class="label-input">Número interior</span>
                        </div>
                        <div class="anchura-100-por-ciento altura-40-px flex flex-center bg-color-input borde-redondeado-5-px">
                            <div class=" altura-100-por-ciento anchura-100-por-ciento ">
                                <input type="text" class="input" id="InputNumeroInteriorNuevaSucursal">
                            </div>

                        </div>
                    </div>
                    <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto contenedor-input-resizable-33-por-ciento-margin-30px">
                        <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                            <span class="label-input">Código postal</span>
                        </div>
                        <div class="anchura-100-por-ciento altura-40-px flex flex-center bg-color-input borde-redondeado-5-px">
                            <div class="anchura-100-por-ciento-menos-40-px altura-100-por-ciento flex flex-center">
                                <div class=" altura-100-por-ciento anchura-100-por-ciento ">
                                    <input type="text" class="input" id="InputCodigoPostalNuevaSucursal" >
                                </div>
                            </div>
                            <div class="altura-100-por-ciento anchura-40-px flex flex-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 2.5a7.5 7.5 0 0 1 5.964 12.048l4.743 4.745a1 1 0 0 1-1.32 1.497l-.094-.083-4.745-4.743A7.5 7.5 0 1 1 10 2.5Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto contenedor-input-resizable-33-por-ciento-margin-30px">
                        <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                            <span class="label-input">Colonia</span>
                        </div>
                        <div class="anchura-100-por-ciento altura-40-px flex flex-center bg-color-input borde-redondeado-5-px">
                            <div class=" altura-100-por-ciento anchura-100-por-ciento ">
                                <div class="anchura-100-por-ciento altura-100-por-ciento flex flex-center" id="ContenedorLocalidadesNuevaSucursal">
                                    <span id="SpanLocalidadNuevaSucursal"></span>
                                    <input type="hidden" id="InputLocalidadNuevaSucursal">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto contenedor-input-resizable-33-por-ciento-margin-30px">
                        <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                            <span class="label-input">Municipio</span>
                        </div>
                        <div class="anchura-100-por-ciento altura-40-px flex flex-center bg-color-input borde-redondeado-5-px">
                            <div class=" altura-100-por-ciento anchura-100-por-ciento flex flex-center">
                            <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral flex flex-center">
                                    <span id="SpanMunicipioNuevaSucursal"></span>
                                    <input type="hidden" id="InputMunicipioNuevaSucursal">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto contenedor-input-resizable-50-por-ciento-margin-30px">
                        <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                            <span class="label-input">Entidad federativa</span>
                        </div>
                        <div class="anchura-100-por-ciento altura-40-px flex flex-center bg-color-input borde-redondeado-5-px">
                            <div class=" altura-100-por-ciento anchura-100-por-ciento flex flex-center">
                                <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral flex flex-center">
                                    <span id="SpanEntidadNuevaSucursal"></span>
                                    <input type="hidden" id="InputEntidadNuevaSucursal">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto contenedor-input-resizable-50-por-ciento-margin-30px">
                        <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                            <span class="label-input">Teléfono de contacto</span>
                        </div>
                        <div class="anchura-100-por-ciento altura-40-px flex flex-center bg-color-input borde-redondeado-5-px">
                            <div class="altura-100-por-ciento anchura-40-px flex flex-center">
                                <span>+52</span>
                            </div>
                            <div class="anchura-100-por-ciento-menos-40-px altura-100-por-ciento flex flex-center">
                                <div class=" altura-100-por-ciento anchura-100-por-ciento ">
                                    <input type="text" class="input" id="InputTelefonoNuevaSucursal">
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
                <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem min-width-110px position-relative borde-redondeado-5-px" id="BotonGuardarInformacionNuevaSucursal">
                    <span>Guardar</span>
                </a>
            </div>
        </div>
    </div>
</body>
<?php 
include_once "../include/footer.php"
?>
<script src="../../js/view/nueva-sucursal.js"></script>

</html>