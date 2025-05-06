<?php
include_once "../ajax/data-base.php";
function Crear_Nuevo_Usuario($data)
{
    try {
        if (empty($data[0]['Nombre'])) {
            $respuesta = 'Ingresa el nombre';
        } else if (empty($data[0]['ApellidoPaterno'])) {
            $respuesta = 'Ingresa el apellido paterno';
        } else if (empty($data[0]['ApellidoMaterno'])) {
            $respuesta = 'Ingresa el apellido materno';
        } else if (empty($data[0]['FechaNacimiento'])) {
            $respuesta = 'Ingresa la fecha de nacimiento';
        } else if (empty($data[1]['Correo'])) {
            $respuesta = 'Ingresa el correo electrónico';
        } else if (empty($data[1]['Telefono'])) {
            $respuesta = 'Ingresa el teléfono';
        } else if (empty($data[2]['Usuario'])) {
            $respuesta = 'Ingresa el correo';
        } else if (empty($data[2]['Password'])) {
            $respuesta = 'Ingresa una contraseña';
        } else if (empty($data[2]['ConfirmarPassword'])) {
            $respuesta = 'Confirma la contraseña';
        } else if (empty($data[3]['PIN'])) {
            $respuesta = 'Ingresa un PIN';
        } else if (empty($data[3]['ConfirmarPIN'])) {
            $respuesta = 'Confirma el PIN';
        } else if (password_verify($data[2]['Password'], $data[2]['ConfirmarPassword'])) {
            $respuesta = 'Las contraseñas no coinciden. Verifica';
        } else if (password_verify($data[3]['PIN'], $data[3]['ConfirmarPIN'])) {
            $respuesta = 'La confirmación de PIN no coincide. Verifica';
        } else {
            $sql = "SELECT ID, Habilitado FROM Usuarios WHERE (Usuario=? OR Correo=? OR Telefono=? AND Habilitado=1)";
            $query = Conexion(true)->prepare($sql);
            $query->bindParam(1, $data[2]['Usuario']);
            $query->bindParam(2, $data[1]['Correo']);
            $query->bindParam(3, $data[1]['Telefono']);
            $query->execute();
            if ($query->rowCount() > 0) {
                $respuesta = 'Este correo y/o teléfono y/o usuario ya está registrado';
            } else {
                $password = password_hash($data[2]['Password'], PASSWORD_DEFAULT);
                $pin = password_hash($data[3]['PIN'], PASSWORD_DEFAULT);
                $insertSql = "Call Nuevo_Usuario (?,?,?,?,?,?,?,?,?);";
                $query = Conexion(true)->prepare($insertSql);
                $query->bindParam(1, $data[0]['Nombre']);
                $query->bindParam(2, $data[0]['ApellidoPaterno']);
                $query->bindParam(3, $data[0]['ApellidoMaterno']);
                $query->bindParam(4, $data[0]['FechaNacimiento']);
                $query->bindParam(5, $data[1]['Correo']);
                $query->bindParam(6, $data[1]['Telefono']);
                $query->bindParam(7, $data[2]['Usuario']);
                $query->bindParam(8, $password);
                $query->bindParam(9, $pin);
                if ($query->execute()) {
                    DestruirSesiones();
                    $resultado = $query->fetch(PDO::FETCH_ASSOC);
                    if ($resultado && isset($resultado['ID'])) {
                        session_start();
                        $_SESSION['Usuario_ID'] = $resultado['ID'];
                        $respuesta = " Usuario creado exitosamente";
                    } else {
                        $respuesta = "No se pudo crear el usuario";
                    }
                } else {
                    $respuesta = 'Error al insertar el nuevo usuario';
                }
                echo json_encode($respuesta);
            }
        }
    } catch (PDOException $e) {
        echo $e->getMessage();
    } catch (Exception $e) {
        echo 'Excepción capturada: ', $e->getMessage(), "\n";
    }
}

function Generar_Codigo_Solo_Uso_Usuario($data)
{
    try {
        $codigo = Generar_Codigo();
        session_start();
        $sql = "Call Generar_codigo_un_solo_uso(?,?,?)";
        $query = Conexion(true)->prepare($sql);
        $query->bindParam(1, $data);
        $query->bindParam(2, $codigo);
        $query->bindParam(3, $_SESSION['Usuario_ID']);
        $query->execute();
        $resultado = $query->fetch(PDO::FETCH_ASSOC);
        echo json_encode($resultado['mensaje']);
    } catch (PDOException $e) {
        echo $e->getMessage();
    } catch (Exception $e) {
        echo 'Excepción capturada: ', $e->getMessage(), "\n";
    }
}

function Verificar_codigo_solo_uso($data)
{
    try {
        $tipo = $data[0];
        $codigo = $data[1];
        session_start();
        $sql = "Call Verificar_codigo_un_solo_uso(?,?,?)";
        $query = Conexion(true)->prepare($sql);
        $query->bindParam(1, $tipo);
        $query->bindParam(2, $codigo);
        $query->bindParam(3, $_SESSION['Usuario_ID']);
        $query->execute();
        $resultado = $query->fetch(PDO::FETCH_ASSOC);

        if ($resultado && isset($resultado['valido'])) {
            if ($resultado['valido']) {
                $respuesta = "Código válido";
            } else {
                $respuesta = "Código inválido, usado o expirado.";
            }
        } else {
            $respuesta = "No se pudo verificar el código";
        }
        echo json_encode($respuesta);
    } catch (PDOException $e) {
        echo $e->getMessage();
    } catch (Exception $e) {
        echo 'Excepción capturada: ', $e->getMessage(), "\n";
    }
}

function Iniciar_sesion($data)
{
    try {
        if (empty($data['Usuario'])) {
            echo json_encode([
                'success' => false,
                'message' => 'Ingresa el usuario'
            ]);
            return;
        }

        if (empty($data['Password'])) {
            echo json_encode([
                'success' => false,
                'message' => 'Ingresa la contraseña o el PIN'
            ]);
            return;
        }

        DestruirSesiones();

        $usuario = $data['Usuario'];
        $password = $data['Password'];

        $sql = "SELECT * FROM Usuarios 
                WHERE (Usuario = :usuario OR Correo = :usuario OR Telefono = :usuario) 
                AND Habilitado = 1";

        $query = Conexion(true)->prepare($sql);
        $query->bindParam(':usuario', $usuario);
        $query->execute();

        if ($query->rowCount() > 0) {
            $user = $query->fetch(PDO::FETCH_ASSOC);

            if (
                password_verify($password, $user['Password']) ||
                password_verify($password, $user['PIN'])
            ) {
                session_start();
                $_SESSION['Nombre'] = $user['Nombre'];
                $_SESSION['Apellido_Paterno'] = $user['Apellido_Paterno'];
                $_SESSION['Apellido_Materno'] = $user['Apellido_Materno'];
                $_SESSION['Correo'] = $user['Correo'];
                $_SESSION['Telefono'] = $user['Telefono'];
                $_SESSION['Usuario'] = $user['Usuario'];
                $_SESSION['ID_Usuario'] = $user['ID'];
                $_SESSION['Imagen'] = $user['Imagen_Usuario'];

                // CONSULTAR SI TIENE PERMISOS
                $permisoQuery = Conexion(true)->prepare("SELECT COUNT(*) as Total FROM Permisos WHERE Usuario = :id_usuario");
                $permisoQuery->bindParam(':id_usuario', $user['ID']);
                $permisoQuery->execute();
                $permisoData = $permisoQuery->fetch(PDO::FETCH_ASSOC);
                $tienePermisos = ($permisoData['Total'] > 0);
                $_SESSION['Activo'] = ($permisoData['Total'] > 0) ? false : true;
                echo json_encode([
                    'success' => true,
                    'message' => 'Inicio de sesión exitoso',
                    'tienePermisos' => $tienePermisos
                ]);
                return;
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Contraseña o PIN incorrecto.'
                ]);
                return;
            }
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Este usuario no está registrado o está deshabilitado.'
            ]);
            return;
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Error de base de datos.',
            'error' => $e->getMessage()
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Error inesperado.',
            'error' => $e->getMessage()
        ]);
    }
}

