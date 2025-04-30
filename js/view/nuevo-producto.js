var InformacionBasicaProducto = []
var InformacionImpuestosProducto = []
var InformacionPreciosProducto = []
var InformacionPiezasProducto = []
var ExistenciasEstaSucursal = []
var NumeroTarjetaSeleccionada = 1
const imagenAdvertenciaNuevoProducto = '../../icons/windows/exclamacion.png';
const tituloError = 'Verifica'
$(document).ready(function (e) {
    CargarPaginaCrearProducto(1)
})

function CargarPaginaCrearProducto(pagina) {
    try {

        CrearLoader('CargandoPaginaCrearProducto', "ContenedorPaginaCrearProducto")
        $(window.parent.document).find('#TarjetaModal').css({
            height: '530px'
        })
        switch (pagina) {
            case 1:
                ContenidoPaginaCrearProducto_1()
                EventosBotonesPaginaCrearUsuario_1()
                break;
            case 2:
                ContenidoPaginaCrearProducto_2();
                EventosBotonesPaginaCrearUsuario_2(function () {
                    LLenadoPaginaCrearProducto_2();
                });
                break
            case 3:
                ContenidoPaginaCrearProducto_3()
                EventosBotonesPaginaCrearUsuario_3(function () {
                    LLenadoPaginaCrearProducto_3()
                })
                break;
            case 4:
                ContenidoPaginaCrearProducto_4()
                EventosBotonesPaginaCrearUsuario_4()
                LLenadoPaginaCrearProducto_4()
                break;
            case 5:
                ContenidoPaginaCrearProducto_5()
                EventosBotonesPaginaCrearUsuario_5()
                LLenadoPaginaCrearProducto_5()
                break;
            case 6:
                ContenidoPaginaCrearProducto_6()
                $(window.parent.document).find('#TarjetaModal').css({
                    height: '320px'
                });
                EventosBotonesPaginaCrearUsuario_6()
                break;
            default:
                break;
        }
        if (window.self !== window.top) {
            $("#ColumnaTarjetaLogin").removeClass('anchura-80-por-ciento').addClass('anchura-100-por-ciento')
            $("form > div").css('max-height', '350px');
            $("#ContenedorPaginaCrearProducto").removeClass('box-shadow-1')
            $('html, body').css('background-color', '#ffffff')
        }
        EliminarLoader('CargandoPaginaCrearProducto')
        EventosBotonesPaginaCrearProducto()
    } catch (error) {
        EliminarLoader('CargandoPaginaCrearProducto')
        $("#ContenedorPaginaCrearProducto").removeClass('box-shadow-1')
        ContenidoPaginaGuardado(false, 'Error al obtener información', $("#ContenedorPaginaCrearProducto"))
        console.log(error)
    }
}

function ContenidoPaginaCrearProducto_1() {
    var tarjeta1 = `<div class="anchura-100-por-ciento altura-70-px flex flex-center margin-10-px-auto borde-redondeado-5-px padding-5px-superior-inferior ${NumeroTarjetaSeleccionada==1?`tarjeta-hover box-shadow-1`:''}">
                        <div class="anchura-70-px altura-100-por-ciento flex flex-center">
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2v6a2 2 0 0 0 2 2h6v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h6Z" />
                                <path d="M13.5 2.5V8a.5.5 0 0 0 .5.5h5.5l-6-6Z" />
                            </svg>
                        </div>
                        <div class="anchura-100-por-ciento-menos-70-px altura-100-por-ciento flex flex-center">
                            <div class="anchura-100-por-ciento-menos-90-px altura-100-por-ciento flex flex-center">
                                <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral">
                                    <div class="anchura-100-por-ciento altura-30-px flex flex-left">
                                        <span>Información básica</span>
                                    </div>
                                    <div class="anchura-100-por-ciento flex flex-left font-08-rem margin-5-px-auto color-letra-subtitulo">
                                        <span>Información del producto</span>
                                    </div>
                                </div>
                            </div>
                            <div class="anchura-90-px altura-100-por-ciento flex flex-center">
                            ${InformacionBasicaProducto.length==0?`<a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem  position-relative borde-redondeado-5-px" id="BotonInformacionBasicaNuevoProducto">
                                <span>Agregar</span>
                                </a>`:`
                                <a class="boton altura-35-px anchura-35-px boton-importante borde-redondeado-50-por-ciento flex flex-center" id="BotonEditarInformacionBasicaNuevoProducto">
                                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.94 5 19 10.06 9.062 20a2.25 2.25 0 0 1-.999.58l-5.116 1.395a.75.75 0 0 1-.92-.921l1.395-5.116a2.25 2.25 0 0 1 .58-.999L13.938 5Zm7.09-2.03a3.578 3.578 0 0 1 0 5.06l-.97.97L15 3.94l.97-.97a3.578 3.578 0 0 1 5.06 0Z" fill="#ffffff"/></svg>
                                </a>`}
                            </div>
                        </div>
                    </div>`
    var tarjeta2 = `<div class="anchura-100-por-ciento altura-70-px flex flex-center margin-10-px-auto borde-redondeado-5-px padding-5px-superior-inferior ${NumeroTarjetaSeleccionada==2?`tarjeta-hover box-shadow-1`:''}">
                    <div class="anchura-70-px altura-100-por-ciento flex flex-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
                            <path d="M184,89.57V84c0-25.08-37.83-44-88-44S8,58.92,8,84v40c0,20.89,26.25,37.49,64,42.46V172c0,25.08,37.83,44,88,44s88-18.92,88-44V132C248,111.3,222.58,94.68,184,89.57ZM232,132c0,13.22-30.79,28-72,28-3.73,0-7.43-.13-11.08-.37C170.49,151.77,184,139,184,124V105.74C213.87,110.19,232,122.27,232,132ZM72,150.25V126.46A183.74,183.74,0,0,0,96,128a183.74,183.74,0,0,0,24-1.54v23.79A163,163,0,0,1,96,152,163,163,0,0,1,72,150.25Zm96-40.32V124c0,8.39-12.41,17.4-32,22.87V123.5C148.91,120.37,159.84,115.71,168,109.93ZM96,56c41.21,0,72,14.78,72,28s-30.79,28-72,28S24,97.22,24,84,54.79,56,96,56ZM24,124V109.93c8.16,5.78,19.09,10.44,32,13.57v23.37C36.41,141.4,24,132.39,24,124Zm64,48v-4.17c2.63.1,5.29.17,8,.17,3.88,0,7.67-.13,11.39-.35A121.92,121.92,0,0,0,120,171.41v23.46C100.41,189.4,88,180.39,88,172Zm48,26.25V174.4a179.48,179.48,0,0,0,24,1.6,183.74,183.74,0,0,0,24-1.54v23.79a165.45,165.45,0,0,1-48,0Zm64-3.38V171.5c12.91-3.13,23.84-7.79,32-13.57V172C232,180.39,219.59,189.4,200,194.87Z"></path>
                        </svg>
                    </div>
                    <div class="anchura-100-por-ciento-menos-70-px altura-100-por-ciento flex flex-center">
                        <div class="anchura-100-por-ciento-menos-90-px altura-100-por-ciento flex flex-center">
                            <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral">
                                <div class="anchura-100-por-ciento altura-30-px flex flex-left">
                                    <span>Impuestos</span>
                                </div>
                                <div class="anchura-100-por-ciento flex flex-left font-08-rem margin-5-px-auto color-letra-subtitulo">
                                    <span>Configura los impuestos</span>
                                </div>
                            </div>
                        </div>
                        <div class="anchura-90-px altura-100-por-ciento flex flex-center">
                         ${
                                InformacionImpuestosProducto.length == 0 && NumeroTarjetaSeleccionada==2
                                 ? `
                                   <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem position-relative borde-redondeado-2-px" id="BotonAgregarImpuestosNuevoProducto">
                                     <span>Agregar</span>
                                   </a>
                                 `
                                 : InformacionImpuestosProducto.length != 0 && InformacionBasicaProducto.length!=0
                                 ? `
                                   <a class="boton altura-35-px anchura-35-px boton-importante borde-redondeado-50-por-ciento flex flex-center" id="BotonEditarImpuestosNuevoProducto">
                                     <svg width="20" height="20" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M13.94 5 19 10.06 9.062 20a2.25 2.25 0 0 1-.999.58l-5.116 1.395a.75.75 0 0 1-.92-.921l1.395-5.116a2.25 2.25 0 0 1 .58-.999L13.938 5Zm7.09-2.03a3.578 3.578 0 0 1 0 5.06l-.97.97L15 3.94l.97-.97a3.578 3.578 0 0 1 5.06 0Z" fill="#ffffff"/>
                                     </svg>
                                   </a>
                                 `
                                 : ``
                             }
                        </div>
                    </div>
                </div>`
    var tarjeta3 = `<div class="anchura-100-por-ciento altura-70-px flex flex-center margin-10-px-auto borde-redondeado-5-px padding-5px-superior-inferior ${NumeroTarjetaSeleccionada==3?`tarjeta-hover box-shadow-1`:''}">
                <div class="anchura-70-px altura-100-por-ciento flex flex-center">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m18.492 2.33 3.179 3.179a2.25 2.25 0 0 1 0 3.182l-2.584 2.584A2.25 2.25 0 0 1 21 13.5v5.25A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.75V5.25A2.25 2.25 0 0 1 5.25 3h5.25a2.25 2.25 0 0 1 2.225 1.915L15.31 2.33a2.25 2.25 0 0 1 3.182 0ZM4.5 18.75c0 .414.336.75.75.75l5.999-.001.001-6.75H4.5v6Zm8.249.749h6.001a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-6.001v6.75Zm-2.249-15H5.25a.75.75 0 0 0-.75.75v6h6.75v-6a.75.75 0 0 0-.75-.75Zm2.25 4.81v1.94h1.94l-1.94-1.94Zm3.62-5.918-3.178 3.178a.75.75 0 0 0 0 1.061l3.179 3.179a.75.75 0 0 0 1.06 0l3.18-3.179a.75.75 0 0 0 0-1.06l-3.18-3.18a.75.75 0 0 0-1.06 0Z" /></svg>
                </div>
                <div class="anchura-100-por-ciento-menos-70-px altura-100-por-ciento flex flex-center">
                    <div class="anchura-100-por-ciento-menos-90-px altura-100-por-ciento flex flex-center">
                        <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral">
                            <div class="anchura-100-por-ciento altura-30-px flex flex-left">
                                <span>Configuración de venta</span>
                            </div>
                            <div class="anchura-100-por-ciento flex flex-left font-08-rem margin-5-px-auto color-letra-subtitulo">
                                <span>Configura las piezas de venta</span>
                            </div>
                        </div>
                    </div>
                    <div class="anchura-90-px altura-100-por-ciento flex flex-center">
                    ${
                        InformacionPiezasProducto.length == 0 && NumeroTarjetaSeleccionada==3
                         ? `
                           <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem position-relative borde-redondeado-2-px" id="BotonConfigurarPiezasNuevoProducto">
                             <span>Agregar</span>
                           </a>
                         `
                         : InformacionImpuestosProducto.length != 0 &&
                          InformacionBasicaProducto.length!=0 &&
                          InformacionPiezasProducto.length!=0
                         ? `
                           <a class="boton altura-35-px anchura-35-px boton-importante borde-redondeado-50-por-ciento flex flex-center" id="BotonEditarPiezasNuevoProducto">
                             <svg width="20" height="20" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                               <path d="M13.94 5 19 10.06 9.062 20a2.25 2.25 0 0 1-.999.58l-5.116 1.395a.75.75 0 0 1-.92-.921l1.395-5.116a2.25 2.25 0 0 1 .58-.999L13.938 5Zm7.09-2.03a3.578 3.578 0 0 1 0 5.06l-.97.97L15 3.94l.97-.97a3.578 3.578 0 0 1 5.06 0Z" fill="#ffffff"/>
                             </svg>
                           </a>
                         `
                         : ``
                     }
                    </div>
                </div>
            </div>`
    var tarjeta4 = `<div class="anchura-100-por-ciento altura-70-px flex flex-center margin-10-px-auto borde-redondeado-5-px padding-5px-superior-inferior ${NumeroTarjetaSeleccionada==4?`tarjeta-hover box-shadow-1`:''}">
                        <div class="anchura-70-px altura-100-por-ciento flex flex-center">
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 6.75C2 5.784 2.784 5 3.75 5h13.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 17.25 17H3.75A1.75 1.75 0 0 1 2 15.25v-8.5Zm3-.5v1a.75.75 0 0 1-.75.75h-1v1.5h1A2.25 2.25 0 0 0 6.5 7.25v-1H5Zm5.5 7.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Zm-7.25.5h1a.75.75 0 0 1 .75.75v1h1.5v-1a2.25 2.25 0 0 0-2.25-2.25h-1V14Zm12.75.75a.75.75 0 0 1 .75-.75h1v-1.5h-1a2.25 2.25 0 0 0-2.25 2.25v1H16v-1Zm0-7.5v-1h-1.5v1a2.25 2.25 0 0 0 2.25 2.25h1V8h-1a.75.75 0 0 1-.75-.75Z" />
                                <path d="M4.401 18.5A2.999 2.999 0 0 0 7 20h10.25A4.75 4.75 0 0 0 22 15.25V10c0-1.11-.603-2.08-1.5-2.599v7.849a3.25 3.25 0 0 1-3.25 3.25H4.401Z" />
                            </svg>
                        </div>
                        <div class="anchura-100-por-ciento-menos-70-px altura-100-por-ciento flex flex-center">
                            <div class="anchura-100-por-ciento-menos-90-px altura-100-por-ciento flex flex-center">
                                <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral">
                                    <div class="anchura-100-por-ciento altura-30-px flex flex-left">
                                        <span>Precios</span>
                                    </div>
                                    <div class="anchura-100-por-ciento flex flex-left font-08-rem margin-5-px-auto color-letra-subtitulo">
                                        <span>Agrega los precios</span>
                                    </div>
                                </div>
                            </div>
                            <div class="anchura-90-px altura-100-por-ciento flex flex-center">
                            ${
                                InformacionPreciosProducto.length== 0 && 
                                NumeroTarjetaSeleccionada==4
                                 ? `
                                   <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem position-relative borde-redondeado-2-px" id="BotonAgregarPreciosNuevoProducto">
                                     <span>Agregar</span>
                                   </a>
                                 `
                                 : InformacionImpuestosProducto.length != 0 && 
                                    InformacionBasicaProducto.length!=0 &&
                                    InformacionPiezasProducto.length!=0 &&
                                    InformacionPreciosProducto.length!=0
                                 ? `
                                   <a class="boton altura-35-px anchura-35-px boton-importante borde-redondeado-50-por-ciento flex flex-center" id="BotonEditarPreciosNuevoProducto">
                                     <svg width="20" height="20" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M13.94 5 19 10.06 9.062 20a2.25 2.25 0 0 1-.999.58l-5.116 1.395a.75.75 0 0 1-.92-.921l1.395-5.116a2.25 2.25 0 0 1 .58-.999L13.938 5Zm7.09-2.03a3.578 3.578 0 0 1 0 5.06l-.97.97L15 3.94l.97-.97a3.578 3.578 0 0 1 5.06 0Z" fill="#ffffff"/>
                                     </svg>
                                   </a>
                                 `
                                 : ``
                             }
                            </div>
                        </div>
                    </div>`
    var tarjeta5 = `<div class="anchura-100-por-ciento altura-70-px flex flex-center margin-10-px-auto borde-redondeado-5-px padding-5px-superior-inferior ${NumeroTarjetaSeleccionada==5?`tarjeta-hover box-shadow-1`:''}">
                    <div class="anchura-70-px altura-100-por-ciento flex flex-center">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 6.75C2 5.784 2.784 5 3.75 5h13.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 17.25 17H3.75A1.75 1.75 0 0 1 2 15.25v-8.5Zm3-.5v1a.75.75 0 0 1-.75.75h-1v1.5h1A2.25 2.25 0 0 0 6.5 7.25v-1H5Zm5.5 7.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Zm-7.25.5h1a.75.75 0 0 1 .75.75v1h1.5v-1a2.25 2.25 0 0 0-2.25-2.25h-1V14Zm12.75.75a.75.75 0 0 1 .75-.75h1v-1.5h-1a2.25 2.25 0 0 0-2.25 2.25v1H16v-1Zm0-7.5v-1h-1.5v1a2.25 2.25 0 0 0 2.25 2.25h1V8h-1a.75.75 0 0 1-.75-.75Z" />
                            <path d="M4.401 18.5A2.999 2.999 0 0 0 7 20h10.25A4.75 4.75 0 0 0 22 15.25V10c0-1.11-.603-2.08-1.5-2.599v7.849a3.25 3.25 0 0 1-3.25 3.25H4.401Z" />
                        </svg>
                    </div>
                    <div class="anchura-100-por-ciento-menos-70-px altura-100-por-ciento flex flex-center">
                        <div class="anchura-100-por-ciento-menos-90-px altura-100-por-ciento flex flex-center">
                            <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral">
                                <div class="anchura-100-por-ciento altura-30-px flex flex-left">
                                    <span>Existencias</span>
                                </div>
                                <div class="anchura-100-por-ciento flex flex-left font-08-rem margin-5-px-auto color-letra-subtitulo">
                                    <span>Agrega las existencias para esta sucursal</span>
                                </div>
                            </div>
                        </div>
                        <div class="anchura-90-px altura-100-por-ciento flex flex-center">
                        ${
                            ExistenciasEstaSucursal.length == 0 && NumeroTarjetaSeleccionada==5
                             ? `
                               <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem position-relative borde-redondeado-2-px" id="BotonAgregarExistenciasNuevoProducto">
                                 <span>Agregar</span>
                               </a>
                             `
                             :
                             InformacionImpuestosProducto.length != 0 && 
                             InformacionBasicaProducto.length!=0 &&
                             InformacionPiezasProducto.length!=0 &&
                             InformacionPreciosProducto.length!=0
                             ? `
                               <a class="boton altura-35-px anchura-35-px boton-importante borde-redondeado-50-por-ciento flex flex-center" id="BotonEditarExistenciasNuevoProducto">
                                 <svg width="20" height="20" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M13.94 5 19 10.06 9.062 20a2.25 2.25 0 0 1-.999.58l-5.116 1.395a.75.75 0 0 1-.92-.921l1.395-5.116a2.25 2.25 0 0 1 .58-.999L13.938 5Zm7.09-2.03a3.578 3.578 0 0 1 0 5.06l-.97.97L15 3.94l.97-.97a3.578 3.578 0 0 1 5.06 0Z" fill="#ffffff"/>
                                 </svg>
                               </a>
                             `
                             : ``
                         }
                        </div>
                    </div>
                </div>`



    $("#ColumnaTarjetaLogin").addClass('anchura-400-px').removeClass('anchura-80-por-ciento')
    $("#ContenedorContenidoPaginaCrearProducto").html(tarjeta1 + tarjeta2 + tarjeta3 + tarjeta4 + tarjeta5)
}

