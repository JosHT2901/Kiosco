window.addEventListener('message', function (event) {
        if (event.data ?.tipo === 'producto-creado') {
                CerrarModal()
        }
});

$("#BotonDepartamentosPaginaProductos").click(function (e) {
        AbrirModalIframe('departamentos.php', '530px')
})

$("#BotonAgregarNuevoProducto").click(function (e) {
        AbrirModalIframe('nuevo-producto.php', '530px')
})

$(document).ready(function (e) {
        MostrarModal(
                ComponerModalCargando('Obteniendo información', 'auto', '400px'),
                false
        );
        ObtenerAlturaContenedor()
        CerrarModal()
})

function ObtenerAlturaContenedor() {
        let alturaConMargen = $("#ContenedorBotonesPaginaProductos").outerHeight(true);
        var $div = $("#ContenedorTablaPaginaProductos")
        $div.css({
                "height": 'calc(100% - ' + alturaConMargen + 'px)'
        });

}

function Inicializar_Pagina_Productos()
{
        
}

async function Obtener_Productos() {
        const data = {
            accion: 'Obtener_Productos',
        };
    
        try {
            const response = await ajaxConParametros(undefined, data);
            return response;
        } catch (error) {
            const contenido = ComponerContenidoAdvertencia(
                '../../icons/windows/eliminar.png',
                'Error',
                'Intenta más tarde'
            );
            console.error("Error en Obtener_Sucursales:", error);
            MostrarModal(contenido, false);
            setTimeout(() => {
                CerrarModal();
            }, 1000);
            throw error;
        }
    }