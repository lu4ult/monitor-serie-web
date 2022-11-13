

// let hora = new Date().getHours();
// let body = document.getElementById("body");

// let botonAlternarTemaOscuro = document.getElementById("alternarTemaOscuro");
// botonAlternarTemaOscuro.addEventListener("click",cambiarTemaOscuro);

// function cambiarTemaOscuro() {
//     if(body.className == "temaOscuro") {
//         console.log("pasar a claro");
//         body.classList.remove("temaOscuro");
//         body.classList.add("temaClaro");
//         //botonAlternarTemaOscuro.classList.remove("temaOscuro");
//         //botonAlternarTemaOscuro.classList.add("temaClaro");
//         //botonAlternarTemaOscuro.innerText = "Cambiar a tema Oscuro";
//         botonAlternarTemaOscuro.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/></svg> Modo Oscuro';
//         let todosBotones = document.querySelectorAll("button");
//         todosBotones.forEach((b)=>{b.classList.remove("temaOscuro"); b.classList.add("temaClaro");});
//     }

//     else {
//         console.log("pasar a oscuro");
//         body.classList.remove("temaClaro");
//         body.classList.add("temaOscuro");
//         //botonAlternarTemaOscuro.classList.add("temaOscuro");
//         //botonAlternarTemaOscuro.classList.remove("temaClaro");
//         //botonAlternarTemaOscuro.innerText = "Cambiar a modo Claro";
//         botonAlternarTemaOscuro.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M112.1 454.3c0 6.297 1.816 12.44 5.284 17.69l17.14 25.69c5.25 7.875 17.17 14.28 26.64 14.28h61.67c9.438 0 21.36-6.401 26.61-14.28l17.08-25.68c2.938-4.438 5.348-12.37 5.348-17.7L272 415.1h-160L112.1 454.3zM192 0C90.02 .3203 16 82.97 16 175.1c0 44.38 16.44 84.84 43.56 115.8c16.53 18.84 42.34 58.23 52.22 91.45c.0313 .25 .0938 .5166 .125 .7823h160.2c.0313-.2656 .0938-.5166 .125-.7823c9.875-33.22 35.69-72.61 52.22-91.45C351.6 260.8 368 220.4 368 175.1C368 78.8 289.2 .0039 192 0zM288.4 260.1c-15.66 17.85-35.04 46.3-49.05 75.89h-94.61c-14.01-29.59-33.39-58.04-49.04-75.88C75.24 236.8 64 206.1 64 175.1C64 113.3 112.1 48.25 191.1 48C262.6 48 320 105.4 320 175.1C320 206.1 308.8 236.8 288.4 260.1zM176 80C131.9 80 96 115.9 96 160c0 8.844 7.156 16 16 16S128 168.8 128 160c0-26.47 21.53-48 48-48c8.844 0 16-7.148 16-15.99S184.8 80 176 80z"/></svg> Modo Claro';
//         let todosBotones = document.querySelectorAll("button");
//         todosBotones.forEach((b)=>{b.classList.remove("temaClaro"); b.classList.add("temaOscuro");});
//     }
// }







//https://web.dev/serial/

console.log("hola")



// function sleep(milliseconds) {
//     const date = Date.now();
//     let currentDate = null;
//     do {
//       currentDate = Date.now();
//     } while (currentDate - date < milliseconds);
//   }

// let boton = document.getElementById("com");
// boton.addEventListener("click", miFuncion);
// const ports = await navigator.serial.getPorts();

// function miFuncion() {
   

//     

//   let puertos;
//   puertos = await navigator.serial.getPorts();
//   console.log(puertos)
// }


// Get all serial ports the user has previously granted the website access to.

function magia(recibido) {

    if(recibido.length<=5 || recibido[0]!="{" || recibido[recibido.length-1]!="}")      //Validamos que sea un JSON
        return false;

    let datos = JSON.parse(recibido);


    let keys = [];
    for(let k in datos) {
        keys.push(k);
    }

    for(let key of keys) {
        let valor = datos[key];
        let elementoBuscado = document.getElementById("key-"+key);

        if(elementoBuscado == null) {                                           //Si el elemento no está en el DOM lo creamos y agreagamos
            let elemento = `
            <div class="keys">
                <div class="keys__name">${key}</div>
                <div class="keys__value" id="key-${key}">${valor}</div>
            </div>`;
        document.getElementById("keys-container").innerHTML += elemento;
        }
        else {
            elementoBuscado.innerText = valor;
        }
    }
    return true;
}

let port = null;
let textos = [];
//let baudRateSelected = 9600;

document.getElementById("selectComPort").addEventListener('click', async () => {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: document.getElementById("baudrateSelector").value});

    //console.log(port)

   const textDecoder = new TextDecoderStream();
   const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
   const reader = textDecoder.readable.getReader();
   //const reader = port.readable.getReader();


   // Listen to data coming from the serial device.
    let dataRecibida = "";
    //while (true) {
    while (port.open && port.readable) {

        let startTime = performance.now();
        const { value, done } = await reader.read();
        let endTime = performance.now();


        if(endTime - startTime <50) {
            dataRecibida += value;
        }

        else {
            console.log("[serial]\n" + dataRecibida);
            // console.log("r: "+dataRecibida.includes('\r'));
            // console.log("n: "+dataRecibida.includes('\n'));
            // console.log("largo: "+dataRecibida.length);

            textos.push(dataRecibida);
            let mensaje = document.getElementById("monitor");
            mensaje.innerHTML = "";
            for (let el of textos) {
                mensaje.innerHTML += `<span>${el}</span><br>`;
            }

            //document.getElementById("messageBody");
            mensaje.scrollTop = mensaje.scrollHeight;

            magia(dataRecibida)

        dataRecibida = value;
        }

        if (done) {
            console.log("liberando??")
            //
            break;
        }
    }
});





// let botonIngresar = document.getElementById("ingresar");
// botonIngresar.addEventListener("click", usuarioIngresaData);

// function usuarioIngresaData() {
//     //let user = JSON.parse(prompt("data?"))
//     let user = prompt("data?");
//     console.log(user);
//     magia(user);
// }


// let botonLimpiarMonitor = document.getElementById("clrScr");
// botonLimpiarMonitor.addEventListener("click", limpiarMonitor);

// function limpiarMonitor() {
//     //alert("seee");
//     //console.log()
//     document.getElementById("monitor").innerHTML = "";
//     textos = [];
// }



/***    Web Socket      ***/
let botonWebSocket = document.getElementById("iniciarWebSocket");
botonWebSocket.addEventListener("click",iniciaWebSocket);

function iniciaWebSocket() {
    //alert("hola")
    let ip = prompt("direccion ip local?");
    //socket = new WebSocket("ws:/" + "/" + location.host + ":81");
    socket = new WebSocket("ws:/" + "/" + ip + ":81");

    socket.onopen = function(e) {
        console.log("[socket] socket.onopen ");
    };
    socket.onerror = function(e) {
        console.log("[socket] socket.onerror ");
        alert("Ups! Algo salió mal con el socket...")
    };
    socket.onmessage = function(e) {
        console.log("[socket] " + e.data);
        magia(e.data);
    };
}


console.log("fin")