function ContenidoPaginaCrearProducto_2() {
    console.log(InformacionBasicaProducto)
    $("#ColumnaTarjetaLogin").removeClass('anchura-400-px').addClass('anchura-80-por-ciento')
    $("#ContenedorContenidoPaginaCrearProducto").html(`<div class="overflow-auto">
                    <div class="anchura-100-por-ciento-con-padding-5px-lateral font-11-rem font-family-Montserrat-Semi-Bold padding-5px-lateral altura-30-px flex flex-center margin-10-px-auto">
                        <span>Información básica</span>
                    </div>
                    <form class="overflow-auto margin-10-px-auto">
                        <div class="overflow-auto" style="max-height: 320px;">
                            <div class="anchura-100-por-ciento flex flex-center flex-wrap">
                                <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto contenedor-input-resizable-50-por-ciento-margin-30px">
                                    <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                        <span class="label-input">Código de barras</span>
                                    </div>
                                    <div class="anchura-100-por-ciento altura-40-px flex flex-center">
                                        <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px flex flex-center">

                                            <div class="altura-100-por-ciento anchura-100-por-ciento-menos-40-px flex flex-center">
                                                <input type="text" class="input" id="InputCodigoNuevoProducto">
                                            </div>
                                            <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                                                <a class="boton boton-solo-icono anchura-30-px altura-30-px tarjeta-hover borde-redondeado-50-px flex flex-center margin-0px-5px" title="Generar código" id="BotonGenerarCodigoNuevoProducto">
                                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.052 5.029a1 1 0 0 0 .189 1.401 7.002 7.002 0 0 1-3.157 12.487l.709-.71a1 1 0 0 0-1.414-1.414l-2.5 2.5a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 1.414-1.414l-.843-.842A9.001 9.001 0 0 0 17.453 4.84a1 1 0 0 0-1.401.189Zm-1.93-1.736-2.5-2.5a1 1 0 0 0-1.498 1.32l.083.094.843.843a9.001 9.001 0 0 0-4.778 15.892A1 1 0 0 0 7.545 17.4a7.002 7.002 0 0 1 3.37-12.316l-.708.709a1 1 0 0 0 1.32 1.497l.094-.083 2.5-2.5a1 1 0 0 0 .083-1.32l-.083-.094Z" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto contenedor-input-resizable-50-por-ciento-margin-30px">
                                    <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                        <span class="label-input">Descripción</span>
                                    </div>
                                    <div class="anchura-100-por-ciento altura-40-px">
                                        <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                                            <input type="text" class="input" id="InputDescripcionNuevoProducto">
                                        </div>
                                    </div>
                                </div>

                                <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto contenedor-input-resizable-50-por-ciento-margin-30px">
                                    <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                        <span class="label-input">Departamento</span>
                                    </div>
                                    <div class="anchura-100-por-ciento altura-40-px">
                                        <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px flex flex-center" id="ContenedorSelectDepartamentoNuevoProducto">

                                        </div>
                                    </div>
                                </div>

                                <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto contenedor-input-resizable-33-por-ciento-margin-30px">
                                    <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                        <span class="label-input">Unidad de venta</span>
                                    </div>
                                    <div class="anchura-100-por-ciento altura-40-px">
                                        <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px flex flex-center" id="ContenedorSelectUnidadNuevoProducto"></div>
                                    </div>
                                </div>

                                <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto contenedor-input-resizable-33-por-ciento-margin-30px">
                                    <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                        <span class="label-input">Tipo de venta</span>
                                    </div>
                                    <div class="anchura-100-por-ciento altura-40-px">
                                        <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px flex flex-center">
                                            <div class="altura-100-por-ciento flex flex-center anchura-50-por-ciento">
                                            <label class="anchura-100-por-ciento altura-100-por-ciento flex flex-center tarjeta-hover">
                                                    <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                                                        <input type="radio" class="checkbox-round" name="InputRadioTipoVenta" value="Unidad">
                                                    </div>
                                                    <div class="altura-100-por-ciento anchura-100-por-ciento-menos-40-px flex flex-center">
                                                        <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral flex flex-left">
                                                            <span>Unidad</span>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                            <div class="altura-100-por-ciento flex flex-center anchura-50-por-ciento">
                                                <label class="anchura-100-por-ciento altura-100-por-ciento flex flex-center tarjeta-hover">
                                                    <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                                                        <input type="radio" class="checkbox-round" name="InputRadioTipoVenta" value="Granel">
                                                    </div>
                                                    <div class="altura-100-por-ciento anchura-100-por-ciento-menos-40-px flex flex-center">
                                                        <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral flex flex-left">
                                                            <span>Granel</span>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="anchura-100-por-ciento-con-padding-10px-lateral padding-10px-lateral margin-15px-auto-0px-auto altura-50-px flex flex-center">
                        <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-left">
                            <a class="boton boton-solo-letra" id="BotonAtrasPaginaCrearNuevoProducto">Atrás</a>
                        </div>
                        <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-right">
                            <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem min-width-110px position-relative borde-redondeado-5-px" id="BotonGuardarInformacionBasicaNuevoProducto">
                                <span>Continuar</span>
                            </a>
                        </div>
                    </div>
                </div>`)
}

