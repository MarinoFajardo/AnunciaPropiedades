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
        //csrfToken: req.csrfToken()     
    })
}

/**
 * Formulario para crear una nueva propiedad.
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
        csrfToken: req.csrfToken() ,
        categorias,
        precios,
        datos: [] 
    })
}

/**
 * Función para guardar una propiedad en la Base de Datos.
 * @param {*} req Representa la petición.
 * @param {*} res Representa la respuesta.
 */

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
            csrfToken: req.csrfToken() ,
            categorias,
            precios,
            errores: resultado.array(),
            datos: req.body
        })
    }

    /**
     * Creación del registro de la propiedad
     */
    const {titulo,descripcion,habitaciones,estacionamiento,wc,calle,lat,lng, precio: precioId,categoria:categoriaId} = req.body
    const {id: usuarioId} = req.usuario
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
                categoriaId,
                usuarioId,
                imagen: ''

            }
        )
        const {id} =propiedadGuardada
        res.redirect('/propiedades/agregar-imagen/${id}')
    } catch (error) {
        console.log(error);
    }

}

/**
 * Función para agregar las imágenes a la propiedad seleccionada.
 * @param {*} req Representa la petición.
 * @param {*} res Representa la respuesta.
 */
const agregarImagen = async(req,res) => {
    /**
     * Comprobar que la propiedad existe
     */
    const { id } = req.params;
    const propiedad = await Propiedad.findByPk(id);
    if(!propiedad){
        return res.redirect('/mis-propiedades');
    }

    /**
     * Comprobar que la propiedad no está publicada
     */
    if(propiedad.publicado){
        return res.redirect('/mis-propiedades');
    }

    /**
     * Validar que la propiedad pertenece al usuario que accede a la página
     */
    if(req.usuario.id.toString() !== propiedad.usuarioId.toString()){
        return res.redirect('/mis-propiedades');
    }

    res.render('propiedades/agregar-imagen',{
        pageName: `Agregar Imagen: ${propiedad.titulo}`,
        propiedad,
        csrfToken: req.csrfToken(),
    })
}

/**
 * Función para almacenar las imágenes de la propiedad.
 * @param {*} req Representa la petición.
 * @param {*} res Representa la respuesta.
 */

const almacenarImagen = async(req,res,next) => {
    /**
     * Comprobar que la propiedad existe
     */
    const { id } = req.params;
    const propiedad = await Propiedad.findByPk(id);
    if(!propiedad){
        return res.redirect('/mis-propiedades');
    }

    /**
     * Comprobar que la propiedad no está publicada
     */
    if(propiedad.publicado){
        return res.redirect('/mis-propiedades');
    }

    /**
     * Validar que la propiedad pertenece al usuario que accede a la página
     */
    if(req.usuario.id.toString() !== propiedad.usuarioId.toString()){
        return res.redirect('/mis-propiedades');
    }

    try {
        /**
         * Almacenar la Imagen y Publicar la Propiedad
         */
        propiedad.imagen = req.file.filename;
        propiedad.publicado = 1;
        await propiedad.save();
        next();

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
    guardar,
    agregarImagen,
    almacenarImagen
}