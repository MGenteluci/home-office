const nodemailer = require('nodemailer');

exports.send = (mailTo, name, day) => {
    
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'mail@gmail.com',
            pass: 'password'
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