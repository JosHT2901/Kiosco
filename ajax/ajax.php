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
            $respuesta = 'Ingresa el usuario';
        } else if (empty($data['Password'])) {
            $respuesta = 'Ingresa la contraseña o el PIN';
        } else {
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

                // Verificamos si la contraseña proporcionada coincide con la almacenada
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
                    $_SESSION['Activo'] = false;

                    $respuesta = "Inicio correcto";
                } else {
                    $respuesta = "Contraseña o PIN incorrecto.";
                }
            } else {
                $respuesta = "Este usuario no está registrado o está deshabilitado.";
            }
        }

        echo json_encode($respuesta);
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    } catch (Exception $e) {
        echo json_encode(['error' => 'Excepción capturada: ' . $e->getMessage()]);
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
            echo json_encode('No hay resultados');
        } else {
            echo json_encode($rows);
        }
    } catch (PDOException $e) {
        // Puedes redirigir o mostrar un error
        echo "Error en la base de datos: " . $e->getMessage();
        exit;
    }
}

function Seleccionar_sucursal($data)
{
    try {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        if (isset($data['ID']) && isset($data['Nombre'])) {
            $_SESSION['Activo'] = true;
            $_SESSION['ID_Sucursal'] = $data['ID'];
            $_SESSION['Nombre_Sucursal'] = $data['Nombre'];
            echo json_encode('Información guardada');
        } else {
            echo json_encode('Datos incompletos');
        }
    } catch (PDOException $e) {
        // Puedes redirigir o mostrar un error
        echo "Error en la base de datos: " . $e->getMessage();
        exit;
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

function Obtener_Productos()
{
    
}