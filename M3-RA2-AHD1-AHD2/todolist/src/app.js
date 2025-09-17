const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));
app.use('/styles', express.static(path.join(__dirname, '../public/styles')));

// Configuración de CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Logging de solicitudes
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Rutas
const tareasRoutes = require('./routes/tareasRoutes');
app.use('/api/tareas', tareasRoutes);

// Manejador de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Ruta no encontrada' });
});

// Manejador de errores global
app.use((err, req, res, next) => {
    console.error('Error no manejado:', err);
    res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
        message: err.message
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor ejecutando en http://localhost:${PORT}`);
    console.log('Endpoints disponibles:');
    console.log(`- GET    http://localhost:${PORT}/api/tareas`);
    console.log(`- GET    http://localhost:${PORT}/api/tareas/:id`);
    console.log(`- POST   http://localhost:${PORT}/api/tareas`);
    console.log(`- PUT    http://localhost:${PORT}/api/tareas/:id`);
    console.log(`- DELETE http://localhost:${PORT}/api/tareas/:id`);
})