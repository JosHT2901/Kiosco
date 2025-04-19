let imagenError = '../../icons/windows/exclamacion.png'
limitarCaracteres("#InputNombreNuevaSucursal", 50)
limitarCaracteres("#InputCalleNuevaSucursal", 50)
limitarCaracteres("#InputNumeroExteriorNuevaSucursal", 10)
soloNumeros("#InputNumeroExteriorNuevaSucursal")
limitarCaracteres("#InputNumeroInteriorNuevaSucursal", 10)
soloNumeros("#InputNumeroInteriorNuevaSucursal")

limitarCaracteres("#InputCodigoPostalNuevaSucursal", 5)
soloNumeros("#InputCodigoPostalNuevaSucursal")

limitarCaracteres($("#InputTelefonoNuevaSucursal"), 10)
soloNumeros("#InputTelefonoNuevaSucursal")

$("#InputTelefonoNuevaSucursal").on('blur', function () {
    $(this).val(FormatearTelefono($(this).val()))
});

$("#InputTelefonoNuevaSucursal").on('focus', function () {

    $(this).val(LimpiarTelefono($(this).val()));
});
$("#InputCodigoPostalNuevaSucursal").on('input', function () {
    const valor = $(this).val();

    if (valor.length === 5) {
        MostrarModal(ComponerModalCargando('Cargando', 'auto', '400px'), false)
        BuscarCodigoPostal(valor, function (resultado) {
            if (resultado === null) {
                contenido = ComponerContenidoAdvertencia('../../icons/windows/error.png', 'Error', 'Error al cargar');
                MostrarModal(contenido, false)
                setTimeout(() => {
                    CerrarModal()
                }, 2000);
            }

            if (resultado.length === 0) {
                contenido = ComponerContenidoAdvertencia('../../icons/windows/error.png', 'Error', 'Código no encontrado');
                MostrarModal(contenido, false)
                setTimeout(() => {
                    CerrarModal()
                }, 1000);
            } else if (resultado.length === 1) {
                CerrarModal()
                resultado = resultado[0]
                $("#SpanLocalidadNuevaSucursal").html(resultado.Localidad)
                $("#InputLocalidadNuevaSucursal").val(resultado.Localidad)
                $("#SpanMunicipioNuevaSucursal").html(resultado.Municipio)
                $("#InputMunicipioNuevaSucursal").val(resultado.Municipio)
                $("#SpanEntidadNuevaSucursal").html(resultado.Estado)
                $("#InputEntidadNuevaSucursal").val(resultado.Estado)
            } else {
                var localidades = [];
                CerrarModal()
                resultado.forEach((r, index) => {
                    localidades.push(r.Localidad)
                })
                $("#SpanLocalidadNuevaSucursal").html('Selecciona...')
                $("#SpanMunicipioNuevaSucursal").html(resultado[0].Municipio)
                $("#InputMunicipioNuevaSucursal").val(resultado[0].Municipio)
                $("#SpanEntidadNuevaSucursal").html(resultado[0].Estado)
                $("#InputEntidadNuevaSucursal").val(resultado[0].Estado)
                SetContainerOpciones($("#ContenedorLocalidadesNuevaSucursal").parent(), localidades, 'OpcionesLocalidades');
                $('#contenedor-opciones li').on('click', function () {
                    const textoSeleccionado = $(this).text().trim();
                    $("#SpanLocalidadNuevaSucursal").html(textoSeleccionado)
                    $("#InputLocalidadNuevaSucursal").val(textoSeleccionado)
                    $('#contenedor-opciones').remove();
                })
            }

        });
    }
})

