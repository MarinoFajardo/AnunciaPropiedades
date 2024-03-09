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
 * Habilitar Pug
 */
app.set('view engine', 'pug');
app.set('views', './views');

/**
 * Carpeta Pública
 */
app.use(express.static('public'));

/**
 * Routing
 */
app.use('/auth', usuarioRoutes);

/**
 * Definición del puerto y arranque de la app
 */
const port = 3000;
app.listen(port, () => {
    console.log('El servidor está funcionando')
});