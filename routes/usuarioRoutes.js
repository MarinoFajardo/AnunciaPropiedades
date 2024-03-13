/**
 * Importaciones
 */
import express from 'express'; //Express
import {formularioLogin, formularioOlvidePassword, formularioRegistro,
        registrar,confirmar,resetPassword,comprobarToken,nuevoPassword,
        autenticar} from '../controllers/usuarioController.js'

const router = express.Router();

/**
 * Rutas
 */
//Login
router.get('/login', formularioLogin); 
router.post('/login',autenticar)
//Registro
router.get('/register',formularioRegistro);
router.post('/register',registrar);
router.get('/confirmar/:token',confirmar);
//Reset de Contraseña
router.get('/olvide-password',formularioOlvidePassword);
router.post('/olvide-password',resetPassword);
router.get('/olvide-password/:token',comprobarToken);
router.post('/olvide-password/:token',nuevoPassword);

export default router;