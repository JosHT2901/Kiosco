var unidadesMedida = []
$(document).ready(function () {
    // Mostrar modal de carga
    MostrarModal(
        ComponerModalCargando('Obteniendo información', 'auto', '400px'),
        false
    );

    // Cargar el JSON de unidades
    fetch('../../json/unidades.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            unidadesMedida = Array.isArray(data) ? data : [];
            CerrarModal()
            const $select = $("#SelectBuscarUnidadMedida");

            // Limpiamos el select primero (opcional)
            $select.empty();
            $select.append(new Option('-- Selecciona una unidad --', ''));
            unidadesMedida.forEach(unidad => {
                const texto = unidad.simbolo ?
                    `${unidad.nombre} (${unidad.simbolo})` :
                    unidad.nombre;

                $select.append(new Option(texto, unidad.id));

            });
            $select.select2({
                placeholder: 'Buscar unidad de medida...',
                allowClear: true
            });
        })
        .catch((error) => {
            contenido = ComponerContenidoAdvertencia('../../icons/windows/eliminar.png', 'Error', 'Intenta más tarde');
            console.log(error)
            MostrarModal(contenido, false)
            setTimeout(() => {
                CerrarModal()
            }, 1000);
        });
});

$("#BotonGuardarInformacionNuevaUnidad").click(function (e) {
    const $select = $("#SelectBuscarUnidadMedida");
    const valorSeleccionado = $select.val();
    if (!valorSeleccionado) {
        contenido = ComponerContenidoAdvertencia('../../icons/windows/error.png', 'Error', 'Selecciona una unidad de medida');
        MostrarModal(contenido);
    } else {
        var nombre = $select.find("option:selected").text();
        MostrarModal(ComponerModalCargando('Guardando', 'auto', '400px'), false)
        const data = {
            accion: 'Agregar_nueva_unidad_medida',
            data: {
                "id": valorSeleccionado,
                "nombre": nombre
            }
        };
        ajaxConParametros(undefined, data)
            .then(response => {
                response = JSON.parse(response)
                if (response.success) {
                    contenido = ComponerContenidoAdvertencia('../../icons/windows/check.png', 'Listo', 'Unidad agregada correctamente');
                    MostrarModal(contenido, false)
                    setTimeout(() => {
                        CerrarModal()
                        CerrarModalPadre()
                        window.parent.InicializarPaginaUnidadesMedida()
                    }, 1000);

                } else {
                    contenido = ComponerContenidoAdvertencia('../../icons/windows/eliminar.png', 'Error', response.message);
                    console.log(response.message)
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