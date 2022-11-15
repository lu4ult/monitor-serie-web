let body = document.getElementById("body");
let botonAlternarTemaOscuro = document.getElementById("alternarTemaOscuro");
botonAlternarTemaOscuro.addEventListener("click",cambiarTemaOscuro);

function cambiarTemaOscuro() {
    let monitor = document.getElementById("monitor");
    if(body.className == "temaOscuro") {
        console.log("pasar a claro");
        body.classList.remove("temaOscuro");
        body.classList.add("temaClaro");
        monitor.classList.remove("temaOscuro");
        monitor.classList.add("temaClaro");
        document.getElementById("textoParaArduino").classList.remove("temaOscuro");
        document.getElementById("footer").classList.remove("temaOscuro");
        botonAlternarTemaOscuro.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/></svg> Modo Oscuro';
        let todosBotones = document.querySelectorAll("button");
        todosBotones.forEach((b)=>{b.classList.remove("temaOscuro"); b.classList.add("temaClaro");});
        let todasKeys = document.querySelectorAll(".keys");
        todasKeys.forEach((b)=>{b.classList.remove("temaOscuro"); b.classList.add("temaClaro");});
    }

    else {
        console.log("pasar a oscuro");
        body.classList.remove("temaClaro");
        body.classList.add("temaOscuro");
        monitor.classList.remove("temaClaro");
        monitor.classList.add("temaOscuro");
        document.getElementById("textoParaArduino").classList.add("temaOscuro");
        document.getElementById("footer").classList.add("temaOscuro");
        botonAlternarTemaOscuro.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M112.1 454.3c0 6.297 1.816 12.44 5.284 17.69l17.14 25.69c5.25 7.875 17.17 14.28 26.64 14.28h61.67c9.438 0 21.36-6.401 26.61-14.28l17.08-25.68c2.938-4.438 5.348-12.37 5.348-17.7L272 415.1h-160L112.1 454.3zM192 0C90.02 .3203 16 82.97 16 175.1c0 44.38 16.44 84.84 43.56 115.8c16.53 18.84 42.34 58.23 52.22 91.45c.0313 .25 .0938 .5166 .125 .7823h160.2c.0313-.2656 .0938-.5166 .125-.7823c9.875-33.22 35.69-72.61 52.22-91.45C351.6 260.8 368 220.4 368 175.1C368 78.8 289.2 .0039 192 0zM288.4 260.1c-15.66 17.85-35.04 46.3-49.05 75.89h-94.61c-14.01-29.59-33.39-58.04-49.04-75.88C75.24 236.8 64 206.1 64 175.1C64 113.3 112.1 48.25 191.1 48C262.6 48 320 105.4 320 175.1C320 206.1 308.8 236.8 288.4 260.1zM176 80C131.9 80 96 115.9 96 160c0 8.844 7.156 16 16 16S128 168.8 128 160c0-26.47 21.53-48 48-48c8.844 0 16-7.148 16-15.99S184.8 80 176 80z"/></svg> Modo Claro';
        let todosBotones = document.querySelectorAll("button");
        todosBotones.forEach((b)=>{b.classList.remove("temaClaro"); b.classList.add("temaOscuro");});
        let todasKeys = document.querySelectorAll(".keys");
        todasKeys.forEach((b)=>{b.classList.remove("temaClaro"); b.classList.add("temaOscuro");});
    }
}

cambiarTemaOscuro();

//https://web.dev/serial/

function jsonToDom(recibido) {
    recibido = recibido.replace('\r',"");                           //Eliminamos el retorno de carro y nueva línea si existieran.
    recibido = recibido.replace('\n',"");


    if(recibido.length<=5 || recibido[0]!="{" || recibido[recibido.length-1]!="}")          //Validamos que sea un JSON
        return false;

    let datos = JSON.parse(recibido);


    let keys = [];
    for(let k in datos) {                                                                   //Primero creamos un array con todas las "keys" del JSON
        keys.push(k);
    }

    for(let key of keys) {
        let valor = datos[key];
        let elementoBuscado = document.getElementById("key-"+key);

        if(elementoBuscado == null) {                                                       //Si el elemento no está en el DOM lo creamos y agreagamos, de lo contrario actualizamos el value según la key (porque key = id)
            let elemento = `
            <div class="keys">
                <div class="keys__name">${key}</div>
                <div class="keys__value" id="key-${key}">${valor}</div>
            </div>`;
        document.getElementById("keys-container").innerHTML += elemento;
        }
        else {
            if(elementoBuscado.innerText != valor) {                                        //Si realmente se actualizó el valor le agregamos una clase para que resalte y haga un efecto tipo firebase database
                elementoBuscado.innerText = valor;
                elementoBuscado.classList.remove("recentlyUpdatedRemoved");
                elementoBuscado.classList.add("recentlyUpdated");
                setTimeout(() => {
                    elementoBuscado.classList.remove("recentlyUpdated");
                    elementoBuscado.classList.add("recentlyUpdatedRemoved");
                }, 500);
            }
        }
    }
    return true;
}

