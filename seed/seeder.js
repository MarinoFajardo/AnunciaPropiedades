/**
 * Archivo para ejecutar los seeds de la Base de Datos
 */

/**
 * Imports
 */
import {exit} from 'node:process'
import categorias from "./categorias.js";
import usuarios from './usuarios.js';
import db from '../config/db.js';
import precios from './precios.js';
import {Categoria,Precio,Usuario} from '../models/index.js'

/**
 * Función para importar los datos del seeder a la BD
 */
const importarDatos = async () => {
    try{
        /**
         * Autenticarse en la BD
         */
        await db.authenticate();
        /**
         * Generar las columnas de la BD
         */
        await db.sync();
        /**
         * Insertar los datos en la BD
         */
        await Promise.all([
            Categoria.bulkCreate(categorias),
            Precio.bulkCreate(precios),
            Usuario.bulkCreate(usuarios)
        ]);
        console.log('Datos Importados Correctamente');
        exit();
    }catch(error){
        console.log(error);
        exit(1);
    }
}

/**
 * Función para eliminar los datos del seeder en la BD
 */
const eliminarDatos = async () => {
    try{
        /**
         * Autenticarse en la BD
         */
        await db.authenticate();
        /**
         * Generar las columnas de la BD
         */
        await db.sync({force:true});
        /**
         * Insertar los datos en la BD
         */
        /*await Promise.all([
            Categoria.destroy({where: {}, truncate:true}),
            Precio.destroy({where: {}, truncate:true})
        ]);*/
        console.log('Datos Eliminados Correctamente');
        exit();
    }catch(error){
        console.log(error);
        exit(1);
    }
}


if(process.argv[2] === "-i"){
    importarDatos();
}else if(process.argv[2] === "-e"){
    eliminarDatos();
}