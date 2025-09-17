const express = require('express');
const router = express.Router();

const{
    getTareas,
    getTareaById,
    updateTarea,
    crearTarea,
    deleteTarea
} = require('../controllers/tareasController');

const {
    validarTareaId,
    validarDatosTarea
} = require('../middleware/validators');

router.get('/', getTareas);

router.get('/:id', validarTareaId, getTareaById);

router.post('/', validarDatosTarea, crearTarea);

router.put('/:id', validarTareaId, updateTarea);

router.delete('/:id', validarTareaId, deleteTarea);

module.exports = router;