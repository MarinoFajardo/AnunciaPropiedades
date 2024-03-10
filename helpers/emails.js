/**
 * Generación de los emails de confirmación y cambio de contraseña
 */

/**
 * Imports
 */

import nodemailer from 'nodemailer'

const emailRegistro = async(datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

    const {email,nombre,token} = datos

    /**
    * Enviar el email
    */
    await transport.sendMail({
        from: 'AnunciaPropiedades.com',
        to: email,
        subject: 'Confirma tu cuenta en AnunciaPropiedades.com',
        text: 'Confirma tu cuenta en AnunciaPropiedades.com',
        html: `
                <p> Hola ${nombre}, comprueba tu cuenta en AnunciaPropiedades.com</p>
                <p> Tu cuenta ya está lista, solo debes confirmarla en el siguiente enlace: 
                <a href="">Confirmar Cuenta</a> </p>
                <p> Si tu no has creado esta cuenta puedes ignorar el mensaje</p>
        `
    })

}


export {
    emailRegistro
}