function ContenidoPaginaCrearProducto_3() {
    $("#ColumnaTarjetaLogin").removeClass('anchura-400-px').addClass('anchura-80-por-ciento')
    $("#ContenedorContenidoPaginaCrearProducto").html(`<div class="overflow-auto">
                    <div class="anchura-100-por-ciento-con-padding-5px-lateral font-11-rem font-family-Montserrat-Semi-Bold padding-5px-lateral altura-30-px flex flex-center margin-10-px-auto">
                        <span>Impuestos</span>
                    </div>
                    <form class="overflow-auto margin-10-px-auto">
                        <div class="overflow-auto" style="max-height: 320px;">
                            <div class="anchura-100-por-ciento flex flex-center flex-wrap">
                            <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto contenedor-input-resizable-50-por-ciento-margin-30px">
                                    <div class="anchura-100-por-ciento altura-40-px flex flex-left font-09-rem">

                                        <div class="altura-100-por-ciento flex flex-left padding-5px-lateral" style="width: calc(100% - 150px - 10px);">
                                            <span class="label-input">I.V.A.</span>
                                        </div>
                                        <div class="anchura-150-px altura-100-por-ciento flex flex-right">
                                            <label class="toggle-switch">
                                                <input type="checkbox" id="InputCheckIVANuevoProducto" checked>
                                                <div class="toggle-switch-background">
                                                    <div class="toggle-switch-handle"></div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="anchura-100-por-ciento altura-40-px">
                                        <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                                            <div class="borde-redondeado-5-px bg-color-input flex flex-center altura-100-por-ciento anchura-100-por-ciento">
                                                <div class="altura-100-por-ciento anchura-100-por-ciento-menos-40-px">
                                                    <select name="" id="SelectIVANuevoProducto"></select>
                                                </div>
                                                <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                                                        <path d="M205.66,61.64l-144,144a8,8,0,0,1-11.32-11.32l144-144a8,8,0,0,1,11.32,11.31ZM50.54,101.44a36,36,0,0,1,50.92-50.91h0a36,36,0,0,1-50.92,50.91ZM56,76A20,20,0,1,0,90.14,61.84h0A20,20,0,0,0,56,76ZM216,180a36,36,0,1,1-10.54-25.46h0A35.76,35.76,0,0,1,216,180Zm-16,0a20,20,0,1,0-5.86,14.14A19.87,19.87,0,0,0,200,180Z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto contenedor-input-resizable-50-por-ciento-margin-30px">
                                    <div class="anchura-100-por-ciento altura-40-px flex flex-left font-09-rem">
                                        <div class="altura-100-por-ciento flex flex-left padding-5px-lateral" style="width: calc(100% - 150px - 10px);">
                                            <span class="label-input">I.E.P.S</span>
                                        </div>
                                        <div class="anchura-150-px altura-100-por-ciento flex flex-right">
                                            <label class="toggle-switch">
                                                <input type="checkbox" id="InputCheckIEPSNuevoProducto" checked>
                                                <div class="toggle-switch-background">
                                                    <div class="toggle-switch-handle"></div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="anchura-100-por-ciento altura-40-px">
                                        <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px flex flex-center">
                                            <div class="altura-100-por-ciento anchura-100-por-ciento-menos-40-px">
                                                    <select name="" id="SelectIEPSNuevoProducto"></select>
                                                </div>
                                                <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                                                        <path d="M205.66,61.64l-144,144a8,8,0,0,1-11.32-11.32l144-144a8,8,0,0,1,11.32,11.31ZM50.54,101.44a36,36,0,0,1,50.92-50.91h0a36,36,0,0,1-50.92,50.91ZM56,76A20,20,0,1,0,90.14,61.84h0A20,20,0,0,0,56,76ZM216,180a36,36,0,1,1-10.54-25.46h0A35.76,35.76,0,0,1,216,180Zm-16,0a20,20,0,1,0-5.86,14.14A19.87,19.87,0,0,0,200,180Z"></path>
                                                    </svg>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="anchura-100-por-ciento-con-padding-10px-lateral padding-10px-lateral margin-15px-auto-0px-auto altura-50-px flex flex-center">
                        <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-left">
                            <a class="boton boton-solo-letra" id="BotonAtrasPaginaCrearNuevoProducto">Atrás</a>
                        </div>
                        <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-right">
                            <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem min-width-110px position-relative borde-redondeado-5-px" id="BotonGuardarImpuestosNuevoProducto">
                                <span>Continuar</span>
                            </a>
                        </div>
                    </div>
                </div>`)
}

function ContenidoPaginaCrearProducto_4() {
    $("#ColumnaTarjetaLogin").removeClass('anchura-400-px').addClass('anchura-80-por-ciento')
    $("#ContenedorContenidoPaginaCrearProducto").html(`<div class="overflow-auto">
                    <div class="anchura-100-por-ciento-con-padding-5px-lateral font-11-rem font-family-Montserrat-Semi-Bold padding-5px-lateral altura-30-px flex flex-center margin-10-px-auto">
                        <span>Piezas</span>
                    </div>
                    <form class="overflow-auto margin-10-px-auto">
                        <div class="overflow-auto" style="max-height: 320px;">
                            <div class="anchura-100-por-ciento flex flex-center flex-wrap">
                               <div class=" padding-5px-lateral anchura-100-por-ciento-con-padding-5px-lateral altura-40-px flex flex-center margin-10-px-auto font-08-rem">
                                    <div class="altura-100-por-ciento flex flex-center color1474c4 padding-5px-lateral" style="font-weight: 600; width:calc(100% - 300px  - 50px)">
                                        <span>Tipo de venta</span>
                                    </div>
                                    <div class="anchura-150-px altura-100-por-ciento flex flex-center color1474c4" style="font-weight: 600;">
                                        <span>Minimo</span>
                                    </div>
                                    <div class="anchura-150-px altura-100-por-ciento flex flex-center color1474c4" style="font-weight: 600;">
                                        <span>Máximo</span>
                                    </div>

                                    <div class="altura-100-por-ciento flex flex-center color1474c4" style="font-weight: 600; width:50px">
                                        <span>No aplica</span>
                                    </div>
                                </div>
                                <div class="anchura-100-por-ciento">
                                    <div class=" anchura-100-por-ciento-con-padding-5px-lateral padding-5px-superior-inferior margin-10-px-auto flex flex-center borde-redondeado-10-px bg-color-input" style="padding: 5px;">
                                        <div class="anchura-100-por-ciento altura-40-px flex flex-center">
                                            <div class="anchura-200-px altura-100-por-ciento flex flex-center color1474c4" style="font-weight: 600; width:calc(100% - 300px  - 50px)">
                                                <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral flex flex-left font-09-rem">
                                                    <span>Menudeo</span>
                                                </div>
                                            </div>
                                            <div class="anchura-150-px altura-100-por-ciento flex flex-center">
                                                <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral">
                                                    <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                                                        <input type="text" class="input text-align-right" id="InputPiezasMinimoTipoMenudeo" name="InputPiezasNuevoProducto">
                                                    </div>
                                                </div>
                                            </div>
                                           <div class="anchura-150-px altura-100-por-ciento flex flex-center">
                                                <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral">
                                                    <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px flex flex-center">
                                                        <div class=" altura-100-por-ciento anchura-100-por-ciento-menos-40-px flex flex-center">
                                                            <input type="text" class="input text-align-right" id="InputPiezasMaximoTipoMenudeo" name="InputPiezasNuevoProducto">
                                                        </div>
                                                        <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                                                            <a class="boton boton-solo-icono anchura-30-px altura-30-px tarjeta-hover borde-redondeado-50-px flex flex-center margin-0px-5px" id="BotonInfinitoPiezasMenudeo">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                                                                    <path d="M248,128a56,56,0,0,1-95.6,39.6l-.33-.35L92.12,99.55a40,40,0,1,0,0,56.9l8.52-9.62a8,8,0,1,1,12,10.61l-8.69,9.81-.33.35a56,56,0,1,1,0-79.2l.33.35,59.95,67.7a40,40,0,1,0,0-56.9l-8.52,9.62a8,8,0,1,1-12-10.61l8.69-9.81.33-.35A56,56,0,0,1,248,128Z"></path>
                                                                </svg>
                                                            </a>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="anchura-50-px altura-100-por-ciento flex flex-center">
                                                <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral">
                                                    <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px flex flex-center"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class=" anchura-100-por-ciento-con-padding-5px-lateral padding-5px-superior-inferior margin-10-px-auto flex flex-center borde-redondeado-10-px bg-color-input" style="padding: 5px;">
                                        <div class="anchura-100-por-ciento altura-40-px flex flex-center">
                                            <div class="anchura-200-px altura-100-por-ciento flex flex-center color1474c4" style="font-weight: 600; width:calc(100% - 300px  - 50px)">
                                                <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral flex flex-left font-09-rem">
                                                    <span>Medio mayoreo</span>
                                                </div>
                                            </div>
                                            <div class="anchura-150-px altura-100-por-ciento flex flex-center">
                                                <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral">
                                                    <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                                                        <input type="text" class="input text-align-right" id="InputPiezasMinimoTipoMedioMayoreo" name="InputPiezasNuevoProducto">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="anchura-150-px altura-100-por-ciento flex flex-center">
                                                <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral">
                                                    <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                                                        <input type="text" class="input text-align-right" id="InputPiezasMaximoTipoMedioMayoreo" name="InputPiezasNuevoProducto">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="anchura-50-px altura-100-por-ciento flex flex-center">
                                                <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral">
                                                    <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px flex flex-center">
                                                        <input type="checkbox" class="checkbox-round" id="CheckBoxNoAplicaMedioMayoreo">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class=" anchura-100-por-ciento-con-padding-5px-lateral padding-5px-superior-inferior margin-10-px-auto flex flex-center borde-redondeado-10-px bg-color-input" style="padding: 5px;">
                                        <div class="anchura-100-por-ciento altura-40-px flex flex-center">
                                            <div class="anchura-200-px altura-100-por-ciento flex flex-center color1474c4" style="font-weight: 600; width:calc(100% - 300px  - 50px)">
                                                <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral flex flex-left font-09-rem">
                                                    <span>Mayoreo</span>
                                                </div>
                                            </div>
                                            <div class="anchura-150-px altura-100-por-ciento flex flex-center">
                                                <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral">
                                                    <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                                                        <input type="text" class="input text-align-right" id="InputPiezasMinimoTipoMayoreo" name="InputPiezasNuevoProducto">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="anchura-150-px altura-100-por-ciento flex flex-center">
                                                <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral">
                                                    <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px flex flex-center">
                                                        <div class=" altura-100-por-ciento anchura-100-por-ciento-menos-40-px flex flex-center">
                                                            <input type="text" class="input text-align-right" id="InputPiezasMaximoTipoMayoreo" name="InputPiezasNuevoProducto">
                                                        </div>
                                                        <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                                                            <a class="boton boton-solo-icono anchura-30-px altura-30-px tarjeta-hover borde-redondeado-50-px flex flex-center margin-0px-5px" id="BotonInfinitoPiezasMayoreo">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                                                                    <path d="M248,128a56,56,0,0,1-95.6,39.6l-.33-.35L92.12,99.55a40,40,0,1,0,0,56.9l8.52-9.62a8,8,0,1,1,12,10.61l-8.69,9.81-.33.35a56,56,0,1,1,0-79.2l.33.35,59.95,67.7a40,40,0,1,0,0-56.9l-8.52,9.62a8,8,0,1,1-12-10.61l8.69-9.81.33-.35A56,56,0,0,1,248,128Z"></path>
                                                                </svg>
                                                            </a>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="anchura-50-px altura-100-por-ciento flex flex-center">
                                                <div class="altura-100-por-ciento anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral">
                                                    <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px flex flex-center">
                                                        <input type="checkbox" class="checkbox-round" id="CheckBoxNoAplicaMayoreo">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="anchura-100-por-ciento-con-padding-10px-lateral padding-10px-lateral margin-15px-auto-0px-auto altura-50-px flex flex-center">
                        <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-left">
                            <a class="boton boton-solo-letra" id="BotonAtrasPaginaCrearNuevoProducto">Atrás</a>
                        </div>
                        <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-right">
                            <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem min-width-110px position-relative borde-redondeado-5-px" id="BotonGuardarPiezasNuevoProducto">
                                <span>Continuar</span>
                            </a>
                        </div>
                    </div>
                </div>`)
}

