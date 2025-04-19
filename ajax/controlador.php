
<?php
include_once "ajax.php";
include_once "funciones-adicionales.php";
include_once "funciones-correo.php";
include_once "../library/php/vendor/autoload.php";
switch ($_POST['accion']) {
    case 'Crear_Nuevo_Usuario':
        Crear_Nuevo_Usuario($_POST['data']);
        break;
    case 'Generar_codigo':
        Generar_Codigo_Solo_Uso_Usuario($_POST['data']);
        break;
    case 'Enviar_mensaje_codigo_solo_uso':
        Enviar_Mensaje_Codigo_Solo_Uso($_POST['data']);
        break;
    case 'Verificar_codigo_solo_uso':
        Verificar_codigo_solo_uso($_POST['data']);
        break;
    case 'Iniciar_sesion':
        Iniciar_sesion($_POST['data']);
        break;
    case 'Nueva_Sucursal':
        Nueva_Sucursal($_POST['data']);
        break;
    case 'Obtener_Sucursales':
        Obtener_Sucursales();
        break;
    case 'Seleccionar_sucursal':
        Seleccionar_sucursal($_POST['data']);
        break;
    case 'Nuevo_departamento':
        Nuevo_Departamento($_POST['data']);
        break;
    case 'Obtener_departamentos':
        Obtener_departamentos();
        break;
    case 'Eliminar_departamento':
        Eliminar_departamento($_POST['data']);
        break;
    case 'Obtener_informacion_departamento':
        Obtener_informacion_departamento($_POST['data']);
        break;
    case 'Editar_nombre_departamento':
        Editar_nombre_departamento($_POST['data']);
        break;
    default:
        # code...
        break;
}
