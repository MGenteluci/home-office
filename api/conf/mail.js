const nodemailer = require('nodemailer');

exports.send = (mailTo, name, day) => {
    
    const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });
    
    const mailOptions = {
        to: mailTo,
        subject: 'Novo Home Office Agendado!',
        html: `<h1>${name} - ${day}</h1>`
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
    
        if(error)
            return console.log(error);
    
        return console.log(`Mail sent: ${info.response}`);
    });

};