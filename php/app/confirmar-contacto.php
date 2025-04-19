<?php
include_once "../../ajax/data-base.php";
session_start();
try {
    $sql = "SELECT Correo_Verificado FROM Usuarios WHERE ID = ?";
    $query = Conexion(false)->prepare($sql);
    $query->bindParam(1, $_SESSION['Usuario_ID'], PDO::PARAM_INT);
    $query->execute();
    $row = $query->fetch(PDO::FETCH_ASSOC);

    if ($row && $row['Correo_Verificado']) {
        header("Location: login.php"); 
        exit;
    }
} catch (PDOException $e) {
    // Puedes redirigir o mostrar un error
    echo "Error en la base de datos: " . $e->getMessage();
    exit;
}
?>
<!DOCTYPE html>
<html class="font-family-Montserrat contenedor color-letra-2">

<head>
    <?php
    include_once "../include/head.php";
    ?>
    <link rel="stylesheet" href="../../css/view/crear-usuario.css">
</head>

<body>
    <div class="anchura-100-por-ciento altura-100-vh flex-center flex min-height-650px">
        <div class=" anchura-80-por-ciento altura-100-por-ciento flex flex-center tarjeta-ajustable-450-100">
            <div class="anchura-100-por-ciento padding-20px borde-redondeado-5-px box-shadow-1 tj-login bg-color-white" id="ContenedorPaginaCrearUsuario">
                <div class="overflow-auto">
                    <div class="anchura-100-por-ciento altura-50-px flex flex-center margin-15-px-auto">
                        <div class="flex flex-left altura-100-por-ciento">
                            <img src="../../images/logotipo/logotipo-gris-2023-v1.jpg" class="altura-80-por-ciento">
                        </div>
                    </div>
                    <div class="anchura-100-por-ciento-con-padding-5px-lateral font-11-rem font-family-Montserrat-Semi-Bold padding-5px-lateral altura-30-px flex flex-center margin-10-px-auto">
                        <span>Confirma tu correo electrónico</span>
                    </div>
                    <form class="overflow-auto margin-10-px-auto">
                        <div class="overflow-auto">
                            <div class=" anchura-100-por-ciento font-09-rem flex flex-center bg-color-dbedf8  borde-redondeado-5-px">
                                <div class="altura-100-por-ciento anchura-100-por-ciento-menos-20-px padding-10px color1474c4 flex flex-center" style="font-weight: 500;">
                                    <span>Ingresa el código que recibiste en tu correo</span>
                                </div>
                            </div>
                            <div class="anchura-100-por-ciento margin-20-px-auto flex flex-center">
                                <form>
                                    <div class="altura-40-px anchura-40-px border-2-px-6d6d6d76 borde-redondeado-10-px margin-0px-10px">
                                        <input type="text" class="anchura-100-por-ciento altura-100-por-ciento input input-codigo-confirmacion">
                                    </div>
                                    <div class="altura-40-px anchura-40-px border-2-px-6d6d6d76 borde-redondeado-10-px margin-0px-10px">
                                        <input type="text" class="anchura-100-por-ciento altura-100-por-ciento input input-codigo-confirmacion">
                                    </div>
                                    <div class="altura-40-px anchura-40-px border-2-px-6d6d6d76 borde-redondeado-10-px margin-0px-10px">
                                        <input type="text" class="anchura-100-por-ciento altura-100-por-ciento input input-codigo-confirmacion">
                                    </div>
                                    <div class="altura-40-px anchura-40-px border-2-px-6d6d6d76 borde-redondeado-10-px margin-0px-10px">
                                        <input type="text" class="anchura-100-por-ciento altura-100-por-ciento input input-codigo-confirmacion">
                                    </div>
                                    <div class="altura-40-px anchura-40-px border-2-px-6d6d6d76 borde-redondeado-10-px margin-0px-10px">
                                        <input type="text" class="anchura-100-por-ciento altura-100-por-ciento input input-codigo-confirmacion">
                                    </div>
                                    <div class="altura-40-px anchura-40-px border-2-px-6d6d6d76 borde-redondeado-10-px margin-0px-10px">
                                        <input type="text" class="anchura-100-por-ciento altura-100-por-ciento input input-codigo-confirmacion">
                                    </div>
                                </form>

                            </div>
                            <div class="anchura-100-por-ciento flex flex-center margin-20-px-auto">
                                <span>¿No recibiste el código?</span>
                            </div>
                            <div class="anchura-100-por-ciento margin-10-px-auto flex flex-center" id="ContenedorBotonReenviarCorreo">

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>
<script src="../../js/view/confirmar-correo.js"></script>
</html>