$("#BotonGuardarInformacionNuevaSucursal").click(function (e) {
    if ($("#InputNombreNuevaSucursal").val().length == 0) {
        contenido = ComponerContenidoAdvertencia(imagenError, 'Verifica', 'Ingresa un nombre para la sucursal');
        MostrarModal(contenido);
    } else if ($("#InputCalleNuevaSucursal").val().length == 0) {
        contenido = ComponerContenidoAdvertencia(imagenError, 'Verifica', 'Ingresa la calle del domicilio de la sucursal');
        MostrarModal(contenido);
    }
    else if ($("#InputNumeroExteriorNuevaSucursal").val().length == 0) {
        contenido = ComponerContenidoAdvertencia(imagenError, 'Verifica', 'Ingresa el número exterior del domicilio');
        MostrarModal(contenido);
    }
    else if ($("#InputCodigoPostalNuevaSucursal").val().length == 0) {
        contenido = ComponerContenidoAdvertencia(imagenError, 'Verifica', 'Ingresa el código postal del domicilio');
        MostrarModal(contenido);
    }
    else if($("#InputLocalidadNuevaSucursal").val().length==0)
    {
        contenido = ComponerContenidoAdvertencia(imagenError, 'Verifica', 'Ingresa o selecciona una localidad');
        MostrarModal(contenido);
    }
    else if($("#InputMunicipioNuevaSucursal").val().length==0 )
    {
        contenido = ComponerContenidoAdvertencia(imagenError, 'Verifica', 'Falta seleccionar un municipio');
        MostrarModal(contenido);
    }
    else if($("#InputEntidadNuevaSucursal").val().length==0)
    {
        contenido = ComponerContenidoAdvertencia(imagenError, 'Verifica', 'Falta seleccionar un estado');
        MostrarModal(contenido);
    }
    else if($("#InputTelefonoNuevaSucursal").val().length==0)
    {
        contenido = ComponerContenidoAdvertencia(imagenError, 'Verifica', 'Ingresa un número de teléfono');
        MostrarModal(contenido);
    }
    else if(LimpiarTelefono(($("#InputTelefonoNuevaSucursal").val())).length < 10)
    {
        contenido = ComponerContenidoAdvertencia(imagenError, 'Verifica', 'Ingresa un número de teléfono a 10 digitos');
        MostrarModal(contenido);
    }
    else
    {
        MostrarModal(ComponerModalCargando('Guardando...', 'auto', '400px'), false)
        var nombre, calle, noExterior, noInterior=0, CodigoPostal, Colonia, Municipio, Estado, Telefono
        nombre=$("#InputNombreNuevaSucursal").val().trim()
        calle=$("#InputCalleNuevaSucursal").val().trim()
        noExterior=$("#InputNumeroExteriorNuevaSucursal").val().trim()
        if($("#InputNumeroInteriorNuevaSucursal").val().length!=0)
        {
            noInterior=$("#InputNumeroInteriorNuevaSucursal").val().trim()
        }
        CodigoPostal=$("#InputCodigoPostalNuevaSucursal").val().trim()
        Colonia=$("#InputLocalidadNuevaSucursal").val().trim()
        Municipio=$("#InputMunicipioNuevaSucursal").val().trim()
        Estado=$("#InputEntidadNuevaSucursal").val().trim()
        Telefono=LimpiarTelefono($("#InputTelefonoNuevaSucursal").val().trim())
        const data = {
            accion: 'Nueva_Sucursal',
            data: {
                'Nombre': nombre,
                'Calle': calle,
                'Numero_Exterior':noExterior,
                'Numero_Interior':noInterior,
                'Codigo_Postal':CodigoPostal,
                'Colonia':Colonia,
                'Municipio':Municipio,
                'Estado':Estado,
                'Telefono':Telefono
            }
        };
        
        ajaxConParametros(undefined, data)
        .then(response => {
            response=JSON.parse(response)
            if(response=='Sucursal registrada con éxito.')
            {
                contenido = ComponerContenidoAdvertencia('../../icons/windows/check.png', 'Listo', 'Sucursal registrada correctamente');
                MostrarModal(contenido, false)
                setTimeout(() => {
                    CerrarModal()
                    CerrarModalPadre()
                    window.parent.InicializarPaginaSeleccionarSucursal()
                }, 1000);
            }
            else if(response=='Esta sucursal ya está registrada')
            {
                contenido = ComponerContenidoAdvertencia('../../icons/windows/exclamacion.png', 'Error', 'Esta sucursal ya está registrada');
                console.log(response)
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