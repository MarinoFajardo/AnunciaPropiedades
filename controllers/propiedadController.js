/**
 * Archivo donde se van a incluir todas las funciones del controlador de propiedades
 */

/**
 * Imports
 */
import {validationResult} from 'express-validator' // Validación de Express
import {Precio,Categoria,Propiedad} from '../models/index.js'

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

const guardar = async (req,res) => {
    /**
     * Validación de los campos, en este caso se hace en el archivo de rutas
     */
    let resultado = validationResult(req);
    if(!resultado.isEmpty()){
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
            precios ,
            errores: resultado.array(),
            datos: req.body
        })
    }

    /**
     * Creación del registro de la propiedad
     */
    const {titulo,descripcion,habitaciones,estacionamiento,wc,calle,lat,lng, precio: precioId,categoria:categoriaId} = req.body
    try {
        const propiedadGuardada = await Propiedad.create(
            {
                titulo,
                descripcion,
                habitaciones,
                estacionamiento,
                wc,
                calle,
                lat,
                lng,
                precioId,
                categoriaId
            }
        )
    } catch (error) {
        console.log(error);
    }

}

/**
 * Configuración de los exports
 */
export{
    admin,
    crear,
    guardar
}