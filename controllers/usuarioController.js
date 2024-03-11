/**
 * Archivo donde se van a incluir todas las funciones del controlador de usuarios
 */

/**
 * Imports
 */
import {check,validationResult} from 'express-validator' // Validación de Express
import Usuario from '../models/Usuario.js'; //Usuario
import {generarId} from '../helpers/tokens.js' // Token
import {emailRegistro} from '../helpers/emails.js' //Emails

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
        pageName : 'Crear Cuenta',
        csrfToken: req.csrfToken()
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
    //await check('repetir_password').equals('password').withMessage("Las contraseñas no son iguales").run(req);
    let resultado = validationResult(req);

    /**
     * Verificar que no hay errores y si los hay mostrarlos en el formulario
     */
    if(!resultado.isEmpty()){
        //Hay errores
        return res.render('auth/register', {
            pageName : 'Crear Cuenta',
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email,
                csrfToken: req.csrfToken()
            }
        });
    }

    /**
     * Extraer los datos
     */
    const {nombre,email,password} = req.body;

    /**
     * Verificar que el usuario no exista
     */
    const existeUsuario = await Usuario.findOne({where: {email}});
    if(existeUsuario){
        //El usuario ya existe
        return res.render('auth/register', {
            pageName : 'Crear Cuenta',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El usuario ya está registrado'}],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        });
    }
    
    /**
     * Almacenar el usuario
     */
    const usuario = await Usuario.create({
        nombre,
        email,
        password,
        token: generarId()
    });

    /**
     * Enviar el email de confiración
     */
    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    });

    /**
     * Mostrar mensaje de confirmación
     */
    res.render('templates/mensaje',{
        pageName : 'Cuenta Creada Correctamente',
        mensaje: 'Hemos enviado un email de confirmación, presiona en el enlace'
    })
}

/**
 * Función para comprobar una cuenta
 * @param {*} req Representa la petición.
 * @param {*} res Representa la respuesta.
 */
const confirmar = async (req,res) => {
    const {token} = req.params;
    /**
     * Verificar si el token es correcto y en caso de que lo sea confirmar la cuenta
     */
    const usuario = await Usuario.findOne({where: {token}});
    if(!usuario){
        return res.render('auth/confirmarcuenta',{
            pageName : 'Error al confirmar tu cuenta',
            mensaje: 'Hubo un error al confirmar tu cuenta, inténtalo de nuevo',
            error: true
        })
    }
    usuario.token = null;;
    usuario.confirmado = true;
    await usuario.save();

    res.render('auth/confirmarcuenta',{
        pageName : 'Cuenta Confirmada',
        mensaje: 'La cuenta se ha confirado corectamente'
    })

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
    registrar,
    confirmar
}