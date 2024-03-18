/**
 * Clase para representar el modelo de las Categorias
 */

/**
 * Imports
 */

import { DataTypes } from "sequelize"; //Sequelize
import db from "../config/db.js"; //Base de Datos

/**
 * Instanciación de las Categorias
 */

const Categoria = db.define('categorias',{
    nombre:{
        type:DataTypes.STRING(30),
        allowNull:false
    }
});

export default Categoria;