function ContenidoPaginaCrearProducto_5() {
    $("#ColumnaTarjetaLogin").removeClass('anchura-400-px').addClass('anchura-80-por-ciento')
    $("#ContenedorContenidoPaginaCrearProducto").html(`<div class="overflow-auto">
                    <div class="anchura-100-por-ciento-con-padding-5px-lateral font-11-rem font-family-Montserrat-Semi-Bold padding-5px-lateral altura-30-px flex flex-center margin-10-px-auto">
                        <span>Precios (sin impuestos)</span>
                    </div>
                    <form class="overflow-auto margin-10-px-auto">
                        <div class="overflow-auto" style="max-height: 320px;">
                            <div class="anchura-100-por-ciento flex flex-center flex-wrap">
                                <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto contenedor-input-resizable-50-por-ciento-margin-30px flex flex-center">
                                   <div class="anchura-50-por-ciento altura-100-por-ciento">
                                        <div class="anchura-100-por-ciento-con-padding-5px-lateral altura-100-por-ciento padding-5px-lateral">
                                            <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                                <span class="label-input">Costo caja/pieza</span>
                                            </div>
                                            <div class="anchura-100-por-ciento altura-40-px">
                                                <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                                                    <div class="borde-redondeado-5-px bg-color-input flex flex-center altura-100-por-ciento anchura-100-por-ciento">
                                                        <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256">
                                                                <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"></path>
                                                            </svg>
                                                        </div>
                                                        <div class="altura-100-por-ciento anchura-100-por-ciento-menos-40-px">
                                                            <input type="text" class="input text-align-right" id="InputPrecioCostoCajaNuevoProducto" name="InputPreciosNuevoProducto">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                   </div>
                                   <div class="anchura-50-por-ciento altura-100-por-ciento">
                                        <div class="anchura-100-por-ciento-con-padding-5px-lateral altura-100-por-ciento padding-5px-lateral">
                                            <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                                <span class="label-input">Piezas en la caja/pieza</span>
                                            </div>
                                            <div class="anchura-100-por-ciento altura-40-px">
                                                <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                                                    <div class="borde-redondeado-5-px bg-color-input flex flex-center altura-100-por-ciento anchura-100-por-ciento">
                                                        <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                                                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="m18.492 2.33 3.179 3.179a2.25 2.25 0 0 1 0 3.182l-2.423 2.422A2.501 2.501 0 0 1 21 13.5v5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13A2.5 2.5 0 0 1 5.5 3h5c1.121 0 2.07.737 2.387 1.754L15.31 2.33a2.25 2.25 0 0 1 3.182 0ZM11 13H5v5.5a.5.5 0 0 0 .5.5H11v-6Zm7.5 0H13v6h5.5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5Zm-4.06-2.001L13 9.559v1.44h1.44Zm-3.94-6h-5a.5.5 0 0 0-.5.5V11h6V5.5a.5.5 0 0 0-.5-.5Z" />
                                                            </svg>
                                                        </div>
                                                        <div class="altura-100-por-ciento anchura-100-por-ciento-menos-40-px">
                                                            <input type="text" class="input text-align-right" id="InputPiezasCajaNuevoProducto" name="InputPreciosNuevoProducto">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                   </div>
                                   
                                </div>
                                <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto contenedor-input-resizable-50-por-ciento-margin-30px">
                                    <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                       <span class="label-input">Precio costo</span>
                                    </div>
                                    <div class="anchura-100-por-ciento altura-40-px">
                                        <div class="borde-redondeado-5-px bg-color-input flex flex-center altura-100-por-ciento anchura-100-por-ciento">
                                            <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256">
                                                    <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"></path>
                                                </svg>
                                            </div>
                                            <div class="altura-100-por-ciento anchura-100-por-ciento-menos-40-px">
                                                <input type="text" class="input text-align-right" id="InputPrecioCostoNuevoProducto" name="InputPreciosNuevoProducto">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto contenedor-input-resizable-50-por-ciento-margin-30px flex flex-center">
                                   <div class="anchura-50-por-ciento altura-100-por-ciento">
                                        <div class="anchura-100-por-ciento-con-padding-5px-lateral altura-100-por-ciento padding-5px-lateral">
                                            <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                                <span class="label-input">Ganancia menudeo</span>
                                            </div>
                                            <div class="anchura-100-por-ciento altura-40-px">
                                                <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                                                    <div class="borde-redondeado-5-px bg-color-input flex flex-center altura-100-por-ciento anchura-100-por-ciento">
                                                        <div class="altura-100-por-ciento anchura-100-por-ciento-menos-40-px">
                                                            <input type="text" class="input text-align-right" id="InputGananciaMenudeoNuevoProducto" name="InputPreciosNuevoProducto">
                                                        </div>
                                                        <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                                                                <path d="M205.66,61.64l-144,144a8,8,0,0,1-11.32-11.32l144-144a8,8,0,0,1,11.32,11.31ZM50.54,101.44a36,36,0,0,1,50.92-50.91h0a36,36,0,0,1-50.92,50.91ZM56,76A20,20,0,1,0,90.14,61.84h0A20,20,0,0,0,56,76ZM216,180a36,36,0,1,1-10.54-25.46h0A35.76,35.76,0,0,1,216,180Zm-16,0a20,20,0,1,0-5.86,14.14A19.87,19.87,0,0,0,200,180Z"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                   </div>
                                   <div class="anchura-50-por-ciento altura-100-por-ciento">
                                        <div class="anchura-100-por-ciento-con-padding-5px-lateral altura-100-por-ciento padding-5px-lateral">
                                            <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                                <span class="label-input">Precio menudeo</span>
                                            </div>
                                            <div class="anchura-100-por-ciento altura-40-px">
                                                <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                                                    <div class="borde-redondeado-5-px bg-color-input flex flex-center altura-100-por-ciento anchura-100-por-ciento">
                                                        <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                                                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256">
                                                                <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"></path>
                                                            </svg>
                                                        </div>
                                                        <div class="altura-100-por-ciento anchura-100-por-ciento-menos-40-px">
                                                            <input type="text" class="input text-align-right" id="InputPrecioMenudeoNuevoProducto" name="InputPreciosNuevoProducto">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                   </div>
                                   
                                </div>
                                 ${InformacionPiezasProducto[0].medio!=null?`<div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto contenedor-input-resizable-50-por-ciento-margin-30px flex flex-center">
                                   <div class="anchura-50-por-ciento altura-100-por-ciento">
                                        <div class="anchura-100-por-ciento-con-padding-5px-lateral altura-100-por-ciento padding-5px-lateral">
                                            <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                                <span class="label-input">Ganancia medio mayoreo</span>
                                            </div>
                                            <div class="anchura-100-por-ciento altura-40-px">
                                                <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                                                    <div class="borde-redondeado-5-px bg-color-input flex flex-center altura-100-por-ciento anchura-100-por-ciento">
                                                        <div class="altura-100-por-ciento anchura-100-por-ciento-menos-40-px">
                                                            <input type="text" class="input text-align-right" id="InputGananciaMedioMayoreoNuevoProducto" name="InputPreciosNuevoProducto">
                                                        </div>
                                                        <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                                                                <path d="M205.66,61.64l-144,144a8,8,0,0,1-11.32-11.32l144-144a8,8,0,0,1,11.32,11.31ZM50.54,101.44a36,36,0,0,1,50.92-50.91h0a36,36,0,0,1-50.92,50.91ZM56,76A20,20,0,1,0,90.14,61.84h0A20,20,0,0,0,56,76ZM216,180a36,36,0,1,1-10.54-25.46h0A35.76,35.76,0,0,1,216,180Zm-16,0a20,20,0,1,0-5.86,14.14A19.87,19.87,0,0,0,200,180Z"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                   </div>
                                   <div class="anchura-50-por-ciento altura-100-por-ciento">
                                        <div class="anchura-100-por-ciento-con-padding-5px-lateral altura-100-por-ciento padding-5px-lateral">
                                            <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                                <span class="label-input">Precio medio mayoreo</span>
                                            </div>
                                            <div class="anchura-100-por-ciento altura-40-px">
                                                <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                                                    <div class="borde-redondeado-5-px bg-color-input flex flex-center altura-100-por-ciento anchura-100-por-ciento">
                                                        <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                                                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256">
                                                                <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"></path>
                                                            </svg>
                                                        </div>
                                                        <div class="altura-100-por-ciento anchura-100-por-ciento-menos-40-px">
                                                            <input type="text" class="input text-align-right" id="InputPrecioMedioMayoreoNuevoProducto" name="InputPreciosNuevoProducto">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                   </div>
                                   
                                </div>`:''}
                                ${InformacionPiezasProducto[0].mayoreo!=null?`<div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto contenedor-input-resizable-50-por-ciento-margin-30px flex flex-center">
                                   <div class="anchura-50-por-ciento altura-100-por-ciento">
                                        <div class="anchura-100-por-ciento-con-padding-5px-lateral altura-100-por-ciento padding-5px-lateral">
                                            <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                                <span class="label-input">Ganancia mayoreo</span>
                                            </div>
                                            <div class="anchura-100-por-ciento altura-40-px">
                                                <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                                                    <div class="borde-redondeado-5-px bg-color-input flex flex-center altura-100-por-ciento anchura-100-por-ciento">
                                                        <div class="altura-100-por-ciento anchura-100-por-ciento-menos-40-px">
                                                            <input type="text" class="input text-align-right" id="InputGananciaMayoreoNuevoProducto" name="InputPreciosNuevoProducto">
                                                        </div>
                                                        <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                                                           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                                                                <path d="M205.66,61.64l-144,144a8,8,0,0,1-11.32-11.32l144-144a8,8,0,0,1,11.32,11.31ZM50.54,101.44a36,36,0,0,1,50.92-50.91h0a36,36,0,0,1-50.92,50.91ZM56,76A20,20,0,1,0,90.14,61.84h0A20,20,0,0,0,56,76ZM216,180a36,36,0,1,1-10.54-25.46h0A35.76,35.76,0,0,1,216,180Zm-16,0a20,20,0,1,0-5.86,14.14A19.87,19.87,0,0,0,200,180Z"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                   </div>
                                   <div class="anchura-50-por-ciento altura-100-por-ciento">
                                        <div class="anchura-100-por-ciento-con-padding-5px-lateral altura-100-por-ciento padding-5px-lateral">
                                            <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                                <span class="label-input">Precio mayoreo</span>
                                            </div>
                                            <div class="anchura-100-por-ciento altura-40-px">
                                                <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                                                    <div class="borde-redondeado-5-px bg-color-input flex flex-center altura-100-por-ciento anchura-100-por-ciento">
                                                        <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256">
                                                                <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"></path>
                                                            </svg>
                                                        </div>
                                                        <div class="altura-100-por-ciento anchura-100-por-ciento-menos-40-px">
                                                            <input type="text" class="input text-align-right" id="InputPrecioMayoreoNuevoProducto" name="InputPreciosNuevoProducto">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                   </div>
                                </div>`:''}
                            </div>
                        </div>
                    </form>
                    <div class="anchura-100-por-ciento-con-padding-10px-lateral padding-10px-lateral margin-15px-auto-0px-auto altura-50-px flex flex-center">
                        <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-left">
                            <a class="boton boton-solo-letra" id="BotonAtrasPaginaCrearNuevoProducto">Atrás</a>
                        </div>
                        <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-right">
                            <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem min-width-110px position-relative borde-redondeado-5-px" id="BotonGuardarPreciosNuevoProducto">
                                <span>Continuar</span>
                            </a>
                        </div>
                    </div>
                </div>`)
}

