/**
 * Importaciones
 */
import express from 'express'; //Express
import {formularioLogin, formularioOlvidePassword, formularioRegistro, registrar,confirmar} from '../controllers/usuarioController.js'

const router = express.Router();

/**
 * Rutas
 */
router.get('/login', formularioLogin);

router.get('/register',formularioRegistro);
router.post('/register',registrar);
router.get('/confirmar/:token',confirmar);


router.get('/olvide-password',formularioOlvidePassword);

export default router;