const mailer = require('../conf/mail');

exports.sendMail = (req, res, next) => {
    
    let day = new Date(req.day);
    day = `${day.getDate()+1}/${day.getMonth()+1}/${day.getFullYear()}`;
    
    mailer.send(req.mailTo, req.userFullName, day);

    return res.status(201).json({ message: 'Home Office added' });
};