function ContenidoPaginaCrearProducto_6() {
    $("#ColumnaTarjetaLogin").removeClass('anchura-400-px').addClass('anchura-80-por-ciento')
    $("#ContenedorContenidoPaginaCrearProducto").html(`<div class="overflow-auto">
                    <div class="anchura-100-por-ciento-con-padding-5px-lateral font-11-rem font-family-Montserrat-Semi-Bold padding-5px-lateral altura-30-px flex flex-center margin-10-px-auto">
                        <span>Inventario</span>
                    </div>
                    <div class="anchura-100-por-ciento altura-30-px flex flex-center margin-10-px-auto color1474c4" style="font-weight:600">
                        <span>Existencias en esta sucursal</span>
                    </div>
                    <form class="overflow-auto margin-10-px-auto">
                        <div class="overflow-auto" style="max-height: 320px;">
                            <div class="anchura-100-por-ciento flex flex-center flex-wrap">
                                <div class="anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral margin-15-px-auto contenedor-input-resizable-50-por-ciento-margin-30px">
                                    <div class="anchura-100-por-ciento altura-30-px flex flex-left font-09-rem">
                                        <span class="label-input">Existencias</span>
                                    </div>
                                    <div class="anchura-100-por-ciento altura-40-px">
                                        <div class="bg-color-input altura-100-por-ciento anchura-100-por-ciento borde-redondeado-5-px">
                                            <div class="borde-redondeado-5-px bg-color-input flex flex-center altura-100-por-ciento anchura-100-por-ciento">
                                                <div class="anchura-40-px altura-100-por-ciento flex flex-center">
                                                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6.049 7.984a.75.75 0 0 1 .967-.435L12 9.439l4.984-1.89a.75.75 0 1 1 .532 1.402L12.75 10.76v5.491a.75.75 0 0 1-1.5 0v-5.49L6.484 8.95a.75.75 0 0 1-.435-.967Z"/>
                                                    <path d="M10.591 2.512a3.75 3.75 0 0 1 2.818 0l7.498 3.04A1.75 1.75 0 0 1 22 7.174v9.652a1.75 1.75 0 0 1-1.093 1.622l-7.498 3.04a3.75 3.75 0 0 1-2.818 0l-7.498-3.04A1.75 1.75 0 0 1 2 16.826V7.175a1.75 1.75 0 0 1 1.093-1.622l7.498-3.04Zm2.254 1.39a2.25 2.25 0 0 0-1.69 0l-7.499 3.04a.25.25 0 0 0-.156.232v9.652a.25.25 0 0 0 .156.232l7.499 3.04a2.25 2.25 0 0 0 1.69 0l7.499-3.04a.25.25 0 0 0 .156-.232V7.175a.25.25 0 0 0-.156-.232l-7.499-3.04Z"/>
                                                  </svg>
                                                </div>
                                                <div class="altura-100-por-ciento anchura-100-por-ciento-menos-40-px">
                                                    <input type="text" class="input text-align-right" id="InputExistenciasNuevoProducto">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="anchura-100-por-ciento-con-padding-10px-lateral padding-10px-lateral margin-15px-auto-0px-auto altura-50-px flex flex-center">
                        <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-left">
                            <a class="boton boton-solo-letra" id="BotonAtrasPaginaCrearNuevoProducto">Atrás</a>
                        </div>
                        <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-right">
                            <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem min-width-110px position-relative borde-redondeado-5-px" id="BotonGuardarExistenciasSucursal">
                                <span>Continuar</span>
                            </a>
                        </div>
                    </div>
                </div>`)
}

function EventosBotonesPaginaCrearUsuario_1() {
    $("#BotonInformacionBasicaNuevoProducto, #BotonEditarInformacionBasicaNuevoProducto").click(function (e) {
        CargarPaginaCrearProducto(2)
    })

    $("#BotonAgregarImpuestosNuevoProducto, #BotonEditarImpuestosNuevoProducto").click(function (e) {
        CargarPaginaCrearProducto(3)
    })

    $("#BotonConfigurarPiezasNuevoProducto, #BotonEditarPiezasNuevoProducto").click(function (e) {
        CargarPaginaCrearProducto(4)
    })

    $("#BotonAgregarPreciosNuevoProducto, #BotonEditarPreciosNuevoProducto").click(function (e) {
        CargarPaginaCrearProducto(5)
    })
    $("#BotonAgregarExistenciasNuevoProducto, #BotonEditarExistenciasNuevoProducto").click(function (e) {
        CargarPaginaCrearProducto(6)
    })
}

function EventosBotonesPaginaCrearUsuario_2(callback) {
    limitarCaracteres("#InputDescripcionNuevoProducto");
    limitarCaracteres("#InputCodigoNuevoProducto", 13);
    $("#InputCodigoNuevoProducto").focus();

    $("#BotonGenerarCodigoNuevoProducto").click(function (e) {
        MostrarModal(
            ComponerModalCargando('Un momento por favor', 'auto', '400px'),
            false
        );
        const data = {
            accion: 'Generar_Codigo_Barras'
        };
        ajaxConParametros(undefined, data)
            .then(response => {
                response = JSON.parse(response);
                console.log(response);
                $("#InputCodigoNuevoProducto").val(response.codigo_barras);
                CerrarModal();
            })
            .catch(error => {
                const contenido = ComponerContenidoAdvertencia(
                    '../../icons/windows/eliminar.png',
                    'Error',
                    'Intenta más tarde'
                );
                console.log(error);
                MostrarModal(contenido, false);
                setTimeout(() => {
                    CerrarModal();
                }, 1000);
            });
    });

    MostrarModal(
        ComponerModalCargando('Obteniendo información', 'auto', '400px'),
        false
    );

    const data1 = {
        accion: 'Obtener_Unidades_Medida'
    };
    const data2 = {
        accion: 'Obtener_departamentos'
    };

    Promise.all([
            ajaxConParametros(undefined, data1),
            ajaxConParametros(undefined, data2)
        ])
        .then(([response1, response2]) => {
            const unidades = JSON.parse(response1);
            const departamentos = JSON.parse(response2);

            if (unidades.message !== 'No hay unidades de medida registradas.') {
                $("#ContenedorSelectUnidadNuevoProducto").html(`<select name="" id="SelectUnidadNuevoProducto"> </select>`);
                const $selectUnidad = $("#SelectUnidadNuevoProducto");
                $selectUnidad.empty();
                $selectUnidad.append(new Option('-- Selecciona una unidad --', ''));
                unidades.data.forEach(unidad => {
                    const texto = unidad.ID_Unidad_Venta ?
                        `${unidad.Descripcion} (${unidad.ID_Unidad_Venta})` :
                        unidad.Descripcion;
                    $selectUnidad.append(new Option(texto, unidad.ID));
                });
                $selectUnidad.select2({
                    placeholder: 'Buscar unidad de medida...',
                    allowClear: true
                });
            } else {
                $("#ContenedorSelectUnidadNuevoProducto").html(`<span>Primero registra una unidad</span>`);
            }

            if (departamentos.message === 'No hay departamentos registrados') {
                $("#ContenedorSelectDepartamentoNuevoProducto").html(`<span>Primero registra un departamento</span>`);
            } else {
                $("#ContenedorSelectDepartamentoNuevoProducto").html(`<select name="" id="SelectDepartamentoNuevoProducto"> </select>`);
                const $selectDepartamento = $("#SelectDepartamentoNuevoProducto");
                $selectDepartamento.empty();
                $selectDepartamento.append(new Option('-- Selecciona un departamento --', ''));
                departamentos.data.forEach(dep => {
                    const texto = dep.Nombre;
                    const valor = dep.ID;
                    $selectDepartamento.append(new Option(texto, valor));
                });
                $selectDepartamento.select2({
                    placeholder: 'Buscar departamento...',
                    allowClear: true
                });
            }

            CerrarModal();
            EventosSelect2();

            if (typeof callback === "function") {
                callback();
            }
        })
        .catch(error => {
            const contenido = ComponerContenidoAdvertencia(
                '../../icons/windows/eliminar.png',
                'Error',
                'Intenta más tarde'
            );
            console.log(error);
            MostrarModal(contenido, false);
            setTimeout(() => {
                CerrarModal();
                if (typeof callback === "function") {
                    callback();
                }
            }, 1000);
        });
}


function EventosBotonesPaginaCrearUsuario_3(callback) {
    MostrarModal(
        ComponerModalCargando('Obteniendo información', 'auto', '400px'),
        false
    );

    const $selectIVA = $("#SelectIVANuevoProducto");
    const $selectIEPS = $("#SelectIEPSNuevoProducto");

    fetch('../../json/tasas-impuestos.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const tasas = {
                ieps: Array.isArray(data.ieps) ? data.ieps : [],
                iva: Array.isArray(data.iva) ? data.iva : []
            };

            // === IVA ===
            $selectIVA.empty();
            $selectIVA.append(new Option('-- Selecciona una opción --', '', true, true));
            tasas.iva.forEach(item => {
                $selectIVA.append(new Option(item.text, item.value));
            });
            $selectIVA.select2({
                minimumResultsForSearch: Infinity,
                placeholder: 'Selecciona un porcentaje',
                allowClear: false
            });

            // === IEPS ===
            $selectIEPS.empty();
            $selectIEPS.append(new Option('-- Selecciona una opción --', '', true, true));
            tasas.ieps.forEach(item => {
                $selectIEPS.append(new Option(item.text, item.value));
            });
            $selectIEPS.select2({
                minimumResultsForSearch: Infinity,
                placeholder: 'Selecciona un porcentaje',
                allowClear: false
            });

            // === Eventos de los checkboxes ===
            $("#InputCheckIEPSNuevoProducto").off('change').on('change', function () {
                if ($(this).prop('checked')) {
                    $selectIEPS.prop("disabled", false);
                } else {
                    $selectIEPS.prop("disabled", true).val('').trigger('change');
                }
            });

            $("#InputCheckIVANuevoProducto").off('change').on('change', function () {
                if ($(this).prop('checked')) {
                    $selectIVA.prop("disabled", false);
                } else {
                    $selectIVA.prop("disabled", true).val('').trigger('change');
                }
            });

            EventosSelect2();
            CerrarModal();

            if (typeof callback === "function") {
                callback();
            }
        })
        .catch((error) => {
            console.error('Error al cargar tasas:', error);

            const contenido = ComponerContenidoAdvertencia(
                '../../icons/windows/eliminar.png',
                'Error',
                'No se pudieron cargar las tasas. Intenta más tarde.'
            );
            MostrarModal(contenido, false);
            setTimeout(() => {
                CerrarModal();
                if (typeof callback === "function") {
                    callback();
                }
            }, 1500);
        });
}


