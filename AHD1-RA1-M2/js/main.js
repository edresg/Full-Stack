let rutaActual = "";

const rutas = {
    "": "pages/public/inicio.html",
    "#/servicios": "pages/public/servicios.html",
    "#/galeria": "pages/public/galeria.html",
    "#/login": "pages/public/login.html",
    "#/dashboard": "pages/private/dashboard.html"
};

function verificarPrivado(ruta) {
    return ruta === "#/dashboard";
}

function estaLogueado() {
    return localStorage.getItem("logueado") === "true";
}

async function cargarRuta() {
    const hash = location.hash || "";
    const ruta = rutas[hash] || rutas[""];

    if (verificarPrivado(hash) && !estaLogueado()) {
        location.hash = "#/login";
        return;
    }

    if (ruta !== rutaActual) {
        const respuesta = await fetch(ruta);
        const html = await respuesta.text();
        document.getElementById("main-content").innerHTML = html;

        if (hash === "#/login") {
            cargarLogin();
        }

        if (hash === "#/dashboard") {
            cargarLogout();
        }

        rutaActual = ruta;
    }
}

function cargarLogin() {
    const form = document.getElementById("login-form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const usuario = document.getElementById("usuario").value;
            const pass = document.getElementById("pass").value;

            if (usuario === "admin" && pass === "12345") {
                localStorage.setItem("logueado", "true");
                location.hash = "#/dashboard";
            } else {
                document.getElementById("mensajeLogin").textContent = "Usuario o contraseña incorrectos.";
            }
        });
    }
}

function cargarLogout() {
    const cerrar = document.getElementById("cerrarSesion");
    if (cerrar) {
        cerrar.addEventListener("click", () => {
            localStorage.removeItem("logueado");
            location.hash = "#/login";
        });
    }
}

// Inicializa
window.addEventListener("load", async () => {
    await inicializarComponentes();
    await cargarRuta();
});
window.addEventListener("hashchange", cargarRuta);
