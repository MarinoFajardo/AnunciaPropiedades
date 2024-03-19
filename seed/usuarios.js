/**
 * Archivo para crear el seeder de los usuarios
 */
import bcrypt from 'bcrypt';

const usuarios = [
    {
        nombre:'Marino',
        email:'marino@correo.com',
        confirmado: 1,
        password: bcrypt.hashSync('password',10)
    }
]



export default usuarios;