/**
 * Cargar las dependencias
 */
import express from 'express' //Express
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import usuarioRoutes from './routes/usuarioRoutes.js' //Rutas
import db from './config/db.js'; //Base de Datos

/**
 * Creación de la Aplicación.
 */
const app = express();

/**
 * Habilitar lectura de formularios
 */
app.use(express.urlencoded({extended:true}));

/**
 * Habilitar Cookie Parser
 */
app.use(cookieParser());

/**
 * Habilitar CSRF
 */
app.use(csrf({cookie:true}));

/**
 * Conexión a la BDD
 */
try {
    await db.authenticate();
    db.sync()
    console.log('Conexión correcta a la DB');
} catch (error) {
    console.log(error);
}

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
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('El servidor está funcionando')
});