<!DOCTYPE html>
<html class="font-family-Montserrat contenedor color-letra-2">

<head>
  <?php
  include_once "../include/head.php";
  ?>
  <link rel="stylesheet" href="../../css/view/crear-usuario.css">
</head>

<body>
  <div class="anchura-80-por-ciento bg-color-white overflow-auto padding-10px-lateral borde-redondeado-10-px box-shadow-1 position-absolute border-2-px-white"
    style="top: 30px; left: 50%; transform: translateX(-50%); z-index: 9999;">
    <div class="anchura-100-por-ciento altura-100-por-ciento overflow-auto margin-10-px-auto">
      <form class="overflow-auto margin-10-px-auto altura-100-por-ciento">
        <div class="overflow-auto flex flex-center altura-100-por-ciento">
          <div class=" anchura-50-por-ciento-con-padding-5px-lateral padding-5px-lateral altura-100-por-ciento">
            <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
              <span class="label-input">Fecha inicio</span>
            </div>
            <div class="anchura-100-por-ciento altura-40-px">
              <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                <input type="date" class="input">
              </div>
            </div>
          </div>
          <div class="anchura-50-por-ciento-con-padding-5px-lateral padding-5px-lateral altura-100-por-ciento">
            <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
              <span class="label-input">Fecha final</span>
            </div>
            <div class="anchura-100-por-ciento altura-40-px">
              <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                <input type="date" class="input">
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="anchura-100-por-ciento altura-40-px flex flex-center margin-10-px-auto">
      <div class="anchura-50-por-ciento-con-padding-5px-lateral altura-100-por-ciento flex flex-left">
        <a class="boton boton-solo-letra" id="BotonCerrarSesion">Cerrar sesión</a>
      </div>
      <div class="anchura-50-por-ciento-con-padding-5px-lateral altura-100-por-ciento flex flex-right">
        <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem  position-relative borde-redondeado-5-px" href="mi-cuenta.php">
          <span>Filtrar</span>
        </a>
      </div>
    </div>
  </div>
</body>

</html>