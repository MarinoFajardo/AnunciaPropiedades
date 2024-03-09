/**
 * Archivo donde se van a incluir todas las funciones del controlador de usuarios
 */

/**
 * Función diseñada para mostrar el login de los usuarios.
 * @param {*} req Representa la petición.
 * @param {*} res Representa la respuesta.
 */
const formularioLogin = (req,res) => {
    res.render('auth/login', {

    })
}

/**
 * Función diseñada para mostrar el registro de los usuarios
 * @param {*} req Representa la petición.
 * @param {*} res Representa la respuesta.
 */
const formularioRegistro = (req,res) => {
    res.render('auth/register', {
        pageName : 'Crear Cuenta'
    })
}

/**
 * Configuración de los exports
 */
export{
    formularioLogin,
    formularioRegistro
}