let port = null;
let mensajesMonitor = [];
let historialTeclado = [];


document.getElementById("selectComPort").addEventListener('click', async () => {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: document.getElementById("baudrateSelector").value});

    //console.log(port)

    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    const reader = textDecoder.readable.getReader();

    let dataRecibida = "";
    while (port.open && port.readable) {
        let startTime = performance.now();
        const { value, done } = await reader.read();
        let endTime = performance.now();

        if(endTime - startTime <50) {                                               //Contamos cuánto tiempo tardó en recibir la data, ya que sino se recibe el mensaje cortado, por el buffer de hardware del arduino.
            dataRecibida += value;
        }

        else {
            jsonToDom(dataRecibida);

            mensajesMonitor.push(dataRecibida);                             //Todos los textos recibidos los almacenamos en un array para luego crear los elementos del HTML
            dataRecibida = dataRecibida.replace('\n',"<br>")
            let monitor = document.getElementById("monitor");

            monitor.innerHTML += dataRecibida;
            monitor.scrollTop = monitor.scrollHeight;

        dataRecibida = value;
        }

        if (done) {
            reader.releaseLock();
            break;
        }
    }
});

let botonEnviarArduino = document.getElementById("enviarArduino");
    botonEnviarArduino.onclick = async () => {
    const textEncoder = new TextEncoderStream();
    const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);

    const writer = textEncoder.writable.getWriter();

    await writer.write(document.getElementById("textoParaArduino").value + "\r\n");
    await writer.close();
}


let entradaTexto = document.getElementById("textoParaArduino");
entradaTexto.onfocus = ()  => {
    entradaTexto.value = "";
};

let botonLimpiarMonitor = document.getElementById("clrScr");
botonLimpiarMonitor.addEventListener("click", limpiarMonitor);
function limpiarMonitor() {
    console.clear();
    console.log("Pantalla limpia");
    document.getElementById("monitor").innerHTML = "";
    mensajesMonitor = [];
    //port.close()
}

let botonDescargarDatosCsv = document.getElementById("descargarDatosCsv");
botonDescargarDatosCsv.onclick = () => {
    let csv = [];
    for (let i=1; i<mensajesMonitor.length;i++) {
        let fila = [i,mensajesMonitor[i]];
        csv.push(fila)
    }
    console.log(csv);
    let csvContent = "data:text/csv;charset=utf-8,";                            //https://stackoverflow.com/questions/14964035
    csv.forEach(function(rowArray) {
        let row = rowArray.join(",");                                           //Transformamos esa matriz bidimensional en algo tipo CSV
        csvContent += row;
    });
    console.log(csvContent)
    let encodedUri = encodeURI(csvContent);
    let anchorDescarga = document.getElementById("anchorDescargar");
    anchorDescarga.setAttribute("href", encodedUri);                            //Para poder descargar el archivo creado hay que "adjuntarlo" a un anchor, el cuál no está visible en el DOM.
    anchorDescarga.setAttribute("download", "serial_arduino_data.csv");
    anchorDescarga.click();
};


//To-Do: analizar el objeto evento a ver si me indica el COM
navigator.serial.addEventListener("connect", (event) => {
    if(port === null)
        document.getElementById("monitor").innerHTML = "<strong>Nuevo dispositivo conectado!<strong>";
    else
        document.getElementById("monitor").innerHTML += "<br><strong>Nuevo dispositivo conectado!<strong><br>";
});

//   navigator.serial.addEventListener("disconnect", (event) => {
//     // TODO: Remove |event.target| from the UI.
//     // If the serial port was opened, a stream error would be observed as well.
//   });



