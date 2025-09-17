const{
    obtenerTodasLasTareas,
    obtenerTareasPorId,
    crearTarea: crearTareaEnDB,
    actualizarTarea,
    eliminarTarea
} = require('../data/tareasData')

const getTareas = (req, res) => {
    console.log('Solicitud recibida en GET /api/tareas');
    console.log('Query params:', req.query);
    
    try {
        let tareas = obtenerTodasLasTareas();
        console.log('Tareas obtenidas:', tareas);
        
        const { completada } = req.query;
        if (completada !== undefined) {
            console.log('Filtrando por completada:', completada);
            const estaCompletada = completada === 'true';
            tareas = tareas.filter(tarea => tarea.completada === estaCompletada);
        }
        
        console.log('Enviando respuesta con', tareas.length, 'tareas');
        res.status(200).json({
            success: true,
            count: tareas.length,
            data: tareas
        });
    } catch (error) {
        console.error('Error en getTareas:', error);
        res.status(500).json({
            success: false,
            error: 'Error al obtener las tareas',
            message: error.message
        });
    }
};

const getTareaById = (req, res) => {
    try{
        const tarea = obtenerTareasPorId(req.id);
        if(!tarea){
            return res.status(400).json({error: 'Tarea no encontrada'});
        }
        {
            res.json(tarea);
        }
    }
    catch(error){
        res.status(500).json({error: "Error al obtener tarea"});
    }
};

const updateTarea = (req, res) => {
    try{
        const {titulo, descripcion, completada} = req.body;
        const tareaActualizada = actualizarTarea(req.id, {titulo: titulo.trim(), descripcion: descripcion ? descripcion.trim() : '', completada: completada || false});
        if(!tareaActualizada){
            return res.status(404).json({error: 'Tarea no encontrada'});
        }
        res.json({message: 'Tarea actualizada exitosamente', tarea: tareaActualizada});
    }
    catch(error){
        res.status(500).json({error: "Error al actualizar tarea"});
    }
};

const crearTarea = (req, res) => {
    try {
        const { titulo, descripcion, completada } = req.body;
        
        if (!titulo || titulo.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'El título de la tarea es obligatorio'
            });
        }

        const nuevaTarea = crearTareaEnDB({
            titulo: titulo.trim(),
            descripcion: descripcion ? descripcion.trim() : '',
            completada: completada || false
        });

        res.status(201).json({
            success: true,
            message: 'Tarea creada exitosamente',
            data: nuevaTarea
        });
    } catch (error) {
        console.error('Error al crear tarea:', error);
        res.status(500).json({
            success: false,
            error: 'Error al crear la tarea',
            message: error.message
        });
    }
};

const deleteTarea = (req, res) => {
    try{
        const tareaEliminada = eliminarTarea(req.id);
        if(!tareaEliminada){
            return res.status(404).json({error: 'Tarea no encontrada'});
        }
        res.json({message: 'Tarea eliminada exitosamente', tarea: tareaEliminada});
    }
    catch(error){
        res.status(500).json({error: "Error al eliminar tarea"});
    }
};



module.exports = {
    getTareas,
    getTareaById,
    updateTarea,
    crearTarea,
    deleteTarea
};