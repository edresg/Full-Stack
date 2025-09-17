const validarTareaId = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({error: 'Falta el id de la tarea'});
    }
    req.id = id;
    next();
};

const validarDatosTarea = (req, res, next) => { 
    const {titulo} = req.body;
    if (req.method === 'POST' || req.method === 'PUT' ){
        if (!titulo || titulo.trim() === '') {
            return res.status(400).json({error: 'El titulo de la tarea es obligatorio'});
        }
    }
    next();
};

module.exports = {
    validarTareaId,
    validarDatosTarea
};
    