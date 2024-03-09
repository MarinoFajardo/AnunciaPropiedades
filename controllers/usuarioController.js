/**
 * Archivo donde se van a incluir todas las funciones del controlador de usuarios
 */

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
 * @param {*} res Representa la respuesta.
 * @param pageName Representa el nombre de la página.
 */
const formularioRegistro = (req,res) => {
    res.render('auth/register', {
        pageName : 'Crear Cuenta'
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
    formularioOlvidePassword
}