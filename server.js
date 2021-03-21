const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
})

let mailOptions = {
    from: 'septembermusic.stromsholm@gmail.com',
    to: 'staffan.stromsholm@gmail.com',
    subject: 'Testing',
    text: 'it works'
}

app.post('/sendemail', (req, res) => {
    transporter.sendMail(mailOptions, (err, data) => {
        if(err){
            console.log('An error occured: ' + err);
        } else {
            console.log('Email sent');
        }
    })
})



app.listen(PORT, () => console.log(`server running at port ${PORT}`))
