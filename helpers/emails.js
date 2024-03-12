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
                <a href="https://localhost:3000/auth/confirmar/${token}">Confirmar Cuenta</a> </p>
                <p> Si tu no has creado esta cuenta puedes ignorar el mensaje</p>
        `
    })

}

const emailOlvidePassword= async(datos) => {
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
      subject: 'Restablece tu Contraseña en AnunciaPropiedades.com',
      text: 'Restablece tu Contraseña en AnunciaPropiedades.com',
      html: `
              <p> Hola ${nombre}, solicitado restablecer Contraseña en AnunciaPropiedades.com</p>
              <p>  Sigue el siguiente enlace para generar una nueva Contraseña:
              <a href="http://localhost:3000/auth/olvide-password/${token}">Restablecer Contraseña</a> </p>
              <p> Si tu no has solicitado el cambio de contraseña puedes ignorar el mensaje</p>
      `
  })

}


export {
    emailRegistro,
    emailOlvidePassword
}