function Nueva_Sucursal($data)
{
    try {
        // Validaciones
        $camposObligatorios = [
            'Nombre' => 'Ingresa el nombre',
            'Calle' => 'Ingresa la calle del domicilio de la sucursal',
            'Numero_Exterior' => 'Ingresa el número exterior del domicilio de la sucursal',
            'Numero_Interior' => 'Ingresa el número interior del domicilio de la sucursal',
            'Codigo_Postal' => 'Ingresa el código postal del domicilio de la sucursal',
            'Colonia' => 'Selecciona la colonia del domicilio de la sucursal',
            'Municipio' => 'Ingresa el municipio del domicilio de la sucursal',
            'Estado' => 'Ingresa el estado del domicilio de la sucursal',
            'Tipo_Sucursal' => 'Selecciona el tipo de sucursal'
        ];

        foreach ($camposObligatorios as $campo => $mensaje) {
            if (!isset($data[$campo]) || trim($data[$campo]) === '') {
                echo json_encode([
                    'status' => 'error',
                    'message' => $mensaje
                ]);
                return;
            }
        }

        // Variables
        $nombre = $data['Nombre'];
        $calle = $data['Calle'];
        $numeroExterior = $data['Numero_Exterior'];
        $numeroInterior = $data['Numero_Interior'];
        $codigoPostal = $data['Codigo_Postal'];
        $colonia = $data['Colonia'];
        $municipio = $data['Municipio'];
        $estado = $data['Estado'];
        $telefono = isset($data['Telefono']) ? $data['Telefono'] : null;
        $tipoSucursal = $data['Tipo_Sucursal'];

        // Verificar si ya existe la sucursal
        $sql = "SELECT * FROM Sucursales 
                WHERE Calle = ? AND Numero_Exterior = ? AND Codigo_Postal = ? AND Colonia = ?
                LIMIT 1";
        $query = Conexion(true)->prepare($sql);
        $query->execute([$calle, $numeroExterior, $codigoPostal, $colonia]);

        if ($query->rowCount() > 0) {
            echo json_encode([
                'status' => 'error',
                'message' => 'Esta sucursal ya está registrada'
            ]);
            return;
        }

        // Insertar la nueva sucursal
        $sql = "INSERT INTO Sucursales 
                (Nombre, Tipo,Calle, Numero_Exterior, Numero_Interior, Codigo_Postal, Colonia, Municipio, Estado, Telefono)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $insert = Conexion(true)->prepare($sql);
        $insert->execute([
            $nombre,
            $tipoSucursal,
            $calle,
            $numeroExterior,
            $numeroInterior,
            $codigoPostal,
            $colonia,
            $municipio,
            $estado,
            $telefono
        ]);

        echo json_encode([
            'status' => 'success',
            'message' => 'Sucursal registrada con éxito'
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Error en la base de datos: ' . $e->getMessage()
        ]);
    }
}

function Obtener_Sucursales()
{
    try {
        $conexion = Conexion(true); // Asegúrate de que devuelve una instancia válida de PDO

        if (!$conexion) {
            throw new Exception("No se pudo conectar a la base de datos.");
        }

        $sql = "SELECT * FROM Sucursales";
        $query = $conexion->prepare($sql);
        $query->execute();
        $rows = $query->fetchAll(PDO::FETCH_ASSOC);

        if (empty($rows)) {
            echo json_encode([
                'success' => false,
                'message' => 'No hay resultados'
            ]);
        } else {
            echo json_encode([
                'success' => true,
                'message' => 'Sucursales obtenidas exitosamente',
                'data' => $rows
            ]);
        }
    } catch (PDOException $e) {
        // Manejo de error de base de datos
        echo json_encode([
            'success' => false,
            'message' => 'Error en la base de datos.',
            'error' => $e->getMessage()
        ]);
    } catch (Exception $e) {
        // Manejo de errores generales
        echo json_encode([
            'success' => false,
            'message' => 'Ocurrió un error inesperado.',
            'error' => $e->getMessage()
        ]);
    }
}

function Seleccionar_sucursal($data)
{
    try {
        // Iniciar sesión si no está iniciada
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }

        // Verificar si los datos están completos
        if (isset($data['ID']) && isset($data['Nombre'])) {
            // Guardar la información en la sesión
            $_SESSION['Activo'] = true;
            $_SESSION['ID_Sucursal'] = $data['ID'];
            $_SESSION['Nombre_Sucursal'] = $data['Nombre'];

            // Respuesta de éxito
            echo json_encode([
                'success' => true,
                'message' => 'Información guardada correctamente'
            ]);
        } else {
            // Respuesta cuando faltan datos
            echo json_encode([
                'success' => false,
                'message' => 'Datos incompletos'
            ]);
        }
    } catch (PDOException $e) {
        // Manejo de error de base de datos
        echo json_encode([
            'success' => false,
            'message' => 'Error en la base de datos.',
            'error' => $e->getMessage()
        ]);
    } catch (Exception $e) {
        // Manejo de errores generales
        echo json_encode([
            'success' => false,
            'message' => 'Ocurrió un error inesperado.',
            'error' => $e->getMessage()
        ]);
    }
}

function Nuevo_Departamento($nombre)
{
    try {
        $sql = "SELECT 1 FROM Departamentos
    WHERE Nombre=?
    LIMIT 1";
        $query = Conexion(true)->prepare($sql);
        $query->bindParam(1, $nombre);
        $query->execute();
        if ($query->rowCount() > 0) {
            $respuesta = 'Este departamento ya está registrado';
        } else {
            $sql = "INSERT INTO Departamentos (Nombre, Fecha_creacion, Ultima_modificacion)
        VALUES (
        ?,
        NOW(),
        NOW()
        )";
            $insert = Conexion(true)->prepare($sql);
            $insert->bindParam(1, $nombre);
            $insert->execute();
            $respuesta = "Departamento registrado con éxito.";
        }
        echo json_encode($respuesta);
    } catch (PDOException $e) {
        // Puedes redirigir o mostrar un error
        echo "Error en la base de datos: " . $e->getMessage();
        exit;
    }
}

function Obtener_departamentos()
{
    try {
        $conexion = Conexion(true);

        if (!$conexion) {
            throw new Exception("No se pudo conectar a la base de datos.");
        }

        $sql = "SELECT ID, Nombre FROM Departamentos";
        $query = $conexion->prepare($sql);
        $query->execute();

        $departamentos = $query->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => true,
            'data' => $departamentos,
            'message' => count($departamentos) > 0 ? 'Departamentos obtenidos correctamente' : 'No hay departamentos registrados'
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error en la base de datos',
            'error' => $e->getMessage()
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error general',
            'error' => $e->getMessage()
        ]);
    }
}

function Eliminar_departamento($idDepartamento)
{
    try {
        $conexion = Conexion(true);

        // Verificar si hay productos asociados al departamento
        $sql = "SELECT COUNT(*) AS total FROM Productos WHERE Departamento = ?";
        $query = $conexion->prepare($sql);
        $query->bindParam(1, $idDepartamento, PDO::PARAM_INT);
        $query->execute();
        $resultado = $query->fetch(PDO::FETCH_ASSOC);

        if ($resultado['total'] > 0) {
            echo json_encode([
                "success" => false,
                "message" => "No se puede eliminar el departamento porque tiene productos asociados."
            ]);
            return;
        }

        // Si no hay productos, eliminar el departamento
        $sql = "DELETE FROM Departamentos WHERE ID = ?";
        $delete = $conexion->prepare($sql);
        $delete->bindParam(1, $idDepartamento, PDO::PARAM_INT);
        $delete->execute();

        echo json_encode([
            "success" => true,
            "message" => "Departamento eliminado exitosamente."
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            "success" => false,
            "message" => "Error al eliminar: " . $e->getMessage()
        ]);
    }
}

function Obtener_informacion_departamento($id)
{
    try {
        $conexion = Conexion(true); // Asegúrate que esta función devuelve un objeto PDO

        $sql = "SELECT ID, Nombre, Fecha_creacion, Ultima_modificacion 
                FROM Departamentos 
                WHERE ID = ?";

        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(1, $id, PDO::PARAM_INT);
        $stmt->execute();

        $departamento = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($departamento) {
            // Agregamos la fecha formateada
            $departamento['Fecha_creacion_formateada'] = FormatearFechaCompleta($departamento['Fecha_creacion']);
            $departamento['Ultima_modificacion_formateada'] = FormatearFechaCompleta($departamento['Ultima_modificacion']);
            echo json_encode([
                'success' => true,
                'data' => $departamento
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Departamento no encontrado.'
            ]);
        }
    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error al obtener el departamento: ' . $e->getMessage()
        ]);
    }
}


function Editar_nombre_departamento($data)
{
    try {
        $conexion = Conexion(true);

        if (!$conexion) {
            throw new Exception("No se pudo conectar a la base de datos.");
        }

        $id = $data['id'] ?? null;
        $nuevoNombre = trim($data['nombre']) ?? '';

        if (!$id || !$nuevoNombre) {
            echo json_encode([
                'success' => false,
                'message' => 'Faltan datos necesarios para la edición.'
            ]);
            return;
        }

        // Verifica si ya existe otro departamento con ese nombre (distinto ID)
        $sqlVerificar = "SELECT ID FROM Departamentos WHERE Nombre = ? AND ID != ?";
        $verificar = $conexion->prepare($sqlVerificar);
        $verificar->execute([$nuevoNombre, $id]);

        if ($verificar->rowCount() > 0) {
            echo json_encode([
                'success' => false,
                'message' => 'Ya existe un departamento con ese nombre.'
            ]);
            return;
        }

        // Actualiza el nombre
        $sqlActualizar = "UPDATE Departamentos SET Nombre = ?, Ultima_modificacion = NOW() WHERE ID = ?";
        $actualizar = $conexion->prepare($sqlActualizar);
        $actualizar->execute([$nuevoNombre, $id]);

        echo json_encode([
            'success' => true,
            'message' => 'Nombre del departamento actualizado correctamente.'
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error en la base de datos: ' . $e->getMessage()
        ]);
    }
}

