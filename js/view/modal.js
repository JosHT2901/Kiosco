let permitirCerrarModal = true;
function MostrarModal(contenido, botonCerrar = true,transparencia=true) {
  permitirCerrarModal = botonCerrar;
  $('html').addClass('no-scroll');
  $("#TarjetaModal").css('height', '').css('width', '');
  $("#ContenedorContenidoModal").html(contenido)

  var background;
  if (transparencia) {
    background = 'rgba(0, 0, 0, 0.7)';
  } else {
    background = 'white';
  }
  $("#modal-advertencia").css('background', background);
  $('#modal-advertencia').fadeIn(200);
  
  $("#TarjetaModal").addClass('anchura-400-px')
  if (window.self !== window.top) {
    // Estamos dentro de un iframe
    $("#ContenedorModal").removeClass('min-height-650px');
  }
  else
  {
    $("#ContenedorModal").addClass('min-height-600px');
  }
  if (botonCerrar) {
    $("#ContenedorBotonCerrarModal").html(`<a class="boton altura-35-px anchura-35-px tarjeta-hover borde-redondeado-50-por-ciento flex flex-center" id="modal-cerrar">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="m4.21 4.387.083-.094a1 1 0 0 1 1.32-.083l.094.083L12 10.585l6.293-6.292a1 1 0 1 1 1.414 1.414L13.415 12l6.292 6.293a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.32.083l-.094-.083L12 13.415l-6.293 6.292a1 1 0 0 1-1.414-1.414L10.585 12 4.293 5.707a1 1 0 0 1-.083-1.32l.083-.094-.083.094Z" />
                    </svg>
                </a>`)
    $('#modal-cerrar').click(function () {
      CerrarModal()
    });
  } else {
    $("#ContenedorBotonCerrarModal").html('')
  }
}

$(document).ready(function () {
  $('#modal-advertencia, #ContenedorModal').click(function (e) {
    if (e.target === this && permitirCerrarModal) {
      $('html').removeClass('no-scroll');
      $("#modal-advertencia").fadeOut(200);
    }
  });
});


function ComponerContenidoAdvertencia(imagenError, titulo, subtitulo) {
  var contenido = `<div class="anchura-100-por-ciento altura-150-px flex flex-center">
                    <img src="${imagenError}" class="altura-80-por-ciento">
                   </div>
                    <div class="anchura-100-por-ciento altura-30-px margin-10-px-auto flex flex-center">
                            <span class="font-11-rem" style="font-weight: 700;">${titulo}</span>
                    </div>
                    <div class="anchura-100-por-ciento font-09-rem margin-10-px-auto flex flex-center">
                        <span>${subtitulo}</span>
                    </div>`
  return contenido
}

function ComponerModalCargando(titulo, altura, anchura) {
  var contenido = `<div class="anchura-100-por-ciento flex flex-center" style="width:${anchura}; height:${altura}">
            <div class="anchura-100-por-ciento altura-100-por-ciento top-0 left-0 bg-color-white z-index-10000 borde-redondeado-5-px" style="padding:10px 0px">
              <div class="anchura-100-por-ciento altura-70-px flex flex-center margin-10-px-auto">
                <div class="loader"></div>
              </div>
                <div class="anchura-100-por-ciento altura-30-px margin-10-px-auto flex flex-center">
                            <span class="font-11-rem" style="font-weight: 700;">${titulo}</span>
                    </div>
            </div>
             
   </div>`
  return contenido
}

function CerrarModal() {
  $('#modal-advertencia').fadeOut(200);
  $('#BotonCancelarAccionModal').off();
  $('#BotonConfirmarAccionModal').off();
  $('html').removeClass('no-scroll');
}

