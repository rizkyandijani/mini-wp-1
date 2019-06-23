const nodemailer = require('nodemailer');
const clientUrl = `${process.env.CLIENT_URL}`

module.exports = {
    nodeMailer : function(email) {
        console.log('ini email kirim',email);
        console.log('ini email admin', process.env.NODE_MAILER_USER);
        console.log('ini pass admin', process.env.NODE_MAILER_PASS);
        
        
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: `${process.env.NODE_MAILER_USER}`, // generated ethereal user
            pass: `${process.env.NODE_MAILER_PASS}` // generated ethereal password
            }
        });
        let info = {
            from: `"Yo-Blogg" <${process.env.NODE_MAILER_USER}>`, // sender address
            to: `${email}`, // list of receivers
            subject: "ALERT", // Subject line
            html: `
                <h1> WELCOME TO YO-BLOGG </h1>
                <h4> find inspiration within humanity..</h4>
                <a href="${clientUrl}"> Check Yo-Blogg app. <a>                        
            ` 
        };
        return new Promise(( res, rej )=>{
            transporter.sendMail(info)
            .then(data =>{
                res(data)
            })
            .catch(err =>{
                rej(err)
            })
        }) 
    }

}