// Carga componentes reutilizables (header y footer)
async function cargarComponente(id, ruta) {
    const contenedor = document.getElementById(id);
    const respuesta = await fetch(ruta);
    const html = await respuesta.text();
    contenedor.innerHTML = html;
}

// Cargar menú hamburguesa después del header
function activarMenuHamburguesa() {
    const hamburguesa = document.querySelector(".hamburguesa");
    const navMenu = document.querySelector("nav ul");

    if (hamburguesa && navMenu) {
        hamburguesa.addEventListener("click", () => {
            navMenu.classList.toggle("verMenu");
        });
    }
}

async function inicializarComponentes() {
    await cargarComponente("header-container", "components/header.html");
    await cargarComponente("footer-container", "components/footer.html");
    activarMenuHamburguesa();
}
