const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')
const nodemailerSendgrid = require('nodemailer-sendgrid');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let transporter = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: process.env.ADMIN_EMAIL_API_KEY
    })
)

app.post('/sendemail', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const company = req.body.company;
    const message = req.body.message;

    let mailOptions = {
        from: 'staffan.stromsholm@gmail.com',
        to: 'staffan.stromsholm@gmail.com',
        subject: 'Contact',
        html: `<h1>${name}</h1>
                <p><strong>email: </strong> ${email}</p>
                <p><strong>company:</strong> ${company}
                <p><strong>message:</strong></p> 
                <p>${message}</p>`
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log('An error occured: ' + err);
        } else {
            console.log('Email sent');
        }
    })
})

app.listen(PORT, () => console.log(`server running at port ${PORT}`))
