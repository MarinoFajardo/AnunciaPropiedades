/**
 * Importaciones
 */
import express from 'express'; //Express
import {formularioLogin, formularioOlvidePassword, formularioRegistro,
        registrar,confirmar,resetPassword,comprobarToken,nuevoPassword} from '../controllers/usuarioController.js'

const router = express.Router();

/**
 * Rutas
 */
router.get('/login', formularioLogin);

router.get('/register',formularioRegistro);
router.post('/register',registrar);
router.get('/confirmar/:token',confirmar);


router.get('/olvide-password',formularioOlvidePassword);
router.post('/olvide-password',resetPassword);
router.get('/olvide-password/:token',comprobarToken);
router.post('/olvide-password/:token',nuevoPassword);

export default router;