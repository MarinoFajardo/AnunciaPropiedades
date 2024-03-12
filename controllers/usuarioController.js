/**
 * Archivo donde se van a incluir todas las funciones del controlador de usuarios
 */

/**
 * Imports
 */
import {check,validationResult} from 'express-validator' // Validación de Express
import bcrypt from 'bcrypt' //Encriptado de password
import Usuario from '../models/Usuario.js'; //Usuario
import {generarId} from '../helpers/tokens.js' // Token
import {emailRegistro,emailOlvidePassword} from '../helpers/emails.js' //Emails

/**
 * Función diseñada para mostrar formulario para el login de los usuarios.
 * @param {*} req Representa la petición.
 * @param {*} res Representa la respuesta.
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
     * Mostrar la vista con el mensaje de confirmación
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
    /**
     * Se elimina el token y se marca al usuario como confirmado.
     */
    usuario.token = null;;
    usuario.confirmado = true;
    await usuario.save();

    /**
     * Mostrar vista con mensaje de confirmación.
     */
    res.render('auth/confirmarcuenta',{
        pageName : 'Cuenta Confirmada',
        mensaje: 'Tu cuenta se ha confirado corectamente'
    })

}

/**
 * Función diseñada para mostrar el formulario de recordar contraseña.
 * @param {*} req Representa la petición.
 * @param {*} res Representa la respuesta.
 */
const formularioOlvidePassword = (req,res) => {
    res.render('auth/olvide-password', {
        pageName : 'Recordar Contaseña',
        csrfToken: req.csrfToken()
    })
}

/**
 * Función para cambiar la contraseña de un usuario
 * @param {*} req Representa la petición.
 * @param {*} res Representa la respuesta.
 */
const resetPassword = async (req,res) => {
    /**
     * Reglas de validación
     */
    await check('email').isEmail().withMessage("Email no válido").run(req);
    let resultado = validationResult(req);
    /**
     * Verificar que no hay errores y si los hay mostrarlos en el formulario
     */
    if(!resultado.isEmpty()){
        //Hay errores
        return res.render('auth/olvide-password', {
            pageName : 'Recordar Contaseña',
            csrfToken: req.csrfToken(),
            errores: resultado.array()
        });
    }

    /**
     * Buscar si existe el usuario
     */
    const {email} = req.body;
    const usuario = await Usuario.findOne({where: {email}});
    if(!usuario){
        //El usuario no existe
        return res.render('auth/olvide-password', {
            pageName : 'Recordar Contaseña',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El email no pertenece a ningún usuario'}]
        });
    }

    /**
     * Generar un token y enviar el email
     */
    usuario.token = generarId();
    await usuario.save();

    emailOlvidePassword({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    });

    /**
     * Mostrar la vista con el mensaje de confirmación
     */
    res.render('templates/mensaje',{
        pageName : 'Restablece tu Contraseña',
        mensaje: 'Hemos enviado un email con las instrucciones para cambiar tu Contraseña'
    })

}

/**
 * Función para comprobar si el token pertenece a un usuario
 * @param {*} req Representa la petición.
 * @param {*} res Representa la respuesta.
 */
const comprobarToken = async (req,res) => {
    const {token} = req.params;
    const usuario = await Usuario.findOne({where: {token}})
    if(!usuario){
        return res.render('auth/confirmarcuenta',{
            pageName : 'Reestablece tu Contraseña',
            mensaje: 'Hubo un error al validar tu información, inténtalo de nuevo',
            error: true
        })
    }
    /**
     * Mostrar el formulario para cambiar la contraseña
     */
    res.render('auth/reset-password',{
        pageName : 'Restablece tu Contraseña',
        csrfToken: req.csrfToken()
    })

}

/**
 * Función para modificar la contraseña
 * @param {*} req Representa la petición.
 * @param {*} res Representa la respuesta.
 */
const nuevoPassword = async (req,res) => {
    await check('password').isLength({min: 6}).withMessage("La contraseña debe tener al menos 6 caracteres").run(req);
    let resultado = validationResult(req);
    /**
     * Verificar que no hay errores y si los hay mostrarlos en el formulario
     */
    if(!resultado.isEmpty()){
        //Hay errores
        return res.render('auth/reset-password', {
            pageName : 'Restablece tu Contraseña',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
        });
    }
    const {token} = req.params;
    const {password} = req.body;

    /**
     * Buscar el usuario asociado con el token y modificar su contraseña
     */
    const usuario = await Usuario.findOne({where: {token}});
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password,salt);
    usuario.token = null;
    await usuario.save();
    /**
     * Mostrar la vista con el mensaje de confirmación
     */
    res.render('auth/confirmarcuenta',{
        pageName : 'Contraseña Restablecida',
        mensaje: 'La nueva contraseña se guardó correctamente'
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
    confirmar,
    resetPassword,
    comprobarToken,
    nuevoPassword
}