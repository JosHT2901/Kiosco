<?php 
$menuData = json_decode(file_get_contents('../../json/menu.json'), true);
?>
<div class="anchura-100-por-ciento altura-60-px flex flex-center" style="background-color:white">
    <div class="anchura-60-px altura-60-px flex flex-center">
        <a class="boton boton-solo-icono anchura-40-px altura-40-px tarjeta-hover borde-redondeado-50-px flex flex-center" id="BotonMenuPrincipal">
            <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.75 13A2.25 2.25 0 0 1 11 15.25v3.5A2.25 2.25 0 0 1 8.75 21h-3.5A2.25 2.25 0 0 1 3 18.75v-3.5A2.25 2.25 0 0 1 5.25 13h3.5Zm10 0A2.25 2.25 0 0 1 21 15.25v3.5A2.25 2.25 0 0 1 18.75 21h-3.5A2.25 2.25 0 0 1 13 18.75v-3.5A2.25 2.25 0 0 1 15.25 13h3.5Zm-10-10A2.25 2.25 0 0 1 11 5.25v3.5A2.25 2.25 0 0 1 8.75 11h-3.5A2.25 2.25 0 0 1 3 8.75v-3.5A2.25 2.25 0 0 1 5.25 3h3.5Zm10 0A2.25 2.25 0 0 1 21 5.25v3.5A2.25 2.25 0 0 1 18.75 11h-3.5A2.25 2.25 0 0 1 13 8.75v-3.5A2.25 2.25 0 0 1 15.25 3h3.5Z" />
            </svg>
        </a>
    </div>
    <div class="altura-100-por-ciento anchura-130-px flex flex-left" id="ContenedorBienvenida">
        <div class="altura-100-por-ciento anchura-100-por-ciento-menos-20-px padding-10px-lateral flex flex-left color1474c4 font-11-rem" style="font-weight: 600;">
            <span>Bienvenido</span>
        </div>
    </div>
    <div class="altura-100-por-ciento flex flex-center" style="width: calc(100% - 200px - 130px - 60px - 100px);" id="ContenedorSucursalMenu">
        <?php
        if ($_SESSION['ID_Sucursal']) {
        ?>
            <div class="altura-40-px padding-10px-lateral box-shadow-1 borde-redondeado-10-px font-09-rem flex flex-center" style="min-width: 80%;">
                <div class="altura-100-por-ciento flex flex-center  color-letra-subtitulo" style="font-weight: 600; width:calc(100% - 40px)">
                    <span><?php echo $_SESSION['Nombre_Sucursal'] ?></span>
                </div>
                <div class="anchura-40-px altura-40-px flex flex-center margin-0px-5px">
                    <a class="boton boton-solo-icono anchura-30-px altura-30-px tarjeta-hover borde-redondeado-5-px flex flex-center" id="BotonCambiarSucursal">
                        <svg width="25" height="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5.5a3.5 3.5 0 0 1-3 3.465V15a3 3 0 0 0 3 3h2.69l-.97-.97a.75.75 0 1 1 1.06-1.06l2.25 2.25a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 1 1-1.06-1.06l.97-.97H9A4.5 4.5 0 0 1 4.5 15V8.855A3.502 3.502 0 0 1 5.5 2 3.5 3.5 0 0 1 9 5.5Zm13 13a3.5 3.5 0 1 1-4-3.465V9a3 3 0 0 0-3-3h-1.94l.97.97a.75.75 0 0 1-1.06 1.06l-2.25-2.25a.75.75 0 0 1 0-1.06l2.25-2.25a.75.75 0 1 1 1.06 1.06l-.97.97H15A4.5 4.5 0 0 1 19.5 9v6.145c1.446.43 2.5 1.77 2.5 3.355Z" />
                        </svg>
                    </a>
                </div>
            </div>
        <?php
        }
        ?>
    </div>
    <div class="altura-100-por-ciento flex flex-right" style="width: 200px;" id="ContenedorBotonesCuenta">
        <div class=" padding-10px-lateral altura-50-px flex flex-right">
            <a class="boton boton-solo-icono anchura-40-px altura-40-px tarjeta-hover borde-redondeado-50-px flex flex-center margin-0px-5px" id="BotonAyudaMenu">
                <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4C9.238 4 7 6.238 7 9a1 1 0 0 0 2 0c0-1.658 1.342-3 3-3s3 1.342 3 3c0 .816-.199 1.294-.438 1.629-.262.365-.625.638-1.128.985l-.116.078c-.447.306-1.023.699-1.469 1.247-.527.648-.849 1.467-.849 2.561v.5a1 1 0 1 0 2 0v-.5c0-.656.178-1.024.4-1.299.257-.314.603-.552 1.114-.903l.053-.037c.496-.34 1.133-.786 1.62-1.468C16.7 11.081 17 10.183 17 9c0-2.762-2.238-5-5-5ZM12 21.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" />
                </svg>
            </a>
            <a class="boton boton-solo-icono anchura-40-px altura-40-px tarjeta-hover borde-redondeado-50-px flex flex-center margin-0px-5px">
                <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.042 19.003h5.916a3 3 0 0 1-5.916 0Zm2.958-17a7.5 7.5 0 0 1 7.5 7.5v4l1.418 3.16A.95.95 0 0 1 20.052 18h-16.1a.95.95 0 0 1-.867-1.338l1.415-3.16V9.49l.005-.25A7.5 7.5 0 0 1 12 2.004Z" />
                </svg>
            </a>
            <a class="boton boton-solo-icono anchura-40-px altura-40-px tarjeta-hover borde-redondeado-50-px flex flex-center margin-0px-5px" id="BotonMenuCuentaUsuario">
                <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.754 14a2.249 2.249 0 0 1 2.25 2.249v.918a2.75 2.75 0 0 1-.513 1.599C17.945 20.929 15.42 22 12 22c-3.422 0-5.945-1.072-7.487-3.237a2.75 2.75 0 0 1-.51-1.595v-.92a2.249 2.249 0 0 1 2.249-2.25h11.501ZM12 2.004a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" />
                </svg>
            </a>
        </div>
    </div>
    <div class="altura-100-por-ciento flex flex-center bg-color-boton-secundario font-09-rem" style="width: 90px; color:#4a4a4a; font-weight: 600;padding:0px 5px;">
        <span id="SpanHora"></span>
    </div>
