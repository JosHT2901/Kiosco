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
        if (empty($data['Nombre'])) {
            $respuesta = 'Ingresa el nombre';
        } else if (empty($data['Calle'])) {
            $respuesta = 'Ingresa la calle del domicilio de la sucursal';
        } else if (empty($data['Numero_Exterior'])) {
            $respuesta = 'Ingresa el número exterior del domicilio de la sucursal';
        }
        if (trim($data['Numero_Interior']) === "") {
            echo "Ingresa el número interior del domicilio de la sucursal";
        } else if (empty($data['Codigo_Postal'])) {
            $respuesta = 'Ingresa el código postal del domicilio de la sucursal';
        } else if (empty($data['Colonia'])) {
            $respuesta = 'Selecciona la colonia del domicilio de la sucursal';
        } else if (empty($data['Municipio'])) {
            $respuesta = 'Ingresa el municipio del domicilio de la sucursal';
        } else if (empty($data['Estado'])) {
            $respuesta = 'Ingresa el estado del domicilio de la sucursal';
        } else {
            $nombre = $data['Nombre'];
            $calle = $data['Calle'];
            $numeroExterior = $data['Numero_Exterior'];
            $numeroInterior = $data['Numero_Interior'];
            $codigoPostal = $data['Codigo_Postal'];
            $colonia = $data['Colonia'];
            $municipio = $data['Municipio'];
            $estado = $data['Estado'];
            $telefono = $data['Telefono'];
            $sql = "SELECT * FROM Sucursales 
        WHERE Calle = ? AND Numero_Exterior = ? AND Codigo_Postal = ? AND Colonia = ?
        LIMIT 1";
            $query = Conexion(true)->prepare($sql);
            $query->bindParam(1, $calle);
            $query->bindParam(2, $numeroExterior);
            $query->bindParam(3, $codigoPostal);
            $query->bindParam(4, $colonia);
            $query->execute();
            if ($query->rowCount() > 0) {
                $respuesta = 'Esta sucursal ya está registrada';
            } else {
                $sql = "INSERT INTO Sucursales 
            (Nombre, Calle, Numero_Exterior, Numero_Interior, Codigo_Postal, Colonia, Municipio, Estado, Telefono)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
                $insert = Conexion(true)->prepare($sql);
                $insert->bindParam(1, $nombre);
                $insert->bindParam(2, $calle);
                $insert->bindParam(3, $numeroExterior);
                $insert->bindParam(4, $numeroInterior);
                $insert->bindParam(5, $codigoPostal);
                $insert->bindParam(6, $colonia);
                $insert->bindParam(7, $municipio);
                $insert->bindParam(8, $estado);
                $insert->bindParam(9, $telefono);

                $insert->execute();
                $respuesta = "Sucursal registrada con éxito.";
            }
        }
        echo json_encode($respuesta);
    } catch (PDOException $e) {
        echo "Error en la base de datos: " . $e->getMessage();
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
                "mensaje" => "No se puede eliminar el departamento porque tiene productos asociados."
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
            "mensaje" => "Departamento eliminado exitosamente."
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            "success" => false,
            "mensaje" => "Error al eliminar: " . $e->getMessage()
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
                'mensaje' => 'Departamento no encontrado.'
            ]);
        }
    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'mensaje' => 'Error al obtener el departamento: ' . $e->getMessage()
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
