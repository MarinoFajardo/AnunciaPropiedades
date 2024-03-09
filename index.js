/**
 * Cargar las dependencias
 */
import express from 'express' //Express
import usuarioRoutes from './routes/usuarioRoutes.js' //Rutas

/**
 * Creación de la Aplicación.
 */
const app = express();

/**
 * Routing
 */
app.use('/', usuarioRoutes);

/**
 * Definición del puerto y arranque de la app
 */
const port = 3000;
app.listen(port, () => {
    console.log('El servidor está funcionando')
});