function AbrirModalIframe(url, height) {
  $('html').addClass('no-scroll');
  $('#modal-advertencia').fadeIn(200);
  $("#TarjetaModal").css({
    'height': height,
    'width': '500px'
  })
  $("#ContenedorContenidoModal").html('<iframe class="iframe-modal" src="' + url + '"></iframe>')
  $("#ContenedorBotonCerrarModal").html(`<a class="boton altura-35-px anchura-35-px tarjeta-hover borde-redondeado-50-por-ciento flex flex-center" id="modal-cerrar">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="m4.21 4.387.083-.094a1 1 0 0 1 1.32-.083l.094.083L12 10.585l6.293-6.292a1 1 0 1 1 1.414 1.414L13.415 12l6.292 6.293a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.32.083l-.094-.083L12 13.415l-6.293 6.292a1 1 0 0 1-1.414-1.414L10.585 12 4.293 5.707a1 1 0 0 1-.083-1.32l.083-.094-.083.094Z" />
                    </svg>
                </a>`)
  $('#modal-cerrar').click(function () {
    CerrarModal()
  });
}

function CerrarModalPadre() {
  parent.$('#modal-advertencia').fadeOut(200);
}

function ComponerModalPregunta(titulo, subtitulo, altura, anchura) {
  var contenido = `<div class="anchura-100-por-ciento flex flex-center" style="width:${anchura}; height:${altura}">
  <div class="anchura-100-por-ciento altura-100-por-ciento top-0 left-0 bg-color-white z-index-10000 borde-redondeado-5-px" style="padding:10px 0px">
    <div class="anchura-100-por-ciento flex flex-center margin-10-px-auto" style="height:100px">
      <img src="../../icons/basic/pregunta.png" class="altura-80-por-ciento">
    </div>
      <div class="anchura-100-por-ciento altura-30-px margin-10-px-auto flex flex-center">
                  <span class="font-11-rem" style="font-weight: 700;">${titulo}</span>
      </div>
      <div class="anchura-100-por-ciento altura-30-px margin-10-px-auto flex flex-center">
                  <span class="font-09-rem"">${subtitulo}</span>
      </div>
      <div class=" anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral altura-50-px flex flex-center">
          <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-left">
              <a class="boton boton-solo-letra" id="BotonCancelarAccionModal">Cancelar</a>
          </div>
          <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-right">
                      <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem min-width-110px position-relative borde-redondeado-5-px" id="BotonConfirmarAccionModal">
                                <span>Continuar</span>
                            </a>
          </div>
      </div>
  </div>
   
</div>`
  return contenido
}

function ComponerModalConfirmarAccion(imagen, titulo, subtitulo, altura, anchura) {
  var contenido = `<div class="anchura-100-por-ciento flex flex-center" style="width:${anchura}; height:${altura}">
  <div class="anchura-100-por-ciento altura-100-por-ciento top-0 left-0 bg-color-white z-index-10000 borde-redondeado-5-px" style="padding:10px 0px">
    <div class="anchura-100-por-ciento flex flex-center margin-10-px-auto" style="height:100px">
      ${imagen}
    </div>
      <div class="anchura-100-por-ciento altura-30-px margin-10-px-auto flex flex-center">
                  <span class="font-11-rem" style="font-weight: 700;">${titulo}</span>
      </div>
      <div class="anchura-100-por-ciento altura-30-px margin-10-px-auto flex flex-center">
                  <span class="font-09-rem"">${subtitulo}</span>
      </div>
      <div class=" anchura-100-por-ciento-con-padding-5px-lateral padding-5px-lateral altura-50-px flex flex-center">
          <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-left">
                      <a class="boton altura-35-px padding-10px-lateral boton-secundario bg-color-boton-secundario flex flex-center font-09-rem min-width-110px position-relative borde-redondeado-5-px" id="BotonRespuestaNoAccionModal">
                          <span>No</span>
                      </a>
          </div>
          <div class="anchura-50-por-ciento altura-100-por-ciento flex flex-right">
                      <a class="boton altura-35-px padding-10px-lateral boton-importante flex flex-center font-09-rem min-width-110px position-relative borde-redondeado-5-px" id="BotonRespuestaSiAccionModal">
                          <span>Sí</span>
                      </a>
          </div>
      </div>
  </div>
   
</div>`
  return contenido
}