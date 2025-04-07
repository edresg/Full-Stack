//Constantes Modal
const modal = document.getElementById("modal");
const tituloModal = document.getElementById("tituloModal");
const ejercicioModal = document.getElementById("ejercicioModal");
const respuesta = document.getElementById("respuesta");
const btnVerificar = document.getElementById("verificar");
const mensaje = document.getElementById("mensaje");
const btnCerrar = document.getElementById("cerrar");

//Constantes a cada botón
const btnParImpar = document.getElementById("btnParImpar");
const btnMayorEdad = document.getElementById("btnMayorEdad");
const btnTemperatura = document.getElementById("btnTemperatura");
const btnNotas = document.getElementById("btnNotas");
const btnPares = document.getElementById("btnPares");
const btnInpares = document.getElementById("btnInpares");
const btnTablaMultiplicar = document.getElementById("btnTablaMultiplicar");
const btnContarLetras = document.getElementById("btnContarLetras");

let funcionEjercicioActual = null;
//Eventos
btnParImpar.addEventListener("click", function (){
    abrirModal("Número Par o Impar", "Ingresa un número para verificar si es par o impar", verificarParImpar);
});
btnMayorEdad.addEventListener("click", function (){
    abrirModal("Mayor de Edad", "Ingresa tu edad para saber si eres mayor de edad", verificarEdad);
});
btnTemperatura.addEventListener("click", function (){
    abrirModal("Temperatura", "Ingresa el número de grados para verificar si hace calor o frío", verificarTemperatura);
});
btnNotas.addEventListener("click", function (){
    abrirModal("Notas", "Ingresa la nota obtenida para saber si es aproada o reprobada", verificarNotas);
});
btnPares.addEventListener("click", function (){
    abrirModal("Números Pares", "Ingresa un número para generar sus pares.", generarPares);
});
btnInpares.addEventListener("click", function (){
    abrirModal("Números Inpares", "Ingresa un número para generar sus inpares.", generarInpares);
});
btnTablaMultiplicar.addEventListener("click", function (){
    abrirModal("Tabla de Múltiplicar", "Ingresa el número de la tabla a generar", generarTabla);
});
btnContarLetras.addEventListener("click", function (){
    abrirModal("Contar Letras", "Ingresa la palabra para obtener las letras en ella.", contarLetras);
});

function abrirModal(titulo, descripcion, funcionEjercicio){
    tituloModal.textContent = titulo;
    ejercicioModal.textContent = descripcion;
    respuesta.value = "";
    mensaje.textContent = "";

    funcionEjercicioActual = funcionEjercicio;

    modal.classList.add("activarModal");
}

btnCerrar.addEventListener("click", function (){
    modal.classList.remove("activarModal");
});

function verificarParImpar(){
    let numero = parseInt(respuesta.value);
    if(isNaN(numero)){
        mensaje.textContent = "Ingresa un número válido.";
    }
    else{
        mensaje.textContent = (numero % 2 === 0) ? "Es un número PAR" : "Es un número IMPAR";
    }
}
function verificarEdad(){
    alert("Has presionado el boton para verificar tu edad");
}
function verificarTemperatura(){
    let temperatura = parseInt(respuesta.value);
    if(temperatura < 15){
        mensaje.textContent = "Hace frío.";
    }
    else if(temperatura >= 15 && temperatura <= 25){
        mensaje.textContent =  "Está templado.";
    } else {
        mensaje.textContent = "Hace calor.";
    }
}

function verificarNotas(){
    let nota = parseInt(respuesta.value);
    if(nota > 60){
        mensaje.textContent = "Aprobado.";
    }
    else{
        mensaje.textContent =  "Reprobado.";
    }
}

function generarPares (){
    let numero = parseInt(respuesta.value);
    mensaje.innerHTML = "";
    for (let i = 1; i <= numero; i++) {
      if (i % 2 === 0) {
          mensaje.innerHTML += i + "<br>";
      }
    }
}

function generarInpares (){
    let numero = parseInt(respuesta.value);
    mensaje.innerHTML = "";
    for (let i = 1; i <= numero; i++) {
        if (i % 2 !== 0) {
            mensaje.innerHTML += i + "<br>";
        }
    }
}

function generarTabla (){
    let numeroBase = parseInt(respuesta.value);
    let tabla = "";
    let i = 1;
        do {
            tabla += `${numeroBase} × ${i} = ${numeroBase * i}<br>`;
            i++;
        } while (i <= 10);

        mensaje.innerHTML = tabla;
}

function contarLetras() {
    let palabra = respuesta.value;
    let cantidadLetras = 0;

    for (let i = 0; i < palabra.length; i++) {
        cantidadLetras++;
    }

    mensaje.textContent = "La palabra tiene " + cantidadLetras + " letras.";
}

btnVerificar.addEventListener("click", function (){
    if(funcionEjercicioActual){
        funcionEjercicioActual();
    }
});