/**
 * Clase para representar el modelo de los Usuarios
 */

/**
 * Imports
 */

import { DataTypes } from "sequelize"; //Sequelize
import db from "../config/db"; //Base de Datos

/**
 * Instanciación de los Usuarios
 */
const Usuario = db.define('usuarios',{
    nombre: {
        type: DataTypes.STRING,
        allowNull:false
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    },
    token: {
        type: DataTypes.STRING
    },
    confirmado: {
        type: DataTypes.BOOLEAN
    }
});

export default Usuario;