function EventosBotonesPaginaCrearUsuario_4() {
    if (InformacionBasicaProducto[0].TipoVenta == 'Unidad') {
        soloNumeros("input[name='InputPiezasNuevoProducto']")
        limitarCaracteres("input[name='InputPiezasNuevoProducto']", 6)
    } else {
        $("input[name='InputPiezasNuevoProducto']").on('input', soloNumerosYPunto);
        InputDecimal($("input[name='InputPiezasNuevoProducto']"))
    }

    $("#BotonInfinitoPiezasMayoreo").click(function (e) {
        if (!$(this).hasClass('disabled')) {
            var $input = $("#InputPiezasMaximoTipoMayoreo");

            if ($input.hasClass('disabled')) {
                // Si tiene la clase 'disabled', habilitarlo y asignar el valor 0.00
                $input.removeClass('disabled').prop('disabled', false).val('0.00').addClass('text-align-right').removeClass('text-align-center');
            } else {
                // Si no tiene la clase 'disabled', deshabilitarlo y asignar el valor infinito
                $input.addClass('disabled').prop('disabled', true).val('∞').addClass('text-align-center').removeClass('text-align-right');
            }
        }
    });

    $("#BotonInfinitoPiezasMenudeo").click(function (e) {
        var $input = $("#InputPiezasMaximoTipoMenudeo");

        if ($input.hasClass('disabled')) {
            // Si tiene la clase 'disabled', habilitarlo y asignar el valor 0.00
            $input.removeClass('disabled').prop('disabled', false).val('0.00').addClass('text-align-right').removeClass('text-align-center');
        } else {
            // Si no tiene la clase 'disabled', deshabilitarlo y asignar el valor infinito
            $input.addClass('disabled').prop('disabled', true).val('∞').addClass('text-align-center').removeClass('text-align-right');
        }
    })


    $("#CheckBoxNoAplicaMedioMayoreo").off('change').on('change', function (e) {
        if ($(this).prop('checked')) {
            // Si el checkbox está marcado, establecer los valores y deshabilitar los inputs
            $("#InputPiezasMinimoTipoMedioMayoreo").val('').prop('disabled', true);
            $("#InputPiezasMaximoTipoMedioMayoreo").val('').prop('disabled', true);
        } else {
            // Si el checkbox no está marcado, habilitar los inputs (puedes elegir no cambiar los valores)
            $("#InputPiezasMinimoTipoMedioMayoreo").prop('disabled', false);
            $("#InputPiezasMaximoTipoMedioMayoreo").prop('disabled', false);
        }
    });

    $("#CheckBoxNoAplicaMayoreo").off('change').on('change', function (e) {
        if ($(this).prop('checked')) {
            // Si el checkbox está marcado, establecer los valores y deshabilitar los inputs
            $("#InputPiezasMinimoTipoMayoreo").val('').prop('disabled', true);
            $("#InputPiezasMaximoTipoMayoreo").val('').prop('disabled', true);
            $("#BotonInfinitoPiezasMayoreo").addClass('disabled')
        } else {
            // Si el checkbox no está marcado, habilitar los inputs (puedes elegir no cambiar los valores)
            $("#InputPiezasMinimoTipoMayoreo").prop('disabled', false);
            $("#InputPiezasMaximoTipoMayoreo").prop('disabled', false);
            $("#BotonInfinitoPiezasMayoreo").removeClass('disabled')
        }
    });


    $("#InputPiezasMaximoTipoMenudeo").blur(function (e) {
        Sumar1aMinimoMaximo($("#InputPiezasMaximoTipoMenudeo"),$("#InputPiezasMinimoTipoMedioMayoreo"))
    })
    $("#InputPiezasMaximoTipoMedioMayoreo").blur(function (e) {
        Sumar1aMinimoMaximo($("#InputPiezasMaximoTipoMedioMayoreo"),$("#InputPiezasMinimoTipoMayoreo"))
    })

}

function EventosBotonesPaginaCrearUsuario_5() {

    const $inputPrecio = $("input[name='InputPreciosNuevoProducto']");
    const $precioCosto = $("#InputPrecioCostoNuevoProducto");
    const $precioCostoCaja = $("#InputPrecioCostoCajaNuevoProducto");
    const $piezasCaja = $("#InputPiezasCajaNuevoProducto");

    $("input[name='InputPreciosNuevoProducto']").on('input', soloNumerosYPunto);
    InputDecimal($("input[name='InputPreciosNuevoProducto']"))
    $("#InputPrecioCostoNuevoProducto").on('keyup', function (e) {
        $("#InputPrecioCostoCajaNuevoProducto, #InputPiezasCajaNuevoProducto").val('')
    })

    // Calcular precio unitario desde costo por caja y número de piezas
    $("#InputPrecioCostoCajaNuevoProducto, #InputPiezasCajaNuevoProducto").on('input', function () {
        const $precioCostoCaja = $("#InputPrecioCostoCajaNuevoProducto");
        const $piezasCaja = $("#InputPiezasCajaNuevoProducto");
        const $precioUnitario = $("#InputPrecioCostoNuevoProducto");

        CalcularPrecioCosto($precioCostoCaja, $piezasCaja, $precioUnitario);

        // Menudeo: siempre
        CalcularPrecio($("#InputGananciaMenudeoNuevoProducto"), $("#InputPrecioMenudeoNuevoProducto"));
        CalcularGanancia($("#InputPrecioMenudeoNuevoProducto"), $("#InputGananciaMenudeoNuevoProducto"));

        // Medio mayoreo: si existe
        if ($("#InputGananciaMedioMayoreoNuevoProducto").length && $("#InputPrecioMedioMayoreoNuevoProducto").length) {
            CalcularPrecio($("#InputGananciaMedioMayoreoNuevoProducto"), $("#InputPrecioMedioMayoreoNuevoProducto"));
            CalcularGanancia($("#InputPrecioMedioMayoreoNuevoProducto"), $("#InputGananciaMedioMayoreoNuevoProducto"));
        }

        // Mayoreo: si existe
        if ($("#InputGananciaMayoreoNuevoProducto").length && $("#InputPrecioMayoreoNuevoProducto").length) {
            CalcularPrecio($("#InputGananciaMayoreoNuevoProducto"), $("#InputPrecioMayoreoNuevoProducto"));
            CalcularGanancia($("#InputPrecioMayoreoNuevoProducto"), $("#InputGananciaMayoreoNuevoProducto"));
        }
    });


    // Cálculo de precio desde ganancia
    if ($("#InputGananciaMenudeoNuevoProducto").length && $("#InputPrecioMenudeoNuevoProducto").length) {
        $("#InputPrecioCostoNuevoProducto, #InputGananciaMenudeoNuevoProducto").on('input', function () {
            CalcularPrecio($("#InputGananciaMenudeoNuevoProducto"), $("#InputPrecioMenudeoNuevoProducto"));
        });

        $("#InputPrecioCostoNuevoProducto, #InputPrecioMenudeoNuevoProducto").on('input', function () {
            CalcularGanancia($("#InputPrecioMenudeoNuevoProducto"), $("#InputGananciaMenudeoNuevoProducto"));
        });
    }

    if ($("#InputGananciaMedioMayoreoNuevoProducto").length && $("#InputPrecioMedioMayoreoNuevoProducto").length) {
        $("#InputPrecioCostoNuevoProducto, #InputGananciaMedioMayoreoNuevoProducto").on('input', function () {
            CalcularPrecio($("#InputGananciaMedioMayoreoNuevoProducto"), $("#InputPrecioMedioMayoreoNuevoProducto"));
        });

        $("#InputPrecioCostoNuevoProducto, #InputPrecioMedioMayoreoNuevoProducto").on('input', function () {
            CalcularGanancia($("#InputPrecioMedioMayoreoNuevoProducto"), $("#InputGananciaMedioMayoreoNuevoProducto"));
        });
    }

    if ($("#InputGananciaMayoreoNuevoProducto").length && $("#InputPrecioMayoreoNuevoProducto").length) {
        $("#InputPrecioCostoNuevoProducto, #InputGananciaMayoreoNuevoProducto").on('input', function () {
            CalcularPrecio($("#InputGananciaMayoreoNuevoProducto"), $("#InputPrecioMayoreoNuevoProducto"));
        });

        $("#InputPrecioCostoNuevoProducto, #InputPrecioMayoreoNuevoProducto").on('input', function () {
            CalcularGanancia($("#InputPrecioMayoreoNuevoProducto"), $("#InputGananciaMayoreoNuevoProducto"));
        });
    }

}

function EventosBotonesPaginaCrearUsuario_6() {
    $("#InputExistenciasNuevoProducto").on('input', soloNumerosYPunto);
    InputDecimal($("#InputExistenciasNuevoProducto"))
}

