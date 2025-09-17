// Variables globales
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
let filtroActual = 'todas';
let contadorId = parseInt(localStorage.getItem('contadorId')) || 1;

// Referencias DOM
const taskForm = document.getElementById('taskForm');
const tasksList = document.getElementById('tasksList');
const taskCount = document.getElementById('taskCount');
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const closeModal = document.querySelector('.close');

// Botones de filtro
const allTasksBtn = document.getElementById('allTasks');
const pendingTasksBtn = document.getElementById('pendingTasks');
const completedTasksBtn = document.getElementById('completedTasks');

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', function() {
    mostrarTareas();
    configurarEventListeners();
});

// Configurar event listeners
function configurarEventListeners() {
    taskForm.addEventListener('submit', agregarTarea);
    editForm.addEventListener('submit', guardarEdicion);
    closeModal.addEventListener('click', cerrarModal);
    
    // Filtros
    allTasksBtn.addEventListener('click', () => cambiarFiltro('todas'));
    pendingTasksBtn.addEventListener('click', () => cambiarFiltro('pendientes'));
    completedTasksBtn.addEventListener('click', () => cambiarFiltro('completadas'));
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(event) {
        if (event.target === editModal) {
            cerrarModal();
        }
    });
}

// Agregar nueva tarea
function agregarTarea(e) {
    e.preventDefault();
    
    const titulo = document.getElementById('titulo').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const completada = document.getElementById('completada').checked;
    
    if (titulo === '') {
        alert('El título es obligatorio');
        return;
    }
    
    const nuevaTarea = {
        id: contadorId++,
        titulo: titulo,
        descripcion: descripcion,
        completada: completada,
        fechaCreacion: new Date().toISOString()
    };
    
    tareas.push(nuevaTarea);
    guardarEnStorage();
    taskForm.reset();
    mostrarTareas();
}

// Mostrar tareas
function mostrarTareas() {
    const tareasFiltradas = filtrarTareas();
    tasksList.innerHTML = '';
    
    if (tareasFiltradas.length === 0) {
        tasksList.innerHTML = '<p class="no-tasks">No hay tareas para mostrar</p>';
    } else {
        tareasFiltradas.forEach(tarea => {
            const tareaElement = crearElementoTarea(tarea);
            tasksList.appendChild(tareaElement);
        });
    }
    
    actualizarContador();
}

// Crear elemento tarea
function crearElementoTarea(tarea) {
    const div = document.createElement('div');
    div.className = `task-item ${tarea.completada ? 'completed' : ''}`;
    div.innerHTML = `
        <div class="task-content">
            <h3>${tarea.titulo}</h3>
            ${tarea.descripcion ? `<p>${tarea.descripcion}</p>` : ''}
            <small>Creada: ${new Date(tarea.fechaCreacion).toLocaleDateString()}</small>
        </div>
        <div class="task-actions">
            <button onclick="toggleCompletada(${tarea.id})" class="btn-toggle">
                ${tarea.completada ? 'Marcar Pendiente' : 'Marcar Completada'}
            </button>
            <button onclick="editarTarea(${tarea.id})" class="btn-edit">Editar</button>
            <button onclick="eliminarTarea(${tarea.id})" class="btn-delete">Eliminar</button>
        </div>
    `;
    
    return div;
}

// Filtrar tareas
function filtrarTareas() {
    switch (filtroActual) {
        case 'pendientes':
            return tareas.filter(tarea => !tarea.completada);
        case 'completadas':
            return tareas.filter(tarea => tarea.completada);
        default:
            return tareas;
    }
}

// Cambiar filtro
function cambiarFiltro(filtro) {
    filtroActual = filtro;
    
    // Actualizar botones activos
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    switch (filtro) {
        case 'pendientes':
            pendingTasksBtn.classList.add('active');
            break;
        case 'completadas':
            completedTasksBtn.classList.add('active');
            break;
        default:
            allTasksBtn.classList.add('active');
    }
    
    mostrarTareas();
}

// Toggle completada
function toggleCompletada(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.completada = !tarea.completada;
        guardarEnStorage();
        mostrarTareas();
    }
}

// Editar tarea
function editarTarea(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        document.getElementById('editId').value = tarea.id;
        document.getElementById('editTitulo').value = tarea.titulo;
        document.getElementById('editDescripcion').value = tarea.descripcion;
        document.getElementById('editCompletada').checked = tarea.completada;
        
        editModal.style.display = 'block';
    }
}

// Guardar edición
function guardarEdicion(e) {
    e.preventDefault();
    
    const id = parseInt(document.getElementById('editId').value);
    const titulo = document.getElementById('editTitulo').value.trim();
    const descripcion = document.getElementById('editDescripcion').value.trim();
    const completada = document.getElementById('editCompletada').checked;
    
    if (titulo === '') {
        alert('El título es obligatorio');
        return;
    }
    
    const tareaIndex = tareas.findIndex(t => t.id === id);
    if (tareaIndex !== -1) {
        tareas[tareaIndex].titulo = titulo;
        tareas[tareaIndex].descripcion = descripcion;
        tareas[tareaIndex].completada = completada;
        
        guardarEnStorage();
        cerrarModal();
        mostrarTareas();
    }
}

// Eliminar tarea
function eliminarTarea(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
        tareas = tareas.filter(t => t.id !== id);
        guardarEnStorage();
        mostrarTareas();
    }
}

// Cerrar modal
function cerrarModal() {
    editModal.style.display = 'none';
    editForm.reset();
}

// Actualizar contador
function actualizarContador() {
    const tareasFiltradas = filtrarTareas();
    taskCount.textContent = `(${tareasFiltradas.length})`;
}

// Guardar en localStorage
function guardarEnStorage() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
    localStorage.setItem('contadorId', contadorId.toString());
}