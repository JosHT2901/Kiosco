<!DOCTYPE html>
<html class="font-family-Montserrat contenedor color-letra-2">

<head>
    <?php
    include_once "../include/head.php";
    ?>
    <link rel="stylesheet" href="../../css/view/crear-usuario.css">
    <style>
.menu-container {
  position: relative;
  display: inline-block;
}

#menuToggle {
  cursor: pointer;
  background: none;
  border: none;
  font-size: 20px;
}

.menu {
    display: none;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0;
    list-style: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    min-width: 160px;
    z-index: 1000;
}


.menu-item {
  padding: 10px 15px;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
}

.menu-item:hover {
  background-color: #f0f0f0;
}

.has-submenu .submenu {
  display: none;
  position: absolute;
  top: 0;
  left: 100%;
  margin-left: 1px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 150px;
  z-index: 1001;
}

.has-submenu:hover .submenu {
  display: block;
}

    </style>
</head>

<body>
<div class="menu-container">
  <button id="menuToggle">⋮</button>
  <ul class="menu" id="mainMenu">
    <li class="menu-item">Abrir</li>
    <li class="menu-item">Compartir</li>
    <li class="menu-item has-submenu">
      Más acciones
      <ul class="submenu">
        <li>Renombrar</li>
        <li>Mover a...</li>
        <li>Descargar</li>
      </ul>
    </li>
    <li class="menu-item">Eliminar</li>
  </ul>
</div>

</body>
<script>
$(document).ready(function () {
    
});

</script>
</html>