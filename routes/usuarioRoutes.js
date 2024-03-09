/**
 * Importaciones
 */
import express from 'express';

const router = express.Router();

/**
 * Rutas
 */
router.get('/login',function(req,res){
    res.render('auth/login');
});

export default router;