function Agregar_nueva_unidad_medida($data)
{
    try {
        $conexion = Conexion(true);

        if (!$conexion) {
            throw new Exception("No se pudo conectar a la base de datos.");
        }

        $idUnidad = $data['id'] ?? null;
        $descripcion = $data['nombre'] ?? null;

        if (empty($idUnidad)) {
            echo json_encode([
                'success' => false,
                'message' => 'ID de unidad no válido o no recibido.'
            ]);
            return;
        }

        // Verificar si ya existe esa unidad (ahora como string)
        $sqlCheck = "SELECT COUNT(*) FROM `Unidades de Venta` WHERE `ID_Unidad_Venta` = :id_unidad";
        $stmtCheck = $conexion->prepare($sqlCheck);
        $stmtCheck->bindParam(':id_unidad', $idUnidad, PDO::PARAM_STR);
        $stmtCheck->execute();

        if ($stmtCheck->fetchColumn() > 0) {
            echo json_encode([
                'success' => false,
                'message' => 'La unidad ya está registrada'
            ]);
            return;
        }

        // Insertar nueva unidad
        $sqlInsert = "INSERT INTO `Unidades de Venta` (`ID_Unidad_Venta`, `Descripcion`)
                      VALUES (:id_unidad, :descripcion)";
        $stmtInsert = $conexion->prepare($sqlInsert);

        $stmtInsert->bindParam(':id_unidad', $idUnidad, PDO::PARAM_STR);
        $stmtInsert->bindParam(':descripcion', $descripcion, PDO::PARAM_STR);
        $stmtInsert->execute();

        echo json_encode([
            'success' => true,
            'message' => 'Unidad de venta agregada correctamente.',
            'data' => [
                'ID_Unidad_Venta' => $idUnidad,
                'Descripcion' => $descripcion
            ]
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error en la base de datos.',
            'error' => $e->getMessage()
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error general.',
            'error' => $e->getMessage()
        ]);
    }
}



function Obtener_Unidades_Medida()
{
    try {
        $conexion = Conexion(true);

        if (!$conexion) {
            throw new Exception("No se pudo conectar a la base de datos.");
        }

        // Consulta correcta a la tabla "Unidades de Venta"
        $sql = "SELECT ID, ID_Unidad_Venta, Descripcion FROM `Unidades de Venta`";
        $query = $conexion->prepare($sql);
        $query->execute();

        $unidades = $query->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => true,
            'data' => $unidades,
            'message' => count($unidades) > 0
                ? 'Unidades de medida obtenidas correctamente.'
                : 'No hay unidades de medida registradas.'
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error en la base de datos.',
            'error' => $e->getMessage()
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error general.',
            'error' => $e->getMessage()
        ]);
    }
}

function Eliminar_Unidad_Medida($idUnidad)
{
    try {
        $conexion = Conexion(true);

        if (!$conexion) {
            throw new Exception("No se pudo conectar a la base de datos.");
        }

        if (empty($idUnidad)) {
            echo json_encode([
                'success' => false,
                'message' => 'ID de unidad no válido o no proporcionado.'
            ]);
            return;
        }

        // 1. Verificar si hay productos asociados
        $sqlCheck = "SELECT COUNT(*) FROM Productos WHERE Unidad = :unidad";
        $stmtCheck = $conexion->prepare($sqlCheck);
        $stmtCheck->bindParam(':unidad', $idUnidad, PDO::PARAM_INT);
        $stmtCheck->execute();

        $productosAsociados = $stmtCheck->fetchColumn();

        if ($productosAsociados > 0) {
            echo json_encode([
                'success' => false,
                'message' => "No se puede eliminar. Hay $productosAsociados producto(s) asociado(s) a esta unidad."
            ]);
            return;
        }

        // 2. Eliminar unidad si no tiene productos relacionados
        $sqlDelete = "DELETE FROM `Unidades de Venta` WHERE `ID` = :unidad";
        $stmtDelete = $conexion->prepare($sqlDelete);
        $stmtDelete->bindParam(':unidad', $idUnidad, PDO::PARAM_INT);
        $stmtDelete->execute();


        echo json_encode([
            'success' => true,
            'message' => 'Unidad eliminada correctamente.'
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error en la base de datos.',
            'error' => $e->getMessage()
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error general.',
            'error' => $e->getMessage()
        ]);
    }
}

function  Generar_Codigo_Barras()
{
    do {
        $conexion = Conexion(true);
        $codigoBarras = generarCodigoBarras();

        // Consulta para verificar si el código de barras ya existe
        $sql = "SELECT COUNT(*) FROM Productos WHERE Codigo = :codigo_barras";
        $stmt = $conexion->prepare($sql);

        // Enlazar el parámetro
        $stmt->bindParam(':codigo_barras', $codigoBarras, PDO::PARAM_STR);

        // Ejecutar la consulta
        $stmt->execute();

        // Obtener el conteo de coincidencias
        $count = $stmt->fetchColumn();

        // Si el conteo es mayor que 0, genera otro código
    } while ($count > 0);
    // Retornar la respuesta en formato JSON dentro de la misma función
    $response = [
        "success" => true,
        "codigo_barras" => $codigoBarras
    ];

    // Devolver el JSON
    echo json_encode($response);
    exit;
}

function Crear_Nuevo_Producto($datosProducto)
{
    $conexion = Conexion(true);
    function sanearValor($valor)
    {
        return (is_numeric($valor) && is_finite($valor)) ? $valor : null;
    }

    try {
        $infoGeneral   = $datosProducto[0];
        $impuestos     = $datosProducto[1];
        $piezasVenta   = $datosProducto[2];
        $precios       = $datosProducto[3];
        $inventario    = $datosProducto[4];

        // Datos generales
        $codigo        = $infoGeneral['Codigo'];
        $descripcion   = $infoGeneral['Descripcion'];
        $departamento  = (int)$infoGeneral['Departamento'];
        $unidad        = (int)$infoGeneral['Unidad'];
        $tipoVenta     = $infoGeneral['TipoVenta'];

        $iva           = sanearValor($impuestos['I.V.A.'] ?? 0);
        $ieps          = sanearValor($impuestos['I.E.P.S.'] ?? 0);
        $precioCosto   = sanearValor($precios['costo'] ?? 0);

        $gananciaMenudeo      = sanearValor($precios['menudeo']['ganancia'] ?? null);
        $precioMenudeo        = sanearValor($precios['menudeo']['precio'] ?? null);
        $gananciaMedioMayoreo = sanearValor($precios['medio']['ganancia'] ?? null);
        $precioMedioMayoreo   = sanearValor($precios['medio']['precio'] ?? null);
        $gananciaMayoreo      = sanearValor($precios['mayoreo']['ganancia'] ?? null);
        $precioMayoreo        = sanearValor($precios['mayoreo']['precio'] ?? null);

        $minMenudeo = sanearValor($piezasVenta['menudeo']['min'] ?? null);
        $maxMenudeo = sanearValor($piezasVenta['menudeo']['max'] ?? null);
        $minMedio   = sanearValor($piezasVenta['medio']['min'] ?? null);
        $maxMedio   = sanearValor($piezasVenta['medio']['max'] ?? null);
        $minMayoreo = sanearValor($piezasVenta['mayoreo']['min'] ?? null);
        $maxMayoreo = sanearValor($piezasVenta['mayoreo']['max'] ?? null);

        $existencias = sanearValor($inventario['Existencias_Sucursal'] ?? 0);

        // Verificar duplicados
        $verifica = $conexion->prepare("SELECT ID FROM Productos WHERE Codigo = ?");
        $verifica->execute([$codigo]);

        if ($verifica->rowCount() > 0) {
            echo json_encode(['success' => false, 'message' => 'El producto ya existe.']);
            return;
        }

        // Llamada al procedimiento almacenado
        $stmt = $conexion->prepare("CALL Nuevo_Producto(
            :codigo, :descripcion, :departamento, :unidad, :tipoVenta,
            :iva, :ieps, :precioCosto,
            :gananciaMenudeo, :precioMenudeo,
            :gananciaMedioMayoreo, :precioMedioMayoreo,
            :gananciaMayoreo, :precioMayoreo,
            :minMenudeo, :maxMenudeo,
            :minMedio, :maxMedio,
            :minMayoreo, :maxMayoreo,
            :existencias, :sucursalID
        )");

        session_start();
        $stmt->bindParam(':codigo', $codigo);
        $stmt->bindParam(':descripcion', $descripcion);
        $stmt->bindParam(':departamento', $departamento);
        $stmt->bindParam(':unidad', $unidad);
        $stmt->bindParam(':tipoVenta', $tipoVenta);
        $stmt->bindParam(':iva', $iva);
        $stmt->bindParam(':ieps', $ieps);
        $stmt->bindParam(':precioCosto', $precioCosto);

        $stmt->bindParam(':gananciaMenudeo', $gananciaMenudeo);
        $stmt->bindParam(':precioMenudeo', $precioMenudeo);
        $stmt->bindParam(':gananciaMedioMayoreo', $gananciaMedioMayoreo);
        $stmt->bindParam(':precioMedioMayoreo', $precioMedioMayoreo);
        $stmt->bindParam(':gananciaMayoreo', $gananciaMayoreo);
        $stmt->bindParam(':precioMayoreo', $precioMayoreo);

        $stmt->bindParam(':minMenudeo', $minMenudeo);
        $stmt->bindParam(':maxMenudeo', $maxMenudeo);
        $stmt->bindParam(':minMedio', $minMedio);
        $stmt->bindParam(':maxMedio', $maxMedio);
        $stmt->bindParam(':minMayoreo', $minMayoreo);
        $stmt->bindParam(':maxMayoreo', $maxMayoreo);

        $stmt->bindParam(':existencias', $existencias);
        $stmt->bindParam(':sucursalID', $_SESSION['ID_Sucursal']);

        $stmt->execute();

        echo json_encode(['success' => true, 'message' => 'Producto insertado correctamente.']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
    }
}

function Obtener_Productos() {}

function Cerrar_sesion()
{
    try {
        // Iniciar sesión si no está iniciada
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // Verificar si la sesión realmente existe
        if (!isset($_SESSION)) {
            throw new Exception("No hay sesión activa.");
        }

        // Limpiar variables de sesión
        $_SESSION = [];

        // Eliminar cookie de sesión
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(
                session_name(),
                '',
                time() - 42000,
                $params["path"],
                $params["domain"],
                $params["secure"],
                $params["httponly"]
            );
        }

        // Destruir sesión
        if (!session_destroy()) {
            throw new Exception("No se pudo destruir la sesión.");
        }

        // Devolver respuesta exitosa
        echo json_encode([
            'success' => true,
            'message' => 'Sesión cerrada correctamente'
        ]);
    } catch (Exception $e) {
        // Devolver error
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Error al cerrar sesión',
            'error' => $e->getMessage()
        ]);
    }

    exit;
}