/***    Web Socket      ***/

/*
TODO: resolver web socket sobre HTTPS
*/
// let botonWebSocket = document.getElementById("iniciarWebSocket");
// botonWebSocket.addEventListener("click",iniciarWebSocket);

function iniciarWebSocket(tipo) {
    let ip = prompt("direccion ip local?");
    //socket = new WebSocket("ws:/" + "/" + location.host + ":81");
    if(tipo)
        socket = new WebSocket("ws:/" + "/" + ip + ":81");
    else
        socket = new WebSocket("wss:/" + "/" + ip + ":81")

    socket.onopen = function(e) {
        console.log("[socket] socket.onopen ");
    };
    socket.onerror = function(e) {
        console.log("[socket] socket.onerror ");
        alert("Ups! Algo salió mal con el socket...")
    };
    socket.onmessage = function(e) {
        console.log("[socket] " + e.data);
        jsonToDom(e.data);
    };
}

let desplazamiento = 0;

window.addEventListener('keydown', function (e) {
    //if(e.key === "Enter" && document.getElementById("textoParaArduino") === document.activeElement) {
    if(e.key === "Enter") {
        document.getElementById("enviarArduino").click();                                                               //Presionamos el botón "enviar" para enviar el mensaje por el serial
        historialTeclado.push(document.getElementById("textoParaArduino").value);
        document.getElementById("textoParaArduino").value = "";                                                         //Borramos el contenido del input y lo almacenamos en el historial
        desplazamiento = 0;
        }

    if(historialTeclado.length == 0)
        return;
                                                                                                                        //Las teclas arriba y abajo aumentan el "desplazamiento" que usamos como índice
                                                                                                                        //para navegar sobre el array historialTeclado y mostrarlo en el input.
    if(e.key === "ArrowUp") {
        document.getElementById("textoParaArduino").value = historialTeclado[historialTeclado.length -1 -desplazamiento];
        if(desplazamiento < historialTeclado.length-1)
            desplazamiento++;
    }

    if(e.key === "ArrowDown") {
        if(desplazamiento <= historialTeclado.length && desplazamiento)
            desplazamiento--;
        document.getElementById("textoParaArduino").value = historialTeclado[historialTeclado.length -1 -desplazamiento];
    }

    if(e.key === "h") {
        console.log("Desplazamiento: "+desplazamiento);
        console.log(historialTeclado.join(","));
    }
  }, false);


let githubRepo = fetch("https://api.github.com/repos/lu4ult/monitor-serie-web");
githubRepo.then(res => res.json()).then(response => {
    let estrellitas = response["stargazers_count"];
    if(estrellitas)
        document.getElementById("watchersCount").innerHTML =  "<strong>" + estrellitas + " ★</strong>";
});

if(localStorage.getItem("monitor-serie-web-encuesta_no-mostrar") === null) {
    Swal.fire({
        title: '¿Nos ayudarías contestando una breve encuesta sobre esta herramienta?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Si! Vamos a la encuesta!',
        denyButtonText: `No volver a mostrar`,
        cancelButtonText: 'Quizás en un futuro...',
      }).then((result) => {
        if (result.isConfirmed) {
            window.open("https://forms.gle/9fzzYLyAVYVHeyDr8", '_blank').focus();
        } else if (result.isDenied) {
          localStorage.setItem("monitor-serie-web-encuesta_no-mostrar",JSON.stringify(new Date()))
        }
      });
}

if(sessionStorage.getItem("esPrimeraCarga") === null) {
    sessionStorage.setItem("esPrimeraCarga",true);
    document.getElementById("monitor").innerHTML = '<p>Aquí verá los mensajes del serial</p><p>Recuerde que puede descargar los mensajes recibidos en CSV.</p><p>Y puede ver el historial de mensajes enviados con las teclas arriba y abajo</p>';
}

// if(localStorage.getItem("monitor-serie-web-_primer-inicio") === null) {
//     document.getElementById("monitor").innerHTML = '<strong>Tips:</strong><ul><li>Utilice el botón "Descargar CSV" para descargar todos los mensajes del monitor.</li><li>Utilice las flechas arriba y abajo del teclado para reescribir mensajes ya enviados (como en terminal linux)</li></ul>';
// }