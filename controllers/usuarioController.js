/**
 * Archivo donde se van a incluir todas las funciones del controlador de usuarios
 */

/**
 * Imports
 */
import {check,validationResult} from 'express-validator'
import Usuario from '../models/Usuario.js'; //Usuario

/**
 * Función diseñada para mostrar formulario para el login de los usuarios.
 * @param {*} req Representa la petición.
 * @param {*} res Representa la respuesta.
 * @param pageName Representa el nombre de la página.
 */
const formularioLogin = (req,res) => {
    res.render('auth/login', {
        pageName: 'Iniciar Sesión'
    })
}

/**
 * Función diseñada para mostrar el formulario de registro de usuario.
 * @param {*} req Representa la petición.
 * @param {*} res Representa la petición.
 * @param pageName Representa el nombre de la página.
 */
const formularioRegistro = (req,res) => {
    res.render('auth/register', {
        pageName : 'Crear Cuenta'
    })
}

/**
 * Función diseñada para registrar a un usuario en el sistema.
 * @param {*} req Representa la petición.
 * @param {*} res Representa la petición.
 */
const registrar = async (req,res) => {

    /**
     * Reglas de validación
     */
    await check('nombre').notEmpty().withMessage("El campo nombre no puede estar vacío").run(req);
    await check('email').isEmail().withMessage("Email no válido").run(req);
    await check('password').isLength({min: 6}).withMessage("La contraseña debe tener al menos 6 caracteres").run(req);
    await check('repetir_password').equals('password').withMessage("Las contraseñas no son iguales").run(req);
    let resultado = validationResult(req);

    /**
     * Verificar que no hay errores y si los hay mostrarlos en el formulario
     */
    if(!resultado.isEmpty()){
        //Hay errores
        return res.render('auth/register', {
            pageName : 'Crear Cuenta',
            errores: resultado.array()
        })
    }


    //const usuario = await Usuario.create(req.body);
    //res.json(usuario);
}

/**
 * Función diseñada para mostrar el formulario de recordar contraseña.
 * @param {*} req Representa la petición.
 * @param {*} res Representa la respuesta.
 * @param pageName Representa el nombre de la página.
 */
const formularioOlvidePassword = (req,res) => {
    res.render('auth/olvide-password', {
        pageName : 'Recordar Contaseña'
    })
}

/**
 * Configuración de los exports
 */
export{
    formularioLogin,
    formularioRegistro,
    formularioOlvidePassword,
    registrar
}