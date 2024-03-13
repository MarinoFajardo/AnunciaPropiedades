/**
 * Importaciones
 */
import express from 'express'; //Express
import { admin } from '../controllers/propiedadController.js';


const router = express.Router();

/**
 * Rutas
 */

router.get('/mis-propiedades',admin);

export default router;