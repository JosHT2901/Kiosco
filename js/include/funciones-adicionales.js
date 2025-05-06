function encriptarAES(textoPlano, clave32) {
    const key = CryptoJS.enc.Utf8.parse(clave32);
    const iv = CryptoJS.lib.WordArray.random(16); // 16 bytes

    const encrypted = CryptoJS.AES.encrypt(textoPlano, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    // Combinar IV + contenido cifrado
    const combinado = iv.concat(encrypted.ciphertext);
    return CryptoJS.enc.Base64.stringify(combinado);
}
function desencriptarAES(tokenBase64, clave32) {
    try {
        const key = CryptoJS.enc.Utf8.parse(clave32);
        const datos = CryptoJS.enc.Base64.parse(tokenBase64);

        // Separar IV (primeros 16 bytes) y contenido cifrado (resto)
        const iv = CryptoJS.lib.WordArray.create(datos.words.slice(0, 4)); // 4 palabras = 16 bytes
        const ciphertext = CryptoJS.lib.WordArray.create(datos.words.slice(4), datos.sigBytes - 16);

        const decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (e) {
        console.error("Error al desencriptar:", e);
        return null;
    }
}
function DesencriptarURLToken() {
    return new Promise((resolve, reject) => {
        $.getJSON('../../json/config.json')
            .done(function (data) {
                const clave = data.key;

                if (typeof clave !== 'string' || clave.length !== 32) {
                    console.error("Clave inválida o no definida en config.json");
                    reject("Clave inválida");
                    return;
                }

                const params = new URLSearchParams(window.location.search);
                const token = params.get("token");

                if (!token) {
                    console.error("Token no proporcionado en la URL.");
                    reject("Token no proporcionado");
                    return;
                }

                try {
                    const tokenDecodificado = decodeURIComponent(token);
                    const idDescifrado = desencriptarAES(tokenDecodificado, clave);

                    if (idDescifrado) {
                        resolve(idDescifrado); // ✅ Retorna el ID descifrado
                    } else {
                        console.error("No se pudo descifrar el token.");
                        reject("Desencriptación fallida");
                    }
                } catch (error) {
                    console.error("Error en el proceso de desencriptación:", error);
                    reject("Error en desencriptar");
                }
            })
            .fail(function () {
                console.error("No se pudo cargar config.json");
                reject("Error cargando config.json");
            });
    });
}
