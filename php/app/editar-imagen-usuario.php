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
        <div class="anchura-100-por-ciento margin-10-px-auto" style="height: 240px;" id="ContenedorCroppieEditarImagenUsuario">

        </div>
        <div class="anchura-100-por-ciento altura-40-px margin-10-px-auto flex flex-center">
            <div class="altura-100-por-ciento anchura-50-por-ciento-con-padding-5px-lateral padding-5px-lateral flex flex-center">
                <a class="boton altura-30-px padding-10px-lateral boton-secundario border-1-px-6d6d6d76 flex flex-center font-09-rem  position-relative borde-redondeado-5-px" id="BotonRotarImagenIzquierda">
                    <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.5 15a.75.75 0 0 1 0-1.5h.5c2.485 0 4.5-1.567 4.5-3.5 0-1.874-1.895-3.405-4.275-3.496L15 6.5H8.061l1.72 1.72a.75.75 0 0 1-.977 1.133L8.72 9.28l-3-3a.75.75 0 0 1 0-1.06l3-3 .084-.073A.75.75 0 0 1 9.78 3.28L8.062 5H15c3.314 0 6 2.239 6 5s-2.686 5-6 5h-.5ZM3.5 10.367a.5.5 0 0 0-.5.5V20a1 1 0 0 0 1 1h16.138a.5.5 0 0 0 .251-.933L3.751 10.434a.5.5 0 0 0-.251-.067Z" />
                        </svg>
                    </div>
                    <div class="altura-100-por-ciento padding-10px-lateral flex flex-center">
                        <span>Rotar a la izquierda</span>
                    </div>
                </a>
            </div>
            <div class="altura-100-por-ciento anchura-50-por-ciento-con-padding-5px-lateral padding-5px-lateral flex flex-center">
                <a class="boton altura-30-px padding-10px-lateral boton-secundario border-1-px-6d6d6d76 flex flex-center font-09-rem  position-relative borde-redondeado-5-px" id="BotonRotarImagenDerecha">
                    <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.5 15a.75.75 0 0 0 0-1.5H9c-2.485 0-4.5-1.567-4.5-3.5 0-1.874 1.894-3.405 4.275-3.496L9 6.5h6.939l-1.72 1.72a.75.75 0 0 0 .977 1.133l.084-.073 3-3a.75.75 0 0 0 0-1.06l-3-3-.084-.073a.75.75 0 0 0-.976 1.133L15.938 5H9c-3.314 0-6 2.239-6 5s2.686 5 6 5h.5ZM20.5 10.367a.5.5 0 0 1 .5.5V20a1 1 0 0 1-1 1H3.862a.5.5 0 0 1-.251-.933l16.638-9.633a.5.5 0 0 1 .251-.067Z" />
                        </svg>
                    </div>
                    <div class="altura-100-por-ciento padding-10px-lateral flex flex-center">
                        <span>Rotar a la derecha</span>
                    </div>
                </a>
            </div>
        </div>
        <div class="altura-50-px anchura-100-por-ciento-menos-20-px borde-redondeado-10-px bg-color-dbedf8 padding-10px flex flex-center font-08-rem color1474c4" style="font-weight: 600;">
            <span>Edita la foto moviendo el círculo o cambiando su tamaño. Puedes usar el mouse o las teclas de dirección, de signo más y de signo menos de tu teclado.</span>
        </div>
        <div class="anchura-100-por-ciento altura-40-px margin-10-px-auto flex flex-center">
            <div class="altura-100-por-ciento anchura-50-por-ciento-con-padding-5px-lateral padding-5px-lateral flex flex-center">
                <a class="boton altura-35-px padding-10px-lateral boton-secundario border-1-px-6d6d6d76 flex flex-center font-09-rem  position-relative borde-redondeado-5-px" id="BotonCargarImagenUsuario">
                    <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                        <svg width="25" height="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.087 7.75a5.752 5.752 0 0 1 11.326 0h.087a4 4 0 0 1 3.962 4.552 6.501 6.501 0 0 0-11.42 3.448H6a4 4 0 0 1 0-8h.087ZM22 16.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Zm-6-1.793V19.5a.5.5 0 0 0 1 0v-4.793l1.646 1.647a.5.5 0 0 0 .708-.708l-2.5-2.5a.5.5 0 0 0-.708 0l-2.5 2.5a.5.5 0 0 0 .708.708L16 14.707Z" />
                        </svg>
                    </div>
                    <div class="altura-100-por-ciento padding-10px-lateral flex flex-center">
                        <span>Cargar imagen</span>
                    </div>
                </a>
                <input type="file" id="InputImagenUsuario" accept="image/*" hidden>
            </div>
            <div class="altura-100-por-ciento anchura-50-por-ciento-con-padding-5px-lateral padding-5px-lateral flex flex-center" id="ContenedorBotonEliminarImagen"></div>
        </div>
        <div class="anchura-100-por-ciento altura-40-px margin-10-px-auto flex flex-right">
            <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem  position-relative borde-redondeado-5-px" id="BotonGuardarImagenUsuario">
                <span>Guardar</span>
            </a>
        </div>
    </div>
</body>
<?php
include_once "../include/footer.php"
?>
<script src="../../js/view/editar-imagen-usuario.js"></script>

</html>