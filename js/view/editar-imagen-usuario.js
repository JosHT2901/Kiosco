let croppieUsuario;
$(document).ready(function (e) {
    MostrarModal(
        ComponerModalCargando('Obteniendo información', 'auto', '400px'),
        false
    );
    const data = {
        accion: 'Obtener_Imagen_Usuario'
    };
    ajaxConParametros(undefined, data)
        .then(response => {
            response = JSON.parse(response)
            console.log(response)
            if (response.success) {
                CerrarModal()
                ProcesarInformacionBaseDatosEditarImagen(response)
                EventosBotonesImagenUsuario()
            } else {
                contenido = ComponerContenidoAdvertencia('../../icons/windows/eliminar.png', 'Error', 'Intenta más tarde');
                console.log(response.message)
                MostrarModal(contenido, false)
                setTimeout(() => {
                    CerrarModalPadre()
                }, 1000);
            }
        })
        .catch(error => {
            contenido = ComponerContenidoAdvertencia('../../icons/windows/eliminar.png', 'Error', 'Intenta más tarde');
            MostrarModal(contenido, false)
            console.log(error)
        })
})

function ProcesarInformacionBaseDatosEditarImagen(response) {

    if (response.ruta != "../images/other/usuario.jpg") {
        $("#ContenedorBotonEliminarImagen").html(`
            <a class="boton altura-35-px padding-10px-lateral boton-secundario border-1-px-6d6d6d76 flex flex-center font-09-rem  position-relative borde-redondeado-5-px" id="BotonEliminarImagenUsuario">
                    <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.5 6a1 1 0 0 1-.883.993L20.5 7h-.845l-1.231 12.52A2.75 2.75 0 0 1 15.687 22H8.313a2.75 2.75 0 0 1-2.737-2.48L4.345 7H3.5a1 1 0 0 1 0-2h5a3.5 3.5 0 1 1 7 0h5a1 1 0 0 1 1 1Zm-7.25 3.25a.75.75 0 0 0-.743.648L13.5 10v7l.007.102a.75.75 0 0 0 1.486 0L15 17v-7l-.007-.102a.75.75 0 0 0-.743-.648Zm-4.5 0a.75.75 0 0 0-.743.648L9 10v7l.007.102a.75.75 0 0 0 1.486 0L10.5 17v-7l-.007-.102a.75.75 0 0 0-.743-.648ZM12 3.5A1.5 1.5 0 0 0 10.5 5h3A1.5 1.5 0 0 0 12 3.5Z" />
                        </svg>
                    </div>
                    <div class="altura-100-por-ciento padding-10px-lateral flex flex-center">
                        <span>Eliminar imagen</span>
                    </div>
            </a>`)
        console.log(response)
        InicializarCroppie(response.ruta)
        $("#BotonEliminarImagenUsuario").click(function (e) {
            EliminarImagenUsuario()
        })
    } else {
        $("#ContenedorBotonEliminarImagen").empty()
    }
}

