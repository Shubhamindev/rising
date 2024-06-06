const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try{
            let transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                auth:{
                    user: "maddison53@ethereal.email",
                    pass: "jn7jnAPss4f63QBp6D",
                }
            })


            let info = await transporter.sendMail({
                from: 'rising starts || CodeHelp - by developers',
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
            console.log(info);
            return info;
    }
    catch(error) {
        console.log(error.message);
    }
}


module.exports = mailSender;