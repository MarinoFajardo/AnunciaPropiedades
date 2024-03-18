/**
 * Archivo para crear las relaciones entre las tablas
 */

import Propiedad from "./Propiedad.js";
import Categoria from "./Categoria.js";
import Precio from "./Precio.js";
import Usuario from "./Usuario.js";

/**
 * Relación Propiedad Precio
 */
Propiedad.belongsTo(Precio);

/**
 * Relación Propiedad Categoria
 */
Propiedad.belongsTo(Categoria);

/**
 * Relación Usuario Propiedad
 */

Propiedad.belongsTo(Usuario);

export {
    Propiedad,
    Precio,
    Categoria,
    Usuario
}

