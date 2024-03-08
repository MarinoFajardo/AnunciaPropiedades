/**
 * Cargar las dependencias
 */
import express from 'express' //Express

/**
 * Creación de la Aplicación.
 */
const app = express();

/**
 * Routing
 */
app.get('/',function(req,res){
    res.send('Hola Mundo en Express');
});

/**
 * Definición del puerto y arranque de la app
 */
const port = 3000;
app.listen(port, () => {
    console.log('El servidor está funcionando')
});