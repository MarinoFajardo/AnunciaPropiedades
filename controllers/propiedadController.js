/**
 * Archivo donde se van a incluir todas las funciones del controlador de propiedades
 */

/**
 * Imports
 */
import {check,validationResult} from 'express-validator' // Validación de Express
import Categoria from '../models/Categoria.js';
import Precio from '../models/Precio.js';

/**
 * Función para mostrar la página con las propiedades del usuario.
 * @param {*} req Representa la petición.
 * @param {*} res Representa la respuesta.
 */
const admin = (req,res) => {
    res.render('propiedades/admin', {
        pageName: 'Mis Propiedades',
        barra: true
        //csrfToken: req.csrfToken()     
    })
}

/**
 * Forulario para crear una nueva propiedad.
 * @param {*} req Representa la petición.
 * @param {*} res Representa la respuesta.
 */
const crear = async (req,res) => {
    /**
     * Consultar los modelos del precio y las categorias
     */
    const [categorias,precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])

    res.render('propiedades/crear', {
        pageName: 'Crear Propiedad',
        barra: true,
        csrfToken: req.csrfToken() ,
        categorias,
        precios  
    })
}

/**
 * Configuración de los exports
 */
export{
    admin,
    crear
}