<?php
include_once "data-base.php";
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
function Enviar_Mensaje_Codigo_Solo_Uso($tipo)
{
    session_start();
    try {
        $SQL = "
        SELECT 
            Usuarios.*, 
            Codigo_de_un_solo_uso.*
        FROM 
            Usuarios
        INNER JOIN 
            Codigo_de_un_solo_uso 
            ON Codigo_de_un_solo_uso.Usuario = Usuarios.ID
        WHERE 
            Usuarios.ID = ? 
            AND Codigo_de_un_solo_uso.Tipo = ? 
            AND (Codigo_de_un_solo_uso.Usado = 0)";    
        $query = Conexion(true)->prepare($SQL);
        $query->bindValue(1, $_SESSION['Usuario_ID']);
        $query->bindValue(2, $tipo);
        $query->execute();
        $resultados = $query->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        echo $e->getMessage();
    } catch (Exception $e) {
        echo 'Excepción capturada: ',  $e->getMessage(), "\n";
    }
    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    try {
        //Server settings
        $mail->SMTPDebug = 0;                     //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.ionos.mx';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'no-reply@tiendas-etcetera.com';                     //SMTP username
        $mail->Password   = 'Hola$290105';                               //SMTP password
        $mail->SMTPSecure = "tls";            //Enable implicit TLS encryption
        $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        //Recipients
        $mail->setFrom('no-reply@tiendas-etcetera.com', 'Etcétera de México');
        $mail->addAddress($resultados[0]['Correo'],$resultados[0]['Nombre'] . ' ' .  $resultados[0]['Apellido_Paterno'] . ' ' . $resultados[0]['Apellido_Materno']);     //Add a recipient
        $fecha_expiracion=new DateTime($resultados[0]['Fecha_Expiración']);
        $fecha_expiracion = $fecha_expiracion->format('H:i:s');

        //Content
        $mail->isHTML(true);                   //Set email format to HTML
        $mail->Subject = 'Código de un solo uso';
        $mensaje = '<!DOCTYPE html>
        <html class="contenedor">
        
        <head>
        <style>
            @font-face {
                font-family: "MuseoModerno";
                src: url("fonts/Montserrat/Montserrat-Regular.ttf");
            }
    
            * {
                font-family: "MuseoModerno";
            }
    
            .flex {
                display: flex;
                justify-content: center;
                align-items: center;
            }
    
            .flex-left {
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }
    
            .contenedor-principal {
                width: 100%;
                height:auto;
                padding:10px 0px;
            }

            .altura-60-por-ciento {
                height: 60%;
            }
    
            .contenedor-cuerpo-mensaje {
                width: 75%;
                margin: 10px auto;
                background-color: white;
                padding: 20px;
            }
    
            .titulo-verificacion-correo {
                height: auto;
                font-size: 2rem;
                font-weight:700;
            }
    
            .contenedor-destinatario {
                height: 25px;
                margin: 30px 0px;
                font-size: 1.1rem;
                font-weight: 600;
            }
    
            .encabezado-mensaje {
                height: auto;
                margin: 20px auto;
                font-size:1rem;
            }
    
            .instrucciones-mensaje {
                height: auto;
                margin: 20px auto;
                font-size:1rem;
            }
    
            .contenedor-codigo {
                height: 70px;
                font-size: 2.75rem;
                margin: 20px auto;
                color: #03618d;
                letter-spacing: 3px;
            }
            .contenedor-solititud-error
            {
                height: auto;
                margin: 10px auto;
                font-size:1rem;
            }
            .contenedor-atentamente
            {
                height: 30px;
                font-size: 1rem;
                font-weight: 600;
            }
            .contenedor-remitente
            {
                height: 40px;
                font-size: 1rem;
            }
            .black
            {
                color:black;
            }
            .contenedor-tiempo-codigo
            {
                border-radius:50px;
                margin:10px 5px;
                background-color:#c7e0f4;
                padding:10px;
                color:#03618d;
            }
        </style>
    </head>
    
    <body>
        <div class="contenedor-principal">
         
            <div class="contenedor-cuerpo-mensaje">
                <div class="titulo-verificacion-correo flex black">
                    <span>Código de un solo uso</span>
                </div>
                <div class="contenedor-destinatario flex-left  black">
                    <span>Hola ' . $resultados[0]['Nombre'] . ' ' .  $resultados[0]['Apellido_Paterno'] . ' ' . $resultados[0]['Apellido_Materno'] . ':</span>
                </div>
                <div class="encabezado-mensaje flex-left  black">
                    <span>Recibimos tu solicitud de un código de un solo uso.
                    </span>
                </div>
                <div class="instrucciones-mensaje flex-left  black">
                    <span>Tu código de un solo uso es:
                    </span>
                </div>
                <div class="contenedor-codigo flex">
                    <span>' .  $resultados[0]['Codigo'] . '</span>
                </div>
                <div class="contenedor-solititud-error black flex">
                    <span>Si tú no solicitaste este código, puedes hacer caso omiso de este mensaje de correo electrónico. Otra persona puede haber escrito tu dirección de correo electrónico por error.</span>
                </div>
                <div class="contenedor-solititud-error black flex">
                <span>Por favor no compartas este código con nadie</span>
            </div>
                  <div class="contenedor-tiempo-codigo black flex">
                    <span>Ten en cuenta que este código solo es válido hasta las '.$fecha_expiracion.'</span>
                </div>
                <div class="contenedor-atentamente flex  black">
                    <span>Atentamente</span>
                </div>
                <div class="contenedor-remitente flex  black">
                    <span>Equipo de Tiendas Etcétera de México S.A.S. de C.V.</span></div>
            </div>
    
    
        </div>
    </body>
    
    </html>';
        $mail->Body = $mensaje;
        $mail->send();
        echo json_encode('Correo enviado exitosamente');
    } catch (Exception $e) {
        if (strpos($mail->ErrorInfo, 'SMTP Error:') !== false) {
            echo  json_encode('Hubo un problema al conectar con el servidor de correo. Por favor, inténtalo de nuevo más tarde');
        } elseif (strpos($mail->ErrorInfo, 'Requested action not taken: mailbox unavailable') !== false) {
            echo  json_encode('No se pudo entregar el correo porque la dirección de destino no está disponible. Verifica la dirección de correo electrónico e inténtalo de nuevo');
        } elseif (strpos($mail->ErrorInfo, 'Authentication Failed') !== false) {
            echo  json_encode('No se pudo autenticar tu cuenta de correo. Verifica tus credenciales y vuelve a intentarlo');
        } else {
            // Si no se reconoce el error, mostramos un mensaje genérico
            echo  json_encode('Ocurrió un error al intentar enviar el correo. Por favor, inténtalo de nuevo más tarde');
        }
    }
}