function EventosBotonesImagenUsuario() {
    $("#BotonCargarImagenUsuario").click(function () {
        $("#InputImagenUsuario").click(); // Abrir selector de archivos
    });

    $("#InputImagenUsuario").on("change", function (e) {
        const archivo = e.target.files[0];
        if (!archivo) return;

        const esImagen = archivo.type.match('image.*');
        const maxSizeMB = 3;
        const maxSizeBytes = maxSizeMB * 1024 * 1024;

        if (!esImagen) {
            const contenido = ComponerContenidoAdvertencia('../../icons/windows/eliminar.png', 'Error', 'El archivo seleccionado no es una imagen válida.');
            MostrarModal(contenido, true);
            return;
        }

        if (archivo.size > maxSizeBytes) {
            const contenido = ComponerContenidoAdvertencia('../../icons/windows/eliminar.png', 'Error', 'La imagen no debe superar los 3MB');
            MostrarModal(contenido, true);
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            InicializarCroppie(event.target.result);
        };

        reader.readAsDataURL(archivo);
    });

    $("#BotonRotarImagenIzquierda").click(function (e) {
        if (croppieUsuario) {
            croppieUsuario.croppie('rotate', -90);
        }
    })

    $("#BotonRotarImagenDerecha").click(function (e) {
        if (croppieUsuario) {
            croppieUsuario.croppie('rotate', 90);
        }
    })
    $("#BotonGuardarImagenUsuario").click(function (e) {
        e.preventDefault();

        if (croppieUsuario) {
            MostrarModal(
                ComponerModalCargando('Guardando', 'auto', '400px'),
                false
            );
            croppieUsuario.croppie('result', {
                type: 'base64',
                format: 'jpeg',
                quality: 1
            }).then(function (base64) {
                var data = {
                    data: base64,
                    accion: 'Guardar_Imagen_Usuario'
                }
                ajaxConParametros(undefined, data)
                    .then(response => {
                        response = JSON.parse(response)
                        if (response.success) {
                            contenido = ComponerContenidoAdvertencia('../../icons/windows/check.png', 'Listo', 'Imagen guardada correctamente');
                            MostrarModal(contenido, false)
                            console.log(response)
                            setTimeout(() => {
                                CerrarModal()
                                CerrarModalPadre()
                                var $divPadre = $(window.parent.document).find('#ContenedorImagenUsuario');
                                $divPadre.html(`<img src="../../images/usuarios/${response.imagen}" class="altura-100-por-ciento anchura-100-por-ciento borde-redondeado-50-por-ciento">`)
                            }, 1000);
                        } else {
                            const contenido = ComponerContenidoAdvertencia(
                                '../../icons/windows/exclamacion.png',
                                'Error',
                                response.message
                            );
                            console.error(response.message);
                            MostrarModal(contenido, false);
                            setTimeout(() => {
                                CerrarModal();
                            }, 1000);
                        }
                    })
                    .catch(error => {
                        const contenido = ComponerContenidoAdvertencia(
                            '../../icons/windows/eliminar.png',
                            'Error',
                            'Intenta más tarde'
                        );
                        console.error(error);
                        MostrarModal(contenido, false);
                        setTimeout(() => {
                            CerrarModal();
                        }, 1000);
                    });

            });
        } else {
            contenido = ComponerContenidoAdvertencia('../../icons/windows/eliminar.png', 'Error', 'Carga una imagen');
            MostrarModal(contenido, false)
            setTimeout(() => {
                CerrarModal()
            }, 1000);
        }
    });

}

function InicializarCroppie(imagenFuente) {
    if (croppieUsuario) {
        croppieUsuario.croppie('destroy');
    }

    const medida = 205;

    croppieUsuario = $('#ContenedorCroppieEditarImagenUsuario').croppie({
        viewport: {
            width: medida,
            height: medida,
            type: 'circle'
        },
        boundary: {
            width: medida,
            height: medida
        },
        enableOrientation: true
    });

    // Detectar si es base64
    const esBase64 = imagenFuente.startsWith('data:image');
    let fuenteFinal = imagenFuente;

    if (!esBase64) {
        // Asegurar que la ruta inicie desde la raíz del proyecto
        fuenteFinal = window.location.origin + '/Kiosco/' + imagenFuente.replace(/^(\.\/|\.\.\/)+/, '');
    }

    croppieUsuario.croppie('bind', {
        url: fuenteFinal
    })
}

function EliminarImagenUsuario()
{
    MostrarModal(ComponerModalPregunta('Eliminar imagen', 'Esta accion no se puede deshacer', 'auto', '400px'), false);
        $('#BotonCancelarAccionModal').on('click', function (e) {
            CerrarModal()
        });
        $('#BotonConfirmarAccionModal').on('click', function (e) {
            MostrarModal(ComponerModalCargando('Eliminando', 'auto', '400px'), false)
            const data = {
                accion: 'Eliminar_Imagen_Usuario'
            };

            ajaxConParametros(undefined, data)
                .then(response => {
                    response=JSON.parse(response)
                    if (response.success) {
                        contenido = ComponerContenidoAdvertencia('../../icons/windows/check.png', 'Listo', 'Imagen eliminada correctamente');
                        MostrarModal(contenido, false)
                        setTimeout(() => {
                            CerrarModal()
                            croppieUsuario.croppie('destroy');
                            $("#BotonEliminarImagenUsuario").remove()
                            var $divPadre = $(window.parent.document).find('#ContenedorImagenUsuario');
                            $divPadre.html(`<img src="../../images/other/usuario.jpg" class="altura-100-por-ciento anchura-100-por-ciento borde-redondeado-50-por-ciento">`)
                        }, 1000);
                    } else {
                        const contenido = ComponerContenidoAdvertencia(
                            '../../icons/windows/exclamacion.png',
                            'Error',
                            response.message
                        );
                        MostrarModal(contenido, false);
                        setTimeout(() => {
                            CerrarModal();
                        }, 1000);
                    }
                })
                .catch(error => {
                    contenido = ComponerContenidoAdvertencia('../../icons/windows/eliminar.png', 'Error', 'Intenta más tarde');
                    console.log(error)
                    MostrarModal(contenido, false)
                    setTimeout(() => {
                        CerrarModal()
                    }, 1000);
                })
        });
}