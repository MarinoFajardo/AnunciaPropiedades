/**
 * Clase para representar el modelo de los Usuarios
 */

/**
 * Imports
 */

import { DataTypes } from "sequelize"; //Sequelize
import bcrypt from 'bcrypt' //Encriptado de password
import db from "../config/db.js"; //Base de Datos

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
},
{
    hooks: {
        beforeCreate: async function(usuario){
            const salt = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash(usuario.password,salt);
        }
    }
});

export default Usuario;