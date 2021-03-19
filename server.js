const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const credits = require('./config');
const nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport');

const mailTransporter = nodemailer.createTransport(sgTransport({
    auth: {
        api_key: credits.ADMIN_EMAIL_API_KEY
    }
}))

app.post('/sendemail', (req, res) => {
    const name = req.body.name;
    const company = req.body.company;
    const email = req.body.email;
    const message = req.body.message;

    const mailOptions = {
        from: `"Admin" <${credits.FROM_EMAIL}>`,
        to: `${credits.TO_EMAIL}`,
        replyTo: `${credits.TO_EMAIL}`,
        subject: 'Portoflio Contact Form',
        html: `<h1>${name}</h1>
                <h3>${company}</h3>
                <p>${message}</p>`
    }

    mailTransporter.sendMail(mailOptions, (err, result) => {
        if(err){
            res.send({message:err})
        } else {
            res.send({message: 'Email has been sent!'})
        }
    })
})

app.listen(PORT, () => console.log(`server running at port ${PORT}`))
