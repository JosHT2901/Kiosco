<?php
function Conexion($ajax)
{
    $servidor = "82.165.210.54:3306";
    $usuario = "root";
    $password = "Hola$290105";
    $database = "Kiosco";

    try {
        // Crear conexión a la base de datos con PDO
        $conexion = new PDO("mysql:host=$servidor;dbname=$database;charset=utf8mb4", $usuario, $password);

        // Establecer el modo de error a excepción para una mejor depuración
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Retornar la conexión
        return $conexion;
    } catch (PDOException $e) {
        // Manejo de errores dependiendo de si es una llamada AJAX o no
        if ($ajax) {
            // Si es una llamada AJAX, retornar un mensaje de error en formato simple
            die("Error en la conexión a la base de datos: " . $e->getMessage());
        } else {
            // Si no es AJAX, retornar false para manejarlo en otro lugar
            return false;
        }
    }
}
?>