function EventosBotonesPaginaCrearProducto() {
    $("#BotonGuardarInformacionBasicaNuevoProducto").click(function (e) {
        // Evitar que la acción por defecto del botón suceda si hay errores
        e.preventDefault();

        // Variables para almacenar los campos de entrada
        var codigo = $("#InputCodigoNuevoProducto").val().trim();
        var descripcion = $("#InputDescripcionNuevoProducto").val().trim();
        var departamento = $("#SelectDepartamentoNuevoProducto").val();
        var unidad = $("#SelectUnidadNuevoProducto").val();
        var tipoVenta = $('input[name="InputRadioTipoVenta"]:checked').val(); // Obtener el valor del radio seleccionado

        // Validaciones
        if (codigo.length === 0) {
            mostrarAdvertencia('Ingresa o genera el código de barras');
        } else if (descripcion.length === 0) {
            mostrarAdvertencia('Ingresa la descripción del producto');
        } else if (!departamento) {
            mostrarAdvertencia('Selecciona un departamento');
        } else if (!unidad) {
            mostrarAdvertencia('Selecciona una unidad de venta');
        } else if (!tipoVenta) {
            mostrarAdvertencia('Selecciona una forma de venta');
        } else {
            ContenidoPaginaGuardando($("#ContenedorContenidoPaginaCrearProducto"))
            var productoData = {
                Codigo: codigo,
                Descripcion: descripcion,
                Departamento: departamento,
                Unidad: unidad,
                TipoVenta: tipoVenta
            };

            setTimeout(() => {
                upsertArray(productoData, InformacionBasicaProducto)
                    .then(result => {
                        ContenidoPaginaGuardado(true, 'Información agregada', $("#ContenedorContenidoPaginaCrearProducto"))
                        setTimeout(() => {
                            if (InformacionImpuestosProducto.length == 0) {
                                ModalPreguntaImpuestos()
                            } else {
                                NumeroTarjetaSeleccionada = 3
                                CargarPaginaCrearProducto(1)
                            }
                        }, 1000);
                    })
                    .catch(error => {
                        // En caso de error, mostrar mensaje y reiniciar página
                        ContenidoPaginaGuardado(false, 'Error al agregar información', $("#ContenedorContenidoPaginaCrearProducto"));
                        console.log(error);
                        CargarPaginaCrearProducto(1);
                    });
            }, 1000)
        }
    });

    $("#BotonGuardarImpuestosNuevoProducto").click(function (e) {
        const checkIVA = $('#InputCheckIVANuevoProducto').is(':checked');
        const selectIVA = $('#SelectIVANuevoProducto').val() || 0;

        const checkIEPS = $('#InputCheckIEPSNuevoProducto').is(':checked');
        const selectIEPS = $('#SelectIEPSNuevoProducto').val() || 0;

        if (checkIVA && selectIVA === '') {
            mostrarAdvertencia('Selecciona un porcentaje de I.V.A.')
        } else if (checkIEPS && selectIEPS === '') {
            mostrarAdvertencia('Selecciona un porcentaje de I.E.P.S.')
        } else {
            ContenidoPaginaGuardando($("#ContenedorContenidoPaginaCrearProducto"))
            var ImpuestosData = {
                'I.V.A.': selectIVA,
                'I.E.P.S.': selectIEPS
            };

            setTimeout(() => {
                upsertArray(ImpuestosData, InformacionImpuestosProducto)
                    .then(result => {
                        ContenidoPaginaGuardado(true, 'Información agregada', $("#ContenedorContenidoPaginaCrearProducto"))
                        setTimeout(() => {
                            NumeroTarjetaSeleccionada = 3
                            CargarPaginaCrearProducto(1)
                        }, 1000);
                    })
                    .catch(error => {
                        // En caso de error, mostrar mensaje y reiniciar página
                        ContenidoPaginaGuardado(false, 'Error al agregar información', $("#ContenedorContenidoPaginaCrearProducto"));
                        console.log(error);
                        CargarPaginaCrearProducto(1);
                    });
            }, 1000)
        }

    })
    $("#BotonGuardarPiezasNuevoProducto").click(function (e) {
        // Obtener valores de inputs
        const piezasMinMenudeo = $("#InputPiezasMinimoTipoMenudeo").val().trim();
        const piezasMaxMenudeo = $("#InputPiezasMaximoTipoMenudeo").val().trim();
        const piezasMinMedioMayoreo = $("#InputPiezasMinimoTipoMedioMayoreo").val().trim();
        const piezasMaxMedioMayoreo = $("#InputPiezasMaximoTipoMedioMayoreo").val().trim();
        const piezasMinMayoreo = $("#InputPiezasMinimoTipoMayoreo").val().trim();
        const piezasMaxMayoreo = $("#InputPiezasMaximoTipoMayoreo").val().trim();

        // Estados de los checkboxes
        const aplicaMedioMayoreo = !$("#CheckBoxNoAplicaMedioMayoreo").is(":checked");
        const aplicaMayoreo = !$("#CheckBoxNoAplicaMayoreo").is(":checked");

        // Validación de campos vacíos
        if (piezasMinMenudeo === '') {
            mostrarAdvertencia('Ingresa el mínimo de piezas para menudeo');
            return;
        }
        if (piezasMaxMenudeo === '') {
            mostrarAdvertencia('Ingresa el máximo de piezas para menudeo');
            return;
        }

        // Convertir a número, soportando símbolo de infinito
        const parseValor = (valor) => {
            return valor === '∞' || valor.toLowerCase() === 'infinito' ? Infinity : parseFloat(valor);
        };

        const minMenudeo = parseValor(piezasMinMenudeo);
        const maxMenudeo = parseValor(piezasMaxMenudeo);

        if (minMenudeo >= maxMenudeo) {
            mostrarAdvertencia('El mínimo de piezas para menudeo debe ser menor al máximo');
            return;
        }

        let minMedioMayoreo = null,
            maxMedioMayoreo = null;
        if (aplicaMedioMayoreo) {
            if (piezasMinMedioMayoreo === '') {
                mostrarAdvertencia('Ingresa el mínimo de piezas para medio mayoreo');
                return;
            }
            if (piezasMaxMedioMayoreo === '') {
                mostrarAdvertencia('Ingresa el máximo de piezas para medio mayoreo');
                return;
            }

            minMedioMayoreo = parseValor(piezasMinMedioMayoreo);
            maxMedioMayoreo = parseValor(piezasMaxMedioMayoreo);

            if (minMedioMayoreo >= maxMedioMayoreo) {
                mostrarAdvertencia('El mínimo de medio mayoreo debe ser menor al máximo');
                return;
            }

            if (minMedioMayoreo <= maxMenudeo) {
                mostrarAdvertencia('El mínimo de medio mayoreo debe ser mayor al máximo de menudeo');
                return;
            }
        }

        let minMayoreo = null,
            maxMayoreo = null;
        if (aplicaMayoreo) {
            if (piezasMinMayoreo === '') {
                mostrarAdvertencia('Ingresa el mínimo de piezas para mayoreo');
                return;
            }
            if (piezasMaxMayoreo === '') {
                mostrarAdvertencia('Ingresa el máximo de piezas para mayoreo');
                return;
            }

            minMayoreo = parseValor(piezasMinMayoreo);
            maxMayoreo = parseValor(piezasMaxMayoreo);

            if (minMayoreo >= maxMayoreo) {
                mostrarAdvertencia('El mínimo de mayoreo debe ser menor al máximo');
                return;
            }

            if (aplicaMedioMayoreo) {
                if (minMayoreo <= maxMedioMayoreo) {
                    mostrarAdvertencia('El mínimo de mayoreo debe ser mayor al máximo de medio mayoreo');
                    return;
                }
            } else {
                if (minMayoreo <= maxMenudeo) {
                    mostrarAdvertencia('El mínimo de mayoreo debe ser mayor al máximo de menudeo');
                    return;
                }
            }
        }

        // Preparar los datos para guardar
        ContenidoPaginaGuardando($("#ContenedorContenidoPaginaCrearProducto"));
        const dataPiezas = {
            menudeo: {
                tipo: 'Menudeo',
                min: minMenudeo,
                max: maxMenudeo
            },
            medio: aplicaMedioMayoreo ? {
                tipo: 'Medio Mayoreo',
                min: minMedioMayoreo,
                max: maxMedioMayoreo
            } : null,
            mayoreo: aplicaMayoreo ? {
                tipo: 'Mayoreo',
                min: minMayoreo,
                max: maxMayoreo
            } : null
        };

        setTimeout(() => {
            upsertArray(dataPiezas, InformacionPiezasProducto)
                .then(result => {
                    ContenidoPaginaGuardado(true, 'Información agregada', $("#ContenedorContenidoPaginaCrearProducto"));
                    setTimeout(() => {
                        NumeroTarjetaSeleccionada = 4;
                        CargarPaginaCrearProducto(1);
                    }, 1000);
                })
                .catch(error => {
                    ContenidoPaginaGuardado(false, 'Error al agregar información', $("#ContenedorContenidoPaginaCrearProducto"));
                    console.log(error);
                    CargarPaginaCrearProducto(1);
                });
        }, 1000);
    });

    $("#BotonGuardarPreciosNuevoProducto").click(function (e) {
        // Evita comportamiento por defecto (por si es botón de tipo submit)
        e.preventDefault();

        // Campos requeridos
        const $inputCosto = $("#InputPrecioCostoNuevoProducto");
        const $inputGananciaMenudeo = $("#InputGananciaMenudeoNuevoProducto");
        const $inputPrecioMenudeo = $("#InputPrecioMenudeoNuevoProducto");

        // Validaciones obligatorias
        if (!$inputCosto.val().trim()) {
            mostrarAdvertencia("Ingresa el costo del producto");
            return;
        }

        if (!$inputGananciaMenudeo.val().trim()) {
            mostrarAdvertencia("Ingresa la ganancia de menudeo");
            return;
        }

        if (!$inputPrecioMenudeo.val().trim()) {
            mostrarAdvertencia("Ingresa el precio de menudeo");
            return;
        }

        // Validar campos opcionales si existen en el DOM
        const $inputGananciaMedio = $("#InputGananciaMedioMayoreoNuevoProducto");
        const $inputPrecioMedio = $("#InputPrecioMedioMayoreoNuevoProducto");
        const aplicaMedioMayoreo = $inputGananciaMedio.length && $inputPrecioMedio.length;

        if (aplicaMedioMayoreo) {
            if (!$inputGananciaMedio.val().trim()) {
                mostrarAdvertencia("Ingresa la ganancia para medio mayoreo");
                return;
            }
            if (!$inputPrecioMedio.val().trim()) {
                mostrarAdvertencia("Ingresa el precio medio mayoreo");
                return;
            }
        }

        const $inputGananciaMayoreo = $("#InputGananciaMayoreoNuevoProducto");
        const $inputPrecioMayoreo = $("#InputPrecioMayoreoNuevoProducto");
        const aplicaMayoreo = $inputGananciaMayoreo.length && $inputPrecioMayoreo.length;

        if (aplicaMayoreo) {
            if (!$inputGananciaMayoreo.val().trim()) {
                mostrarAdvertencia("Ingresa la ganancia para mayoreo");
                return;
            }
            if (!$inputPrecioMayoreo.val().trim()) {
                mostrarAdvertencia("Ingresa el precio para mayoreo");
                return;
            }
        }

        ContenidoPaginaGuardando($("#ContenedorContenidoPaginaCrearProducto"));
        const parseInput = ($el) => parseFloat($el.val()) || 0;

        const dataPrecios = {
            costo: parseInput($inputCosto),
            menudeo: {
                tipo: "Menudeo",
                precio: parseInput($inputPrecioMenudeo),
                ganancia: parseInput($inputGananciaMenudeo)
            },
            medio: aplicaMedioMayoreo ? {
                tipo: "Medio Mayoreo",
                precio: parseInput($inputPrecioMedio),
                ganancia: parseInput($inputGananciaMedio)
            } : null,
            mayoreo: aplicaMayoreo ? {
                tipo: "Mayoreo",
                precio: parseInput($inputPrecioMayoreo),
                ganancia: parseInput($inputGananciaMayoreo)
            } : null
        };

        setTimeout(() => {
            upsertArray(dataPrecios, InformacionPreciosProducto)
                .then(result => {
                    ContenidoPaginaGuardado(true, 'Información agregada', $("#ContenedorContenidoPaginaCrearProducto"))
                    setTimeout(() => {
                        ModalPreguntaExistencias()
                    }, 1000);
                })
                .catch(error => {
                    // En caso de error, mostrar mensaje y reiniciar página
                    ContenidoPaginaGuardado(false, 'Error al agregar información', $("#ContenedorContenidoPaginaCrearProducto"));
                    console.log(error);
                    CargarPaginaCrearProducto(1);
                });
        }, 1000)
    });

    $("#BotonGuardarExistenciasSucursal").click(function (e) {
        if ($("#InputExistenciasNuevoProducto").val().length == 0) {
            mostrarAdvertencia('Ingresa las existencias en esta sucursal')
        } else {
            var existencias = $("#InputExistenciasNuevoProducto").val()
            ContenidoPaginaGuardando($("#ContenedorContenidoPaginaCrearProducto"))
            var DataExistencias = {
                'Existencias_Sucursal': existencias,
            };
            setTimeout(() => {
                upsertArray(DataExistencias, ExistenciasEstaSucursal)
                    .then(result => {
                        CargarInformacionABaseDatos()
                    })
                    .catch(error => {
                        // En caso de error, mostrar mensaje y reiniciar página
                        ContenidoPaginaGuardado(false, 'Error al agregar información', $("#ContenedorContenidoPaginaCrearProducto"));
                        console.log(error);
                        CargarPaginaCrearProducto(1);
                    });
            }, 1000)
        }
    })


    $("#BotonAtrasPaginaCrearNuevoProducto").click(function (e) {
        CargarPaginaCrearProducto(1)
    })


    // Función para mostrar advertencias en el modal
    function mostrarAdvertencia(mensaje) {
        var contenido = ComponerContenidoAdvertencia(imagenAdvertenciaNuevoProducto, tituloError, mensaje);
        MostrarModal(contenido);
    }

}

