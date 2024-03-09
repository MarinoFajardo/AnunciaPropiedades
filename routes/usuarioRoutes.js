/**
 * Importaciones
 */
import express from 'express';

const router = express.Router();

/**
 * Rutas
 */
router.get('/',function(req,res){
    res.send('Hola Mundo en Express');
});

export default router;