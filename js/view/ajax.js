function ajaxConParametros(url='../../ajax/controlador.php', datos) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        type: 'POST',
        data: datos,
        success: function(response) {
          resolve(response);  // La promesa se resuelve con la respuesta del servidor
        },
        error: function(xhr, status, error) {
          reject(error);  // La promesa se rechaza si ocurre un error
        }
      });
    });
  }
  
  function ajaxSinParametros(url) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function(response) {
          resolve(response);  // La promesa se resuelve con la respuesta del servidor
        },
        error: function(xhr, status, error) {
          reject(error);  // La promesa se rechaza si ocurre un error
        }
      });
    });
  }
  