</div>
<div class="tarjeta-menu" id="ContenedorBotonesMenuPrincipal">
    <div class="contenedor-tarjeta-menu" id="ContenedorTarjetasMenu">
        <div class="overflow-auto padding-10px-superior-inferior flex flex-wrap anchura-100-por-ciento" id="ContenedorTarjetasMenu">
            <?php 
                foreach($menuData as $item){
            ?>
            <a class="tarjeta-cuadrada-menu tarjeta-hover boton">
                <div class="anchura-100-por-ciento altura-60-px flex flex-center">
                    <img src="<?php echo $item['icon'] ?>" class="anchura-40-px">
                </div>
                <div class="anchura-100-por-ciento altura-30-px flex flex-center font-08-rem" style="font-weight: 600;">
                    <span><?php echo $item['label']?></span>
                </div>
            </a>
            <?php 
                }
            ?>
        </div>
    </div>
</div>
<div class="anchura-300-px position-absolute bg-color-white borde-redondeado-2-px overflow-auto" style="z-index: 10000;box-shadow:0 24px 54px rgba(0,0,0,.15),0 4.5px 13.5px rgba(0,0,0,.08); display:none" id="ContenedorMenuCuenta">
    <div class=" anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral altura-40-px flex flex-center margin-10-px-auto">
        <div class="altura-100-por-ciento anchura-50-por-ciento"></div>
        <div class="altura-100-por-ciento anchura-50-por-ciento">
            <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral flex flex-right">
                <a class="boton boton-solo-letra" id="BotonCerrarSesion">Cerrar sesión</a>
            </div>
        </div>
    </div>
    <div class=" anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-10-px-auto flex flex-center" style="height: 120px;">
        <div class="altura-100-por-ciento flex flex-center" style="width: 110px;">
            <div class="borde-redondeado-50-por-ciento border-2-px-6d6d6d76 position-relative tarjeta-con-botones" style="width: 90px; height:90px">
                <div class="anchura-100-por-ciento altura-100-por-ciento" id="ContenedorImagenUsuario">
                    <img src=<?php 
                    if (
                        !isset($_SESSION['Imagen']) ||
                        $_SESSION['Imagen'] === null ||
                        $_SESSION['Imagen'] === 'No aplica'
                    ) {
                        echo "../../images/other/usuario.jpg";
                    } else {
                        $ruta = "../../images/usuarios/" . $_SESSION['Imagen'];
                        if (file_exists($ruta)) {
                            echo $ruta;
                        } else {
                            echo "../../images/other/usuario.jpg";
                        }
                    }
                    
                   ?> 
                    class="altura-100-por-ciento anchura-100-por-ciento borde-redondeado-50-por-ciento">
                </div>
                <a class="anchura-100-por-ciento boton altura-100-por-ciento borde-redondeado-50-por-ciento position-absolute top-0 left-0 flex flex-center botones-tarjeta-con-botones" style="background-color: #0000006e;" id="BotonEditarImagenUsuario">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="svg-blanco" viewBox="0 0 256 256">
                        <path d="M208,56H180.28L166.65,35.56A8,8,0,0,0,160,32H96a8,8,0,0,0-6.65,3.56L75.71,56H48A24,24,0,0,0,24,80V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V80A24,24,0,0,0,208,56Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H80a8,8,0,0,0,6.66-3.56L100.28,48h55.43l13.63,20.44A8,8,0,0,0,176,72h32a8,8,0,0,1,8,8ZM128,88a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,88Zm0,72a28,28,0,1,1,28-28A28,28,0,0,1,128,160Z"></path>
                    </svg>
                </a>
            </div>
        </div>
        <div class="altura-100-por-ciento padding-10px-lateral flex flex-center" style="width: calc(100% - 110px - 20px);">
            <div class="anchura-100-por-ciento overflow-auto">
                <div class="anchura-100-por-ciento flex flex-left" style="font-weight: 600;">
                    <span class="texto-truncado"><?php echo $_SESSION['Nombre'] . ' ' . $_SESSION['Apellido_Paterno'] . ' ' . $_SESSION['Apellido_Materno'] ?></span>
                </div>
                <div class="anchura-100-por-ciento font-09-rem color-letra-subtitulo flex flex-left margin-10-px-auto" style="font-weight: 600;">
                    <span class="texto-truncado"><?php echo $_SESSION['Usuario'] ?></span>
                </div>
            </div>
        </div>
    </div>
    <div class="anchura-100-por-ciento flex flex-center bg-color-input" style="padding: 10px 0px;">
        <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem  position-relative borde-redondeado-5-px" href="mi-cuenta.php">
            <span>Mi perfil</span>
        </a>
    </div>
</div>
<div class="anchura-300-px position-absolute bg-color-white borde-redondeado-2-px overflow-auto" style="z-index: 10000;box-shadow:0 24px 54px rgba(0,0,0,.15),0 4.5px 13.5px rgba(0,0,0,.08); height:300px; display:none" id="ContenedorMenuSucursales">

</div>
<script src="../../js/view/menu.js"></script>