function Obtener_Sucursales_Sin_Sucursal_Actual()
{
    try {
        // Iniciar sesión si no está iniciada
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }

        $conexion = Conexion(true); // Conexión a la base de datos

        if (!$conexion) {
            throw new Exception("No se pudo conectar a la base de datos.");
        }

        // Obtener ID de la sucursal actual desde la sesión
        $idSucursalActual = $_SESSION['ID_Sucursal'] ?? null;

        if ($idSucursalActual) {
            $sql = "SELECT * FROM Sucursales WHERE ID != :idSucursalActual";
            $query = $conexion->prepare($sql);
            $query->bindParam(':idSucursalActual', $idSucursalActual, PDO::PARAM_INT);
        } else {
            // Si no hay una sucursal activa, simplemente traer todas
            $sql = "SELECT * FROM Sucursales";
            $query = $conexion->prepare($sql);
        }

        $query->execute();
        $rows = $query->fetchAll(PDO::FETCH_ASSOC);
        if (empty($rows)) {
            echo json_encode([
                'success' => false,
                'message' => 'No hay otras sucursales disponibles',
            ]);
        } else {
            echo json_encode([
                'success' => true,
                'message' => 'Sucursales obtenidas exitosamente',
                'data' => $rows
            ]);
        }
    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error en la base de datos.',
            'error' => $e->getMessage()
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Ocurrió un error inesperado.',
            'error' => $e->getMessage()
        ]);
    }
}

function Cambiar_sucursal($data)
{
    try {
        // Iniciar sesión si aún no está iniciada
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // Validar que se reciban los datos necesarios
        if (!isset($data['ID']) || !isset($data['Nombre'])) {
            echo json_encode([
                'success' => false,
                'message' => 'Faltan datos obligatorios (ID o Nombre de la sucursal).'
            ]);
            return;
        }

        // Actualizar variables de sesión
        $_SESSION['ID_Sucursal'] = $data['ID'];
        $_SESSION['Nombre_Sucursal'] = $data['Nombre'];

        echo json_encode([
            'success' => true,
            'message' => 'Sucursal cambiada exitosamente.'
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error al cambiar de sucursal.',
            'error' => $e->getMessage()
        ]);
    }
}

function Obtener_Imagen_Usuario()
{
    try {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (!isset($_SESSION['Usuario'])) {
            echo json_encode([
                'success' => false,
                'message' => 'Sesión no válida. Inicia sesión nuevamente.'
            ]);
            return;
        }

        $conexion = Conexion(true);
        if (!$conexion) {
            throw new Exception("No se pudo conectar a la base de datos.");
        }

        $sql = "SELECT Imagen_Usuario FROM Usuarios WHERE Usuario = :usuario";
        $query = $conexion->prepare($sql);
        $query->bindParam(':usuario', $_SESSION['Usuario']);
        $query->execute();

        if ($query->rowCount() > 0) {
            $resultado = $query->fetch(PDO::FETCH_ASSOC);
            $nombreImagen = $resultado['Imagen_Usuario'];

            $imagenPorDefecto = "../images/other/usuario.jpg";

            if (empty($nombreImagen) || strtolower(trim($nombreImagen)) === 'no aplica') {
                $imagenFinal = $imagenPorDefecto;
            } else {
                $rutaImagen = "../images/usuarios/" . $nombreImagen;

                if (file_exists($rutaImagen)) {
                    $imagenFinal = $rutaImagen;
                } else {
                    $imagenFinal = $imagenPorDefecto;
                }
            }

            echo json_encode([
                'success' => true,
                'message' => 'Imagen obtenida correctamente.',
                'ruta' => $imagenFinal
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Usuario no encontrado.'
            ]);
        }
    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error en la base de datos.',
            'error' => $e->getMessage()
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Ocurrió un error inesperado.',
            'error' => $e->getMessage()
        ]);
    }
}

function Guardar_Imagen_Usuario($data)
{
    try {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (!isset($_SESSION['ID_Usuario']) || empty($data)) {
            echo json_encode([
                'success' => false,
                'message' => 'Sesión inválida o imagen no proporcionada.'
            ]);
            return;
        }

        $idUsuario = $_SESSION['ID_Usuario'];
        $nombreArchivo = $idUsuario . '.png';
        $rutaDirectorio = '../images/usuarios/';
        $rutaArchivo = $rutaDirectorio . $nombreArchivo;

        // Eliminar si ya existe
        if (file_exists($rutaArchivo)) {
            unlink($rutaArchivo);
        }

        // Limpiar base64
        $imagenBase64 = preg_replace('#^data:image/\w+;base64,#i', '', $data);
        $imagenBinaria = base64_decode($imagenBase64);

        $imagen = imagecreatefromstring($imagenBinaria);
        if (!$imagen) {
            echo json_encode([
                'success' => false,
                'message' => 'No se pudo procesar la imagen.'
            ]);
            return;
        }

        // Crear imagen nueva con transparencia
        $ancho = imagesx($imagen);
        $alto = imagesy($imagen);
        $imagenConTransparencia = imagecreatetruecolor($ancho, $alto);
        imagesavealpha($imagenConTransparencia, true);
        $transparente = imagecolorallocatealpha($imagenConTransparencia, 0, 0, 0, 127);
        imagefill($imagenConTransparencia, 0, 0, $transparente);
        imagecopy($imagenConTransparencia, $imagen, 0, 0, 0, 0, $ancho, $alto);

        // Guardar como PNG
        imagepng($imagenConTransparencia, $rutaArchivo);

        imagedestroy($imagen);
        imagedestroy($imagenConTransparencia);

        // Guardar en base de datos
        $conexion = Conexion(true);
        $sql = "UPDATE Usuarios SET Imagen_Usuario = :imagen WHERE ID = :id";
        $query = $conexion->prepare($sql);
        $query->execute([
            ':imagen' => $nombreArchivo,
            ':id' => $idUsuario
        ]);

        // Actualizar sesión
        $_SESSION['Imagen'] = $nombreArchivo;

        echo json_encode([
            'success' => true,
            'message' => 'Imagen actualizada exitosamente.',
            'ruta' => $rutaArchivo,
            'imagen' => $nombreArchivo
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error al guardar imagen.',
            'error' => $e->getMessage()
        ]);
    }
}

function Eliminar_Imagen_Usuario()
{
    try {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (!isset($_SESSION['ID_Usuario'])) {
            echo json_encode([
                'success' => false,
                'message' => 'Sesión inválida.'
            ]);
            return;
        }

        $idUsuario = $_SESSION['ID_Usuario'];

        // Actualizar la base de datos para cambiar Imagen_Usuario a 'No aplica'
        $conexion = Conexion(true);
        $sql = "UPDATE Usuarios SET Imagen_Usuario = 'No aplica' WHERE ID = :id";
        $query = $conexion->prepare($sql);
        $query->execute([
            ':id' => $idUsuario
        ]);

        // Eliminar la imagen físicamente si existe en el directorio
        $rutaImagen = '../images/usuarios/' . $idUsuario . '.png';
        if (file_exists($rutaImagen)) {
            unlink($rutaImagen);  // Eliminar la imagen del servidor
        }

        // Actualizar el valor en la sesión
        $_SESSION['Imagen'] = 'No aplica';

        echo json_encode([
            'success' => true,
            'message' => 'Imagen eliminada exitosamente.'
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error al eliminar imagen.',
            'error' => $e->getMessage()
        ]);
    }
}

