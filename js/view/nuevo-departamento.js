
limitarCaracteres("#InputNombreNuevoDepartamento")

$("#BotonGuardarInformacionNuevoDepartamento").click(function(e)
{
    if ($("#InputNombreNuevoDepartamento").val().length == 0) {
        contenido = ComponerContenidoAdvertencia('../../icons/windows/exclamacion.png', 'Verifica', 'Ingresa un nombre para el nuevo departamento');
        MostrarModal(contenido);
    }
    else if($("#InputNombreNuevoDepartamento").val().length < 3)
    {
        contenido = ComponerContenidoAdvertencia('../../icons/windows/exclamacion.png', 'Verifica', 'Ingresa un nombre válido para el nuevo departamento');
        MostrarModal(contenido);
    }
    else
    {
        var nombre=$("#InputNombreNuevoDepartamento").val().trim()
        MostrarModal(ComponerModalCargando('Guardando...', 'auto', '400px'), false)
        const data = {
            accion: 'Nuevo_departamento',
            data: nombre
        };
        
        ajaxConParametros(undefined, data)
        .then(response => {
            response=JSON.parse(response)
            if(response=='Departamento registrado con éxito.')
            {
                contenido = ComponerContenidoAdvertencia('../../icons/windows/check.png', 'Listo', 'Departamento registrado correctamente');
                MostrarModal(contenido, false)
                setTimeout(() => {
                    CerrarModal()
                    window.parent.InicializarPaginaDepartamentos()
                }, 1000);
            }
            else if(response=='Este departamento ya está registrado')
            {
                contenido = ComponerContenidoAdvertencia('../../icons/windows/exclamacion.png', 'Error', 'Este departamento ya está registrado');
                verificado = false
                MostrarModal(contenido, false)
                setTimeout(() => {
                    CerrarModal()
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
    }
})