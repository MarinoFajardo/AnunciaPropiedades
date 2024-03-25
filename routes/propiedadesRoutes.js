/**
 * Importaciones
 */
import express from 'express'; //Express
import { body } from 'express-validator';
import { admin,crear,guardar,agregarImagen,almacenarImagen } from '../controllers/propiedadController.js';
import protegerRuta from '../middleware/protegerRuta.js';
import upload from '../middleware/subirImagen.js';


const router = express.Router();

/**
 * Rutas
 */

router.get('/mis-propiedades',protegerRuta,admin);

router.get('/propiedades/crear',protegerRuta,crear);
router.post('/propiedades/crear',protegerRuta,
        body('titulo').notEmpty().withMessage("El Título es obligatorio"),
        body('descripcion').notEmpty().withMessage("La Descripción no puede estar vacía"),
        body('categoria').isNumeric().withMessage("Selecciona una Categoría"),
        body('precio').isNumeric().withMessage("Selecciona un rango de Precios"),
        body('habitaciones').isNumeric().withMessage("Selecciona un número de habitaciones"),
        body('estacionamiento').isNumeric().withMessage("Selecciona un número de estacionamientos"),
        body('wc').isNumeric().withMessage("Selecciona un número de Baños"),
        body('lat').notEmpty().withMessage("Ubica la propiedad en el Mapa"),
        guardar);

router.get('/propiedades/agregar-imagen/:id',protegerRuta,agregarImagen);
router.post('/propiedades/agregar-imagen/:id',protegerRuta,upload.single('imagen'),almacenarImagen);

export default router;