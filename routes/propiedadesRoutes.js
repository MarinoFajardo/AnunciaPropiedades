/**
 * Importaciones
 */
import express from 'express'; //Express
import { admin,crear } from '../controllers/propiedadController.js';


const router = express.Router();

/**
 * Rutas
 */

router.get('/mis-propiedades',admin);

router.get('/propiedades/crear',crear)

export default router;