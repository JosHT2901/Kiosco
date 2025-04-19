<?php
session_start();
// Verifica si el usuario ya tiene una sesión iniciada
if (session_status() === PHP_SESSION_ACTIVE && isset($_SESSION['Activo']) && $_SESSION['Activo'] === true) {
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
        <div class="anchura-400-px altura-100-por-ciento flex flex-center tarjeta-ajustable-450-100">
            <div class="anchura-100-por-ciento padding-20px borde-redondeado-5-px box-shadow-1 bg-color-white tj-login position-relative" id="ContenedorLogin">
                <div class="overflow-auto">
                    <div class="anchura-100-por-ciento altura-50-px flex flex-center margin-15-px-auto">
                        <div class="flex flex-left altura-100-por-ciento">
                            <img src="../../images/logotipo/logotipo-gris-2023-v1.jpg" class="altura-80-por-ciento">
                        </div>
                    </div>
                    <div class="anchura-100-por-ciento-con-padding-5px-lateral font-11-rem font-family-Montserrat-Semi-Bold padding-5px-lateral altura-30-px flex flex-center margin-10-px-auto">
                        <span>Iniciar sesión</span>
                    </div>
                    <form class="overflow-auto margin-10-px-auto">
                        <div class="overflow-auto">
                            <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto">
                                <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                    <span class="label-input">Ingresa tu usuario</span>
                                </div>
                                <div class="anchura-100-por-ciento altura-40-px">
                                    <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                                        <input type="text" class="input" id="InputUsuarioLogin">
                                    </div>
                                </div>
                            </div>
                            <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto">
                                <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                    <span class="label-input">Ingresa tu contraseña o PIN</span>
                                </div>
                                <div class="anchura-100-por-ciento altura-40-px flex flex-center bg-color-input borde-redondeado-5-px">
                                    <div class="anchura-100-por-ciento-menos-40-px altura-100-por-ciento flex flex-center">
                                        <div class=" altura-100-por-ciento anchura-100-por-ciento ">
                                            <input type="password" class="input" id="InputPasswordLogin" autocomplete="off">
                                        </div>
                                    </div>
                                    <div class="altura-100-por-ciento anchura-40-px flex flex-center">
                                        <a class="boton altura-35-px anchura-35-px borde-redondeado-5-px bg-color-boton-secundario flex flex-center position-relative" id="BotonVerPasswordLogin">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256">
                                                <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto altura-50-px flex flex-center">
                        <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-left">
                            <a class="boton boton-solo-letra" href="crear-usuario.php">
                                <span>Crear usuario</span>
                            </a>
                        </div>
                        <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-right">
                            <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem min-width-110px position-relative borde-redondeado-2-px" id="BotonIniciarSesion">
                                <span>Iniciar sesión</span>
                            </a>
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
<script src="../../js/view/login.js"></script>
</html>