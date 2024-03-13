/**
 * Archivo donde se van a incluir todas las funciones del controlador de propiedades
 */

/**
 * Imports
 */


const admin = (req,res) => {
    res.render('propiedades/admin', {
        pageName: 'Mis Propiedades',
        barra: true
        //csrfToken: req.csrfToken()     
    })
}

/**
 * Configuración de los exports
 */
export{
    admin
}