function Obtener_Productos_Con_Existencias($data)
{
    try {
        // Conexión a la base de datos
        $conexion = Conexion(true);
        if (!$conexion) {
            throw new Exception("Error de conexión a la base de datos.");
        }

        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }

        if (!isset($_SESSION['ID_Sucursal'])) {
            echo json_encode([
                'success' => false,
                'message' => 'No se ha iniciado sesión o no se ha definido la sucursal actual.'
            ]);
            return;
        }

        $SucursalActual = $_SESSION['ID_Sucursal'];

        // Obtener parámetros de paginación desde POST
        $pagina = isset($data['pagina']) ? intval($data['pagina']) : 1;
        $registrosPorPagina = isset($data['registrosPorPagina']) ? intval($data['registrosPorPagina']) : 10;

        $offset = ($pagina - 1) * $registrosPorPagina;

        // Consulta principal
        $sql = "SELECT 
                    p.ID AS ProductoID,
                    p.Codigo,
                    p.Descripcion,
                    p.Departamento,
                    d.Nombre AS Departamento,
                    u.Descripcion AS Unidad,
                    p.Tipo,
                    FORMAT(p.`I.V.A.`, 2) AS IVA,
                    FORMAT(p.`I.E.P.S.`, 2) AS IEPS,
                    COALESCE(SUM(CASE WHEN i.Sucursal = :SucursalActual THEN i.Existencia ELSE 0 END), 0) AS ExistenciasSucursalActual,
                    COALESCE(SUM(CASE WHEN i.Sucursal != :SucursalActual THEN i.Existencia ELSE 0 END), 0) AS ExistenciasOtrasSucursales,
                    FORMAT(pp.Precio_Costo, 2) AS Precio_Costo_Sin_Impuestos,
                    FORMAT(
                        CASE 
                            WHEN (pp.Precio_Menudeo + (pp.Precio_Menudeo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100) < 0.20 
                                THEN FLOOR((pp.Precio_Menudeo + (pp.Precio_Menudeo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100))
                            WHEN (pp.Precio_Menudeo + (pp.Precio_Menudeo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100) < 0.60 
                                THEN FLOOR((pp.Precio_Menudeo + (pp.Precio_Menudeo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100)) + 0.50
                            ELSE CEIL((pp.Precio_Menudeo + (pp.Precio_Menudeo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100))
                        END, 2
                    ) AS Precio_Menudeo_Con_Impuestos_Redondeado,
                    FORMAT(
                        CASE 
                            WHEN (pp.Precio_Medio_Mayoreo + (pp.Precio_Medio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100) < 0.20 
                                THEN FLOOR((pp.Precio_Medio_Mayoreo + (pp.Precio_Medio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100))
                            WHEN (pp.Precio_Medio_Mayoreo + (pp.Precio_Medio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100) < 0.60 
                                THEN FLOOR((pp.Precio_Medio_Mayoreo + (pp.Precio_Medio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100)) + 0.50
                            ELSE CEIL((pp.Precio_Medio_Mayoreo + (pp.Precio_Medio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100))
                        END, 2
                    ) AS Precio_Medio_Mayoreo_Con_Impuestos_Redondeado,
                    FORMAT(
                        CASE 
                            WHEN (pp.Precio_Mayoreo + (pp.Precio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100) < 0.20 
                                THEN FLOOR((pp.Precio_Mayoreo + (pp.Precio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100))
                            WHEN (pp.Precio_Mayoreo + (pp.Precio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100) < 0.60 
                                THEN FLOOR((pp.Precio_Mayoreo + (pp.Precio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100)) + 0.50
                            ELSE CEIL((pp.Precio_Mayoreo + (pp.Precio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100))
                        END, 2
                    ) AS Precio_Mayoreo_Con_Impuestos_Redondeado
                FROM 
                    Productos p
                LEFT JOIN 
                    Inventario i ON p.ID = i.Producto
                LEFT JOIN
                    Departamentos d ON p.Departamento = d.ID
                LEFT JOIN
                    Precios_Producto pp ON p.ID = pp.Producto
                LEFT JOIN
                    `Unidades de Venta` u ON p.Unidad = u.ID
                GROUP BY 
                    p.ID
                LIMIT :registros OFFSET :offset;";

        $query = $conexion->prepare($sql);
        $query->bindParam(':SucursalActual', $SucursalActual, PDO::PARAM_INT);
        $query->bindParam(':offset', $offset, PDO::PARAM_INT);
        $query->bindParam(':registros', $registrosPorPagina, PDO::PARAM_INT);

        $query->execute();
        $productos = $query->fetchAll(PDO::FETCH_ASSOC);

        // Consulta para contar el total de productos
        $countSql = "SELECT COUNT(DISTINCT p.ID) AS total
                     FROM Productos p
                     LEFT JOIN Inventario i ON p.ID = i.Producto";
        $countQuery = $conexion->prepare($countSql);
        $countQuery->execute();
        $totalRegistros = $countQuery->fetch(PDO::FETCH_ASSOC)['total'];

        echo json_encode([
            'success' => true,
            'message' => 'Productos obtenidos exitosamente.',
            'data' => $productos,
            'totalRegistros' => $totalRegistros,
            'paginaActual' => $pagina,
            'registrosPorPagina' => $registrosPorPagina
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error al obtener los productos.',
            'error' => $e->getMessage()
        ]);
    }
}

function Obtener_Sucursales_Con_Sucursal_Actual()
{
    try {
        // Iniciar sesión si no está iniciada
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }

        $conexion = Conexion(true); // Conexión a la base de datos

        if (!$conexion) {
            throw new Exception("No se pudo conectar a la base de datos.");
        }

        // Obtener ID de la sucursal actual desde la sesión
        $idSucursalActual = $_SESSION['ID_Sucursal'] ?? null;

        if ($idSucursalActual) {
            // Obtener todas las sucursales excepto la actual
            $sql = "SELECT * FROM Sucursales";
            $query = $conexion->prepare($sql);
            $query->execute();
            $otrasSucursales = $query->fetchAll(PDO::FETCH_ASSOC);

            // Obtener los datos de la sucursal actual
            $sqlActual = "SELECT * FROM Sucursales";
            $queryActual = $conexion->prepare($sqlActual);
            $queryActual->execute();
            $sucursalActual = $queryActual->fetch(PDO::FETCH_ASSOC);
        } else {
            // Si no hay una sucursal activa, traer todas como "otras", sin sucursal actual
            $sql = "SELECT * FROM Sucursales";
            $query = $conexion->prepare($sql);
            $query->execute();
            $otrasSucursales = $query->fetchAll(PDO::FETCH_ASSOC);
            $sucursalActual = null;
        }

        echo json_encode([
            'success' => true,
            'message' => 'Sucursales obtenidas exitosamente',
            'data' => [
                'sucursal_actual' => $sucursalActual,
                'otras_sucursales' => $otrasSucursales
            ]
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error en la base de datos.',
            'error' => $e->getMessage()
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Ocurrió un error inesperado.',
            'error' => $e->getMessage()
        ]);
    }
}

function Buscar_Productos_Con_Existencias($data)
{
    try {
        // Conexión a la base de datos
        $conexion = Conexion(true);
        if (!$conexion) {
            throw new Exception("Error de conexión a la base de datos.");
        }

        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }

        if (!isset($_SESSION['ID_Sucursal'])) {
            echo json_encode([
                'success' => false,
                'message' => 'No se ha iniciado sesión o no se ha definido la sucursal actual.'
            ]);
            return;
        }

        $SucursalActual = $_SESSION['ID_Sucursal'];

        // Obtener parámetros
        $pagina = isset($data['pagina']) ? intval($data['pagina']) : 1;
        $registrosPorPagina = isset($data['registrosPorPagina']) ? intval($data['registrosPorPagina']) : 10;
        $valorBusqueda = isset($data['valorBusqueda']) ? trim($data['valorBusqueda']) : '';

        $offset = ($pagina - 1) * $registrosPorPagina;

        // Base de la consulta
        $sql = "SELECT 
                        p.ID AS ProductoID,
                        p.Codigo,
                        p.Descripcion,
                        p.Departamento,
                        d.Nombre AS Departamento,
                        u.Descripcion AS Unidad,
                        p.Tipo,
                        FORMAT(p.`I.V.A.`, 2) AS IVA,
                        FORMAT(p.`I.E.P.S.`, 2) AS IEPS,
                        COALESCE(SUM(CASE WHEN i.Sucursal = :SucursalActual THEN i.Existencia ELSE 0 END), 0) AS ExistenciasSucursalActual,
                        COALESCE(SUM(CASE WHEN i.Sucursal != :SucursalActual THEN i.Existencia ELSE 0 END), 0) AS ExistenciasOtrasSucursales,
                        FORMAT(pp.Precio_Costo, 2) AS Precio_Costo_Sin_Impuestos,
                        FORMAT(
                            CASE 
                                WHEN (pp.Precio_Menudeo + (pp.Precio_Menudeo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100) < 0.20 
                                    THEN FLOOR((pp.Precio_Menudeo + (pp.Precio_Menudeo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100))
                                WHEN (pp.Precio_Menudeo + (pp.Precio_Menudeo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100) < 0.60 
                                    THEN FLOOR((pp.Precio_Menudeo + (pp.Precio_Menudeo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100)) + 0.50
                                ELSE CEIL((pp.Precio_Menudeo + (pp.Precio_Menudeo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100))
                            END, 2
                        ) AS Precio_Menudeo_Con_Impuestos_Redondeado,
                        FORMAT(
                            CASE 
                                WHEN (pp.Precio_Medio_Mayoreo + (pp.Precio_Medio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100) < 0.20 
                                    THEN FLOOR((pp.Precio_Medio_Mayoreo + (pp.Precio_Medio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100))
                                WHEN (pp.Precio_Medio_Mayoreo + (pp.Precio_Medio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100) < 0.60 
                                    THEN FLOOR((pp.Precio_Medio_Mayoreo + (pp.Precio_Medio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100)) + 0.50
                                ELSE CEIL((pp.Precio_Medio_Mayoreo + (pp.Precio_Medio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100))
                            END, 2
                        ) AS Precio_Medio_Mayoreo_Con_Impuestos_Redondeado,
                        FORMAT(
                            CASE 
                                WHEN (pp.Precio_Mayoreo + (pp.Precio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100) < 0.20 
                                    THEN FLOOR((pp.Precio_Mayoreo + (pp.Precio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100))
                                WHEN (pp.Precio_Mayoreo + (pp.Precio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100) < 0.60 
                                    THEN FLOOR((pp.Precio_Mayoreo + (pp.Precio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100)) + 0.50
                                ELSE CEIL((pp.Precio_Mayoreo + (pp.Precio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100))
                            END, 2
                        ) AS Precio_Mayoreo_Con_Impuestos_Redondeado
                    FROM 
                        Productos p
                    LEFT JOIN 
                        Inventario i ON p.ID = i.Producto
                    LEFT JOIN
                        Departamentos d ON p.Departamento = d.ID
                    LEFT JOIN
                        Precios_Producto pp ON p.ID = pp.Producto
                    LEFT JOIN
                        `Unidades de Venta` u ON p.Unidad = u.ID
                    WHERE 1 ";

        // Agregar filtro si se está buscando algo
        if (!empty($valorBusqueda)) {
            $sql .= " AND (p.Descripcion LIKE :busqueda OR p.Codigo LIKE :busqueda) ";
        }

        $sql .= " GROUP BY p.ID LIMIT :registros OFFSET :offset;";

        $query = $conexion->prepare($sql);
        $query->bindParam(':SucursalActual', $SucursalActual, PDO::PARAM_INT);
        if (!empty($valorBusqueda)) {
            $valorBusquedaParam = "%$valorBusqueda%";
            $query->bindParam(':busqueda', $valorBusquedaParam, PDO::PARAM_STR);
        }
        $query->bindParam(':registros', $registrosPorPagina, PDO::PARAM_INT);
        $query->bindParam(':offset', $offset, PDO::PARAM_INT);

        $query->execute();
        $productos = $query->fetchAll(PDO::FETCH_ASSOC);

        // Consulta para contar total de registros con búsqueda aplicada
        $countSql = "SELECT COUNT(DISTINCT p.ID) AS total
                         FROM Productos p
                         LEFT JOIN Inventario i ON p.ID = i.Producto
                         WHERE 1 ";

        if (!empty($valorBusqueda)) {
            $countSql .= " AND (p.Descripcion LIKE :busqueda OR p.Codigo LIKE :busqueda) ";
        }

        $countQuery = $conexion->prepare($countSql);
        if (!empty($valorBusqueda)) {
            $countQuery->bindParam(':busqueda', $valorBusquedaParam, PDO::PARAM_STR);
        }
        $countQuery->execute();
        $totalRegistros = $countQuery->fetch(PDO::FETCH_ASSOC)['total'];

        echo json_encode([
            'success' => true,
            'message' => 'Productos obtenidos exitosamente.',
            'data' => $productos,
            'totalRegistros' => $totalRegistros,
            'paginaActual' => $pagina,
            'registrosPorPagina' => $registrosPorPagina
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error al obtener los productos.',
            'error' => $e->getMessage()
        ]);
    }
}

function Obtener_Sucursales_Con_Nombre_Sucursal_Actual()
{
    try {
        $conexion = Conexion(true); // Asegúrate de que devuelve una instancia válida de PDO
        session_start();
        if (!$conexion) {
            throw new Exception("No se pudo conectar a la base de datos.");
        }

        $sql = "SELECT * FROM Sucursales";
        $query = $conexion->prepare($sql);
        $query->execute();
        $rows = $query->fetchAll(PDO::FETCH_ASSOC);

        // Obtener la sucursal actual desde la sesión
        $sucursalActualID = isset($_SESSION['ID_Sucursal']) ? $_SESSION['ID_Sucursal'] : null;
        $sucursalActualNombre = isset($_SESSION['Nombre_Sucursal']) ? $_SESSION['Nombre_Sucursal'] : null;

        if (empty($rows)) {
            echo json_encode([
                'success' => false,
                'message' => 'No hay resultados',
                'sucursalActualID' => $sucursalActualID, // ID de la sucursal actual
                'sucursalActualNombre' => $sucursalActualNombre // Nombre de la sucursal actual
            ]);
        } else {
            echo json_encode([
                'success' => true,
                'message' => 'Sucursales obtenidas exitosamente',
                'data' => $rows,
                'sucursalActualID' => $sucursalActualID, // ID de la sucursal actual
                'sucursalActualNombre' => $sucursalActualNombre // Nombre de la sucursal actual
            ]);
        }
    } catch (PDOException $e) {
        // Manejo de error de base de datos
        echo json_encode([
            'success' => false,
            'message' => 'Error en la base de datos.',
            'error' => $e->getMessage(),
            'sucursalActualID' => $sucursalActualID, // ID de la sucursal actual en caso de error
            'sucursalActualNombre' => $sucursalActualNombre // Nombre de la sucursal actual en caso de error
        ]);
    } catch (Exception $e) {
        // Manejo de errores generales
        echo json_encode([
            'success' => false,
            'message' => 'Ocurrió un error inesperado.',
            'error' => $e->getMessage(),
            'sucursalActualID' => $sucursalActualID, // ID de la sucursal actual en caso de error
            'sucursalActualNombre' => $sucursalActualNombre // Nombre de la sucursal actual en caso de error
        ]);
    }
}


function Obtener_Productos_Otra_Sucursal($data)
{
    try {
        // Conexión a la base de datos
        $conexion = Conexion(true);
        if (!$conexion) {
            throw new Exception("Error de conexión a la base de datos.");
        }

        // Validar que el parámetro 'sucursal' exista
        if (!isset($data['sucursal'])) {
            echo json_encode([
                'success' => false,
                'message' => 'Sucursal no especificada.'
            ]);
            return;
        }

        $SucursalID = intval($data['sucursal']); // Convertir a entero

        // Obtener parámetros de paginación
        $pagina = isset($data['pagina']) ? intval($data['pagina']) : 1;
        $registrosPorPagina = isset($data['registrosPorPagina']) ? intval($data['registrosPorPagina']) : 10;

        $offset = ($pagina - 1) * $registrosPorPagina;

        // Consulta principal
        $sql = "SELECT 
                    p.ID AS ProductoID,
                    p.Codigo,
                    p.Descripcion,
                    p.Departamento,
                    d.Nombre AS Departamento,
                    u.Descripcion AS Unidad,
                    p.Tipo,
                    FORMAT(p.`I.V.A.`, 2) AS IVA,
                    FORMAT(p.`I.E.P.S.`, 2) AS IEPS,
                    COALESCE(SUM(CASE WHEN i.Sucursal = :SucursalActual THEN i.Existencia ELSE 0 END), 0) AS ExistenciasSucursalActual,
                    COALESCE(SUM(CASE WHEN i.Sucursal != :SucursalActual THEN i.Existencia ELSE 0 END), 0) AS ExistenciasOtrasSucursales,
                    FORMAT(pp.Precio_Costo, 2) AS Precio_Costo_Sin_Impuestos,
                    FORMAT(
                        CASE 
                            WHEN (pp.Precio_Menudeo + (pp.Precio_Menudeo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100) < 0.20 
                                THEN FLOOR((pp.Precio_Menudeo + (pp.Precio_Menudeo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100))
                            WHEN (pp.Precio_Menudeo + (pp.Precio_Menudeo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100) < 0.60 
                                THEN FLOOR((pp.Precio_Menudeo + (pp.Precio_Menudeo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100)) + 0.50
                            ELSE CEIL((pp.Precio_Menudeo + (pp.Precio_Menudeo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100))
                        END, 2
                    ) AS Precio_Menudeo_Con_Impuestos_Redondeado,
                    FORMAT(
                        CASE 
                            WHEN (pp.Precio_Medio_Mayoreo + (pp.Precio_Medio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100) < 0.20 
                                THEN FLOOR((pp.Precio_Medio_Mayoreo + (pp.Precio_Medio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100))
                            WHEN (pp.Precio_Medio_Mayoreo + (pp.Precio_Medio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100) < 0.60 
                                THEN FLOOR((pp.Precio_Medio_Mayoreo + (pp.Precio_Medio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100)) + 0.50
                            ELSE CEIL((pp.Precio_Medio_Mayoreo + (pp.Precio_Medio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100))
                        END, 2
                    ) AS Precio_Medio_Mayoreo_Con_Impuestos_Redondeado,
                    FORMAT(
                        CASE 
                            WHEN (pp.Precio_Mayoreo + (pp.Precio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100) < 0.20 
                                THEN FLOOR((pp.Precio_Mayoreo + (pp.Precio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100))
                            WHEN (pp.Precio_Mayoreo + (pp.Precio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100) < 0.60 
                                THEN FLOOR((pp.Precio_Mayoreo + (pp.Precio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100)) + 0.50
                            ELSE CEIL((pp.Precio_Mayoreo + (pp.Precio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100))
                        END, 2
                    ) AS Precio_Mayoreo_Con_Impuestos_Redondeado
                FROM 
                    Productos p
                LEFT JOIN 
                    Inventario i ON p.ID = i.Producto
                LEFT JOIN
                    Departamentos d ON p.Departamento = d.ID
                LEFT JOIN
                    Precios_Producto pp ON p.ID = pp.Producto
                LEFT JOIN
                    `Unidades de Venta` u ON p.Unidad = u.ID
                GROUP BY 
                    p.ID
                LIMIT :registros OFFSET :offset;";

        $query = $conexion->prepare($sql);
        $query->bindParam(':SucursalActual', $SucursalID, PDO::PARAM_INT);
        $query->bindParam(':offset', $offset, PDO::PARAM_INT);
        $query->bindParam(':registros', $registrosPorPagina, PDO::PARAM_INT);

        $query->execute();
        $productos = $query->fetchAll(PDO::FETCH_ASSOC);

        // Total de productos
        $countSql = "SELECT COUNT(DISTINCT p.ID) AS total
                     FROM Productos p
                     LEFT JOIN Inventario i ON p.ID = i.Producto";
        $countQuery = $conexion->prepare($countSql);
        $countQuery->execute();
        $totalRegistros = $countQuery->fetch(PDO::FETCH_ASSOC)['total'];

        echo json_encode([
            'success' => true,
            'message' => 'Productos obtenidos exitosamente.',
            'data' => $productos,
            'totalRegistros' => $totalRegistros,
            'paginaActual' => $pagina,
            'registrosPorPagina' => $registrosPorPagina
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error al obtener los productos.',
            'error' => $e->getMessage()
        ]);
    }
}

function Obtener_Sucursal_Actual()
{
    // Asegurarse de que la sesión esté iniciada
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }

    if (!isset($_SESSION['ID_Sucursal']) || !isset($_SESSION['Nombre_Sucursal'])) {
        echo json_encode([
            'success' => false,
            'message' => 'No se ha iniciado sesión o faltan datos de la sucursal actual.'
        ]);
        return;
    }

    $sucursalActualID = $_SESSION['ID_Sucursal'];
    $sucursalActualNombre = $_SESSION['Nombre_Sucursal'];

    echo json_encode([
        'success' => true,
        'sucursalActualID' => $sucursalActualID,
        'sucursalActualNombre' => $sucursalActualNombre
    ]);
}

function Buscar_Productos_Con_Filtro($data)
{
    try {
        $conexion = Conexion(true);
        if (!$conexion) {
            throw new Exception("Error de conexión a la base de datos.");
        }

        $pagina = isset($data['pagina']) ? intval($data['pagina']) : 1;
        $registrosPorPagina = isset($data['registrosPorPagina']) ? intval($data['registrosPorPagina']) : 10;
        $offset = ($pagina - 1) * $registrosPorPagina;
        $sucursal = !empty($data['sucursal']) ? intval($data['sucursal']) : null;
        $opcion = $data['opcion'] ?? null;
        $subopcion = $data['subopcion'] ?? null;

        $filtrosSQL = " WHERE 1=1 ";
        $parametros = [];
        $ordenFecha = "";

        if ($opcion === 'Departamentos' && $subopcion) {
            $filtrosSQL .= " AND p.Departamento = :Subopcion ";
            $parametros[':Subopcion'] = (int)$subopcion;
        } elseif ($opcion === 'Unidades' && $subopcion) {
            $filtrosSQL .= " AND p.Unidad = :Subopcion ";
            $parametros[':Subopcion'] = (int)$subopcion;
        } elseif ($opcion === 'Tipo' && $subopcion) {
            $filtrosSQL .= " AND p.Tipo = :Subopcion ";
            $parametros[':Subopcion'] = $subopcion;
        } elseif ($opcion === 'IEPS' && $subopcion !== null) {
            $filtrosSQL .= " AND p.`I.E.P.S.` = :Subopcion ";
            $parametros[':Subopcion'] = (float)$subopcion;
        } elseif ($opcion === 'IVA' && $subopcion !== null) {
            $filtrosSQL .= " AND p.`I.V.A.` = :Subopcion ";
            $parametros[':Subopcion'] = (float)$subopcion;
        } elseif (($opcion === 'Modificacion' || $opcion === 'Creacion') && $subopcion) {
            $campoFecha = $opcion === 'Modificacion' ? 'p.Fecha_Modificacion' : 'p.Fecha_Registro';

            if ($subopcion === 'Más reciente') {
                $ordenFecha = " ORDER BY $campoFecha DESC ";
            } elseif ($subopcion === 'Más antigua') {
                $ordenFecha = " ORDER BY $campoFecha ASC ";
            }
        } elseif ($opcion === 'Existencias' && $subopcion) {
            if ($subopcion === 'ConExistencia') {
                $filtrosSQL .= " AND (SELECT SUM(Existencia) FROM Inventario WHERE Producto = p.ID) > 0 ";
            } elseif ($subopcion === 'SinExistencia') {
                $filtrosSQL .= " AND (SELECT SUM(Existencia) FROM Inventario WHERE Producto = p.ID) = 0 ";
            } elseif ($subopcion === 'BajoInventario') {
                $filtrosSQL .= " AND (SELECT SUM(Existencia) FROM Inventario WHERE Producto = p.ID) <= 5 ";
            }
        }

        // Total de registros
        $sqlTotal = "SELECT COUNT(DISTINCT p.ID) AS Total
                     FROM Productos p
                     LEFT JOIN Inventario i ON p.ID = i.Producto
                     LEFT JOIN Departamentos d ON p.Departamento = d.ID
                     LEFT JOIN Precios_Producto pp ON p.ID = pp.Producto
                     LEFT JOIN `Unidades de Venta` u ON p.Unidad = u.ID
                     $filtrosSQL";

        $queryTotal = $conexion->prepare($sqlTotal);
        foreach ($parametros as $clave => $valor) {
            $tipo = is_int($valor) ? PDO::PARAM_INT : PDO::PARAM_STR;
            $queryTotal->bindValue($clave, $valor, $tipo);
        }
        $queryTotal->execute();
        $totalRegistros = (int)$queryTotal->fetchColumn();

        // Consulta principal
        $sql = "SELECT 
                    p.ID AS ProductoID,
                    p.Codigo,
                    p.Descripcion,
                    p.Departamento,
                    d.Nombre AS Departamento,
                    u.Descripcion AS Unidad,
                    p.Tipo,
                    FORMAT(p.`I.V.A.`, 2) AS IVA,
                    FORMAT(p.`I.E.P.S.`, 2) AS IEPS,
                    COALESCE(SUM(CASE WHEN i.Sucursal = :SucursalActual THEN i.Existencia ELSE 0 END), 0) AS ExistenciasSucursalActual,
                    COALESCE(SUM(CASE WHEN i.Sucursal != :SucursalActual THEN i.Existencia ELSE 0 END), 0) AS ExistenciasOtrasSucursales,
                    FORMAT(pp.Precio_Costo, 2) AS Precio_Costo_Sin_Impuestos,
                    FORMAT(
                        CASE 
                            WHEN (pp.Precio_Menudeo + (pp.Precio_Menudeo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100) < 0.20 
                                THEN FLOOR((pp.Precio_Menudeo + (pp.Precio_Menudeo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100))
                            WHEN (pp.Precio_Menudeo + (pp.Precio_Menudeo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100) < 0.60 
                                THEN FLOOR((pp.Precio_Menudeo + (pp.Precio_Menudeo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100)) + 0.50
                            ELSE CEIL((pp.Precio_Menudeo + (pp.Precio_Menudeo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100))
                        END, 2
                    ) AS Precio_Menudeo_Con_Impuestos_Redondeado,
                    FORMAT(
                        CASE 
                            WHEN (pp.Precio_Medio_Mayoreo + (pp.Precio_Medio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100) < 0.20 
                                THEN FLOOR((pp.Precio_Medio_Mayoreo + (pp.Precio_Medio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100))
                            WHEN (pp.Precio_Medio_Mayoreo + (pp.Precio_Medio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100) < 0.60 
                                THEN FLOOR((pp.Precio_Medio_Mayoreo + (pp.Precio_Medio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100)) + 0.50
                            ELSE CEIL((pp.Precio_Medio_Mayoreo + (pp.Precio_Medio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100))
                        END, 2
                    ) AS Precio_Medio_Mayoreo_Con_Impuestos_Redondeado,
                    FORMAT(
                        CASE 
                            WHEN (pp.Precio_Mayoreo + (pp.Precio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100) < 0.20 
                                THEN FLOOR((pp.Precio_Mayoreo + (pp.Precio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100))
                            WHEN (pp.Precio_Mayoreo + (pp.Precio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100) < 0.60 
                                THEN FLOOR((pp.Precio_Mayoreo + (pp.Precio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100)) + 0.50
                            ELSE CEIL((pp.Precio_Mayoreo + (pp.Precio_Mayoreo * p.`I.E.P.S.`/100)) * (1 + p.`I.V.A.`/100))
                        END, 2
                    ) AS Precio_Mayoreo_Con_Impuestos_Redondeado
                FROM 
                    Productos p
                LEFT JOIN Inventario i ON p.ID = i.Producto
                LEFT JOIN Departamentos d ON p.Departamento = d.ID
                LEFT JOIN Precios_Producto pp ON p.ID = pp.Producto
                LEFT JOIN `Unidades de Venta` u ON p.Unidad = u.ID
                $filtrosSQL
                GROUP BY p.ID
                $ordenFecha
                LIMIT :registros OFFSET :offset";

        $query = $conexion->prepare($sql);

        foreach ($parametros as $clave => $valor) {
            $tipo = is_int($valor) ? PDO::PARAM_INT : PDO::PARAM_STR;
            $query->bindValue($clave, $valor, $tipo);
        }

        $query->bindValue(':SucursalActual', $sucursal, PDO::PARAM_INT);
        $query->bindValue(':registros', $registrosPorPagina, PDO::PARAM_INT);
        $query->bindValue(':offset', $offset, PDO::PARAM_INT);

        $query->execute();
        $productos = $query->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => true,
            'message' => 'Productos obtenidos exitosamente.',
            'data' => $productos,
            'totalRegistros' => $totalRegistros,
            'paginaActual' => $pagina,
            'registrosPorPagina' => $registrosPorPagina
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error al obtener los productos.',
            'error' => $e->getMessage()
        ]);
    }
}

function Buscar_Productos_Con_Filtro_Rango_Fecha($data)
{
    try {
        $conexion = Conexion(true);
        if (!$conexion) {
            throw new Exception("Error de conexión a la base de datos.");
        }

        $fechaInicio = $data['fechaInicio'] ?? null;
        $fechaFinal = $data['fechaFinal'] ?? null;
        $pagina = isset($data['pagina']) ? intval($data['pagina']) : 1;
        $registrosPorPagina = isset($data['registrosPorPagina']) ? intval($data['registrosPorPagina']) : 10;
        $offset = ($pagina - 1) * $registrosPorPagina;
        $sucursal = !empty($data['sucursal']) ? intval($data['sucursal']) : null;

        // Validar estructura de fechas
        if (!$fechaInicio || !$fechaFinal) {
            throw new Exception("Debe proporcionar 'fechaInicio' y 'fechaFinal'.");
        }

        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $fechaInicio) || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $fechaFinal)) {
            throw new Exception("Formato inválido de fechas. Debe ser YYYY-MM-DD.");
        }

        $campo = 'Fecha_Registro'; // O puedes usar 'Fecha_Modificacion' si lo deseas

        $filtrosSQL = " WHERE DATE(p.$campo) BETWEEN :FechaInicio AND :FechaFinal ";
        $ordenSQL = " ORDER BY p.$campo DESC ";

        // Total de registros
        $sqlTotal = "SELECT COUNT(DISTINCT p.ID) AS Total
                     FROM Productos p
                     $filtrosSQL";

        $queryTotal = $conexion->prepare($sqlTotal);
        $queryTotal->bindValue(':FechaInicio', $fechaInicio);
        $queryTotal->bindValue(':FechaFinal', $fechaFinal);
        $queryTotal->execute();
        $totalRegistros = (int)$queryTotal->fetchColumn();

        // Consulta de productos
        $sql = "SELECT 
                    p.ID AS ProductoID,
                    p.Codigo,
                    p.Descripcion,
                    p.Departamento,
                    d.Nombre AS Departamento,
                    u.Descripcion AS Unidad,
                    p.Tipo,
                    FORMAT(p.`I.V.A.`, 2) AS IVA,
                    FORMAT(p.`I.E.P.S.`, 2) AS IEPS,
                    COALESCE(SUM(CASE WHEN i.Sucursal = :SucursalActual THEN i.Existencia ELSE 0 END), 0) AS ExistenciasSucursalActual,
                    COALESCE(SUM(CASE WHEN i.Sucursal != :SucursalActual THEN i.Existencia ELSE 0 END), 0) AS ExistenciasOtrasSucursales,
                    FORMAT(pp.Precio_Costo, 2) AS Precio_Costo_Sin_Impuestos
                FROM Productos p
                LEFT JOIN Inventario i ON p.ID = i.Producto
                LEFT JOIN Departamentos d ON p.Departamento = d.ID
                LEFT JOIN Precios_Producto pp ON p.ID = pp.Producto
                LEFT JOIN `Unidades de Venta` u ON p.Unidad = u.ID
                $filtrosSQL
                GROUP BY p.ID
                $ordenSQL
                LIMIT :registros OFFSET :offset";

        $query = $conexion->prepare($sql);
        $query->bindValue(':FechaInicio', $fechaInicio);
        $query->bindValue(':FechaFinal', $fechaFinal);
        $query->bindValue(':SucursalActual', $sucursal, PDO::PARAM_INT);
        $query->bindValue(':registros', $registrosPorPagina, PDO::PARAM_INT);
        $query->bindValue(':offset', $offset, PDO::PARAM_INT);
        $query->execute();
        $productos = $query->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => true,
            'message' => 'Productos obtenidos por rango de fecha.',
            'data' => $productos,
            'totalRegistros' => $totalRegistros,
            'paginaActual' => $pagina,
            'registrosPorPagina' => $registrosPorPagina
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error al buscar productos por rango de fecha.',
            'error' => $e->getMessage()
        ]);
    }
}

function Obtener_Existencias_Producto($data)
{
    try {

        $conexion = Conexion(true); // Conexión a la base de datos

        if (!$conexion) {
            throw new Exception("No se pudo conectar a la base de datos.");
        }

        if (!isset($data)) {
            throw new Exception("ID de producto no especificado.");
        }

        $idProducto = $data;

        // Primero, obtener la información básica del producto
        $sqlProducto = "SELECT P.ID, P.Codigo, P.Descripcion
                        FROM Productos AS P
                        WHERE P.ID = :idProducto";

        $queryProducto = $conexion->prepare($sqlProducto);
        $queryProducto->bindParam(':idProducto', $idProducto, PDO::PARAM_INT);
        $queryProducto->execute();
        $producto = $queryProducto->fetch(PDO::FETCH_ASSOC);

        if (!$producto) {
            echo json_encode([
                'success' => false,
                'message' => 'Producto no encontrado.'
            ]);
            return;
        }

        // Obtener las existencias del producto en las diferentes sucursales
        $sqlExistencias = "SELECT 
        S.Nombre AS Sucursal, 
        I.Existencia, 
        I.`Última_actualización`
    FROM 
        Inventario AS I
    JOIN 
        Sucursales AS S ON I.Sucursal = S.ID
    WHERE 
        I.Producto = :idProducto";

        $queryExistencias = $conexion->prepare($sqlExistencias);
        $queryExistencias->bindParam(':idProducto', $idProducto, PDO::PARAM_INT);
        $queryExistencias->execute();
        $existencias = $queryExistencias->fetchAll(PDO::FETCH_ASSOC);

        // Formatear la fecha en cada resultado
        foreach ($existencias as &$fila) {
            if (!empty($fila['Última_actualización'])) {
                $fila['Última_actualización'] = date('d-m-Y H:i:s', strtotime($fila['Última_actualización']));
            }
        }
        unset($fila); // buena práctica al usar referencias

        // $existencias ahora tiene fechas formateadas

        if (empty($existencias)) {
            echo json_encode([
                'success' => false,
                'message' => 'No hay existencias registradas para este producto.',
                'producto' =>  $producto
            ]);
        } else {
            // Combinar la información del producto con las existencias
            echo json_encode([
                'success' => true,
                'message' => 'Información del producto y existencias obtenidas correctamente.',
                'producto' => $producto,
                'existencias' => $existencias
            ]);
        }
    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error en la base de datos.',
            'error' => $e->getMessage()
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Ocurrió un error inesperado.',
            'error' => $e->getMessage()
        ]);
    }
}

function Eliminar_Producto($data)
{
    try {
        // Obtener el ID del producto
        $id_producto = isset($data) ? intval($data) : 0;

        // Validar ID
        if ($id_producto <= 0) {
            echo json_encode(['success' => false, 'message' => 'ID de producto inválido.']);
            return;
        }

        // Conexión a la base de datos
        $conexion = Conexion(true); // Conexión a la base de datos

        // Preparar y ejecutar el llamado al procedimiento almacenado
        $stmt = $conexion->prepare("CALL Eliminar_Producto(:productoID)");
        $stmt->bindParam(':productoID', $id_producto, PDO::PARAM_INT);
        $stmt->execute();

        // Revisar si se generó algún mensaje de error dentro del procedimiento
        $errorInfo = $stmt->errorInfo();
        if ($errorInfo[0] != '00000') { // Si no es un código de éxito
            echo json_encode([
                'success' => false,
                'message' => $errorInfo[2] // El mensaje de error desde la base de datos
            ]);
        } else {
            echo json_encode(['success' => true, 'message' => 'Producto procesado correctamente.']);
        }

    } catch (PDOException $e) {
        // Manejo de errores
        echo json_encode([
            'success' => false,
            'message' => 'Error en la base de datos: ' . $e->getMessage()
        ]);
    }
}

