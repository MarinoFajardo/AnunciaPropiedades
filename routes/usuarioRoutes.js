/**
 * Importaciones
 */
import express from 'express'; //Express
import {formularioLogin, formularioRegistro} from '../controllers/usuarioController.js'

const router = express.Router();

/**
 * Rutas
 */
router.get('/login', formularioLogin);
router.get('/register',formularioRegistro)

export default router;