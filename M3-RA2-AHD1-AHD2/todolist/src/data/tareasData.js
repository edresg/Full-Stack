// Base de datos en memoria
let tareas = [
    {
        id: 1,
        titulo: 'Aprender HTML',
        descripcion: "Estudiar los fundamentos de HTML",
        completada: false,
        fechaCreacion: new Date("2025-09-03"),
        fechaActualizacion: new Date("2025-09-03")
    },
    {
        id: 2,
        titulo: 'Aprender CSS',
        descripcion: "Estudiar los fundamentos de CSS",
        completada: false,
        fechaCreacion: new Date("2025-09-03"),
        fechaActualizacion: new Date("2025-09-03")
    },
    {
        id: 3,
        titulo: 'Aprender JavaScript',
        descripcion: "Estudiar los fundamentos de JavaScript",
        completada: false,
        fechaCreacion: new Date("2025-09-03"),
        fechaActualizacion: new Date("2025-09-03")
    }
];

let nextId = 4;

const obtenerTodasLasTareas = () => JSON.parse(JSON.stringify(tareas));

const obtenerTareasPorId = (id) => tareas.find(t => t.id === id);

const crearTarea = (tareaData) => {
    const nuevaTarea = {
        id: nextId++,
        ...tareaData,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
    };

    tareas.push(nuevaTarea);
    return nuevaTarea;

};

const actualizarTarea = (id, nuevosDatos) => {
    const index = tareas.findIndex(t => t.id === id);
    if (index === -1) {
        return null;
    }
    tareas[index] = {
        ...tareas[index],
        ...nuevosDatos,
        fechaActualizacion: new Date(),
    };
    return tareas[index];    
};  

const eliminarTarea = (id) => {
    const index = tareas.findIndex(t => t.id === id);
    if (index === -1) {
        return null;
    }
    return tareas.splice(index, 1)[0];
};

module.exports = {
    obtenerTodasLasTareas,
    obtenerTareasPorId,
    crearTarea,
    actualizarTarea,
    eliminarTarea
} 