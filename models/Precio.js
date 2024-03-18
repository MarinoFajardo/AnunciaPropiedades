/**
 * Clase para representar el modelo de laos Precios
 */

/**
 * Imports
 */

import { DataTypes } from "sequelize"; //Sequelize
import db from "../config/db.js"; //Base de Datos

/**
 * Instanciación de los Precios
 */
const Precio = db.define('precios',{
    nombre:{
        type:DataTypes.STRING(30),
        allowNull:false
    }
});

export default Precio;