function ModalPreguntaImpuestos() {
    MostrarModal(ComponerModalConfirmarAccion('<img src="../../icons/windows/moneda.png" class=" altura-80-por-ciento">', '¿El producto tiene impuestos?', 'Selecciona una opción', 'auto', '400px'), false);
    $("#BotonRespuestaSiAccionModal").click(function (e) {
        CerrarModal()
        NumeroTarjetaSeleccionada = 2
        CargarPaginaCrearProducto(1)
    })

    $("#BotonRespuestaNoAccionModal").click(function (e) {
        CerrarModal()
        ContenidoPaginaGuardando($("#ContenedorContenidoPaginaCrearProducto"))
        var ImpuestosData = {
            'I.V.A.': 0,
            'I.E.P.S.': 0
        };

        setTimeout(() => {
            upsertArray(ImpuestosData, InformacionImpuestosProducto)
                .then(result => {
                    ContenidoPaginaGuardado(true, 'Información agregada', $("#ContenedorContenidoPaginaCrearProducto"))
                    setTimeout(() => {
                        NumeroTarjetaSeleccionada = 3
                        CargarPaginaCrearProducto(1)
                    }, 1000);
                })
                .catch(error => {
                    // En caso de error, mostrar mensaje y reiniciar página
                    ContenidoPaginaGuardado(false, 'Error al agregar información', $("#ContenedorContenidoPaginaCrearProducto"));
                    console.log(error);
                    CargarPaginaCrearProducto(1);
                });
        }, 1000)

    })
}



function CalcularPrecioCosto(inputCostoCaja, inputPiezasCaja, inputCostoUnidad) {
    const costoCajaStr = inputCostoCaja.val().trim();
    const piezasCajaStr = inputPiezasCaja.val().trim();

    if (costoCajaStr === '' || piezasCajaStr === '') return;

    const costoCaja = parseFloat(costoCajaStr);
    const piezasCaja = parseFloat(piezasCajaStr);

    // Validaciones
    if (isNaN(costoCaja) || isNaN(piezasCaja)) {
        return;
    }

    if (piezasCaja <= 0) {
        return;
    }

    const costoUnidad = costoCaja / piezasCaja;

    // Redondear a dos decimales y asignar
    inputCostoUnidad.val(costoUnidad.toFixed(2));
}

function CalcularPrecio(inputGanancia, inputPrecio) {
    const costoStr = $("#InputPrecioCostoNuevoProducto").val().trim();
    const gananciaStr = inputGanancia.val().trim();

    if (costoStr === '' || gananciaStr === '') return;

    const costo = parseFloat(costoStr);
    const ganancia = parseFloat(gananciaStr);

    if (isNaN(costo) || isNaN(ganancia)) {
        console.warn('Valores inválidos en costo o ganancia');
        return;
    }

    const precioFinal = costo + (costo * ganancia / 100);
    inputPrecio.val(precioFinal.toFixed(2));
}

function CalcularGanancia(inputPrecio, inputGanancia) {
    const precioCostoStr = $('#InputPrecioCostoNuevoProducto').val().trim();
    const precioVentaStr = inputPrecio.val().trim();

    if (precioCostoStr === '' || precioVentaStr === '') return;

    const costo = parseFloat(precioCostoStr);
    const venta = parseFloat(precioVentaStr);

    if (isNaN(costo) || isNaN(venta) || costo === 0) {
        console.warn('Costo inválido o cero');
        return;
    }

    const ganancia = ((venta - costo) / costo) * 100;
    inputGanancia.val(ganancia.toFixed(2));
}

function ModalPreguntaExistencias() {
    MostrarModal(ComponerModalConfirmarAccion('<img src="../../icons/basic/caja.png" class=" altura-80-por-ciento">', '¿Quieres agregar existencias para esta sucursal?', 'Selecciona una opción', 'auto', '400px'), false);
    $("#BotonRespuestaSiAccionModal").click(function (e) {
        CerrarModal()
        NumeroTarjetaSeleccionada = 5
        CargarPaginaCrearProducto(1)
    })

    $("#BotonRespuestaNoAccionModal").click(function (e) {
        CerrarModal()
        ContenidoPaginaGuardando($("#ContenedorContenidoPaginaCrearProducto"))
        var DataExistencias = {
            'Existencias_Sucursal': 0,
        };

        setTimeout(() => {
            upsertArray(DataExistencias, ExistenciasEstaSucursal)
                .then(result => {
                    CargarInformacionABaseDatos()
                })
                .catch(error => {
                    // En caso de error, mostrar mensaje y reiniciar página
                    ContenidoPaginaGuardado(false, 'Error al agregar información', $("#ContenedorContenidoPaginaCrearProducto"));
                    console.log(error);
                    CargarPaginaCrearProducto(1);
                });
        }, 1000)

    })
}

function CargarInformacionABaseDatos() {
    ContenidoPaginaGuardando($("#ContenedorContenidoPaginaCrearProducto"))
    var array = InformacionBasicaProducto.concat(InformacionImpuestosProducto, InformacionPiezasProducto, InformacionPreciosProducto, ExistenciasEstaSucursal);
    const accion = 'Crear_Nuevo_Producto';
    console.log(array)
    const data = {
        accion: accion,
        data: array
    };
    ajaxConParametros(undefined, data)
        .then(response => {
            response = JSON.parse(response)
            EliminarLoader()
            if (response.success) {
                ContenidoPaginaGuardado(true, 'Producto creado', $("#ContenedorContenidoPaginaCrearProducto"))
                window.parent.postMessage({
                    tipo: 'producto-creado',
                    data: {
                        mensaje: 'El producto ha sido registrado correctamente'
                    }
                }, '*');
            } else {
                ContenidoPaginaGuardado(false, 'Ocurrió un error', $("#ContenedorContenidoPaginaCrearProducto"))
                console.log(response.message)
                setTimeout(() => {
                    CargarPaginaCrearProducto(1);
                }, 1000);
            }
        })
        .catch(error => {
            NumeroTarjetaSeleccionada = 1
            ContenidoPaginaGuardado(false, error, $("#ContenedorContenidoPaginaCrearProducto"))
            console.log(error)
            InformacionBasicaProducto = []
            InformacionImpuestosProducto = []
            InformacionPiezasProducto = []
            InformacionPreciosProducto = []
            ExistenciasEstaSucursal = []
            CargarPaginaCrearProducto(1);
        });
}

function LLenadoPaginaCrearProducto_2() {
    if (!Array.isArray(InformacionBasicaProducto) || InformacionBasicaProducto.length === 0) {
        console.warn("No hay información básica del producto para llenar.");
        return;
    }

    const producto = InformacionBasicaProducto[0];

    // Llenar inputs de texto
    $("#InputCodigoNuevoProducto").val(producto.Codigo);
    $("#InputDescripcionNuevoProducto").val(producto.Descripcion);

    // Llenar selects y asegurarse de que select2 dispare el cambio
    $("#SelectDepartamentoNuevoProducto").val(producto.Departamento).trigger("change");
    $("#SelectUnidadNuevoProducto").val(producto.Unidad).trigger("change");

    // Llenar tipo de venta
    if (producto.TipoVenta === 'Granel' || producto.TipoVenta === 'Unidad') {
        $(`input[name='InputRadioTipoVenta'][value='${producto.TipoVenta}']`).prop("checked", true);
    } else {
        console.warn("Tipo de venta desconocido:", producto.TipoVenta);
    }
}

function LLenadoPaginaCrearProducto_3() {
    if (InformacionImpuestosProducto.length !== 0) {
        const iva = InformacionImpuestosProducto[0]['I.V.A.'];
        const ieps = InformacionImpuestosProducto[0]['I.E.P.S.'];

        if (iva !== 0) {
            $("#InputCheckIVANuevoProducto").prop('checked', true).trigger('change');
            $("#SelectIVANuevoProducto").val(iva).trigger('change');
        }
        else
        {
            $("#InputCheckIVANuevoProducto").prop('checked', false).trigger('change');
            $("#SelectIVANuevoProducto").val('').trigger('change');
        }

        if (ieps !== 0) {
            $("#InputCheckIEPSNuevoProducto").prop('checked', true).trigger('change');
            $("#SelectIEPSNuevoProducto").val(ieps).trigger('change');
        }
        else
        {
            $("#InputCheckIEPSNuevoProducto").prop('checked', false).trigger('change');
            $("#SelectIEPSNuevoProducto").val('').trigger('change');
        }
    }
}

function LLenadoPaginaCrearProducto_4() {
    console.log(InformacionPiezasProducto);

    if (InformacionPiezasProducto.length !== 0) {
        const info = InformacionPiezasProducto[0];

        // === Menudeo ===
        if (info.menudeo) {
            $("#InputPiezasMinimoTipoMenudeo").val(info.menudeo.min);
            $("#InputPiezasMaximoTipoMenudeo").val(info.menudeo.max);
        }

        // === Medio Mayoreo ===
        if (info.medio) {
            $("#InputPiezasMinimoTipoMedioMayoreo").val(info.medio.min);
            $("#InputPiezasMaximoTipoMedioMayoreo").val(info.medio.max);
            $("#CheckBoxNoAplicaMedioMayoreo").prop("checked", false);
        } else {
            $("#InputPiezasMinimoTipoMedioMayoreo").val('');
            $("#InputPiezasMaximoTipoMedioMayoreo").val('');
            $("#CheckBoxNoAplicaMedioMayoreo").prop("checked", true);
        }

        // === Mayoreo ===
        if (info.mayoreo) {
            $("#InputPiezasMinimoTipoMayoreo").val(info.mayoreo.min);
            $("#InputPiezasMaximoTipoMayoreo").val(info.mayoreo.max);
            $("#CheckBoxNoAplicaMayoreo").prop("checked", false);
        } else {
            $("#InputPiezasMinimoTipoMayoreo").val('');
            $("#InputPiezasMaximoTipoMayoreo").val('');
            $("#CheckBoxNoAplicaMayoreo").prop("checked", true);
        }
    }
}

function LLenadoPaginaCrearProducto_5() {
    if (InformacionPreciosProducto.length !== 0) {
        const info = InformacionPreciosProducto[0];

        // Helper para redondear o devolver string vacío
        const format = (val) => (typeof val === 'number' ? val.toFixed(2) : '');

        // === Costo ===
        $("#InputPrecioCostoNuevoProducto").val(format(info.costo));

        // === Menudeo ===
        if (info.menudeo) {
            $("#InputGananciaMenudeoNuevoProducto").val(format(info.menudeo.ganancia));
            $("#InputPrecioMenudeoNuevoProducto").val(format(info.menudeo.precio));
        } else {
            $("#InputGananciaMenudeoNuevoProducto").val('');
            $("#InputPrecioMenudeoNuevoProducto").val('');
        }

        // === Medio Mayoreo ===
        if (info.medio) {
            $("#InputGananciaMedioMayoreoNuevoProducto").val(format(info.medio.ganancia));
            $("#InputPrecioMedioMayoreoNuevoProducto").val(format(info.medio.precio));
        } else {
            $("#InputGananciaMedioMayoreoNuevoProducto").val('');
            $("#InputPrecioMedioMayoreoNuevoProducto").val('');
        }

        // === Mayoreo ===
        if (info.mayoreo) {
            $("#InputGananciaMayoreoNuevoProducto").val(format(info.mayoreo.ganancia));
            $("#InputPrecioMayoreoNuevoProducto").val(format(info.mayoreo.precio));
        } else {
            $("#InputGananciaMayoreoNuevoProducto").val('');
            $("#InputPrecioMayoreoNuevoProducto").val('');
        }
    }
}

function Sumar1aMinimoMaximo(Entrada, Salida) {
    const tipoVenta = InformacionBasicaProducto[0]['TipoVenta'];
    let valor = parseFloat($(Entrada).val());

    if (isNaN(valor)) valor = 0;

    let nuevoValor;

    if (tipoVenta === 'Unidad') {
        nuevoValor = Math.ceil(valor) + 1; // Asegura entero y suma 1
    } else if (tipoVenta === 'Granel') {
        nuevoValor = (valor + 0.1).toFixed(2); // Suma 0.01 para evitar igualdad
    }

    $(Salida).val(nuevoValor);
}
