const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config();

const nodemailer = require('nodemailer');

// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

// Step 2



app.post('/contact/sendmail', (req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const company = req.body.company;
    const subject = req.body.subject;
    const message = req.body.message;

    let mailOptions = {
        from: 'staffan.stromsholm@gmail.com',
        to: 'septembermusic.stromsholm@gmail.com',
        subject,
        text: `Name: ${name}, Company: ${company}, message: ${message}`
    }

    // Step 3
    transporter.sendMail(mailOptions, function(err, data){
    if(err) {
        console.log('Error Occurs: ' + err);
        res.status(404).json(err);
    } else {
        res.status(200).json('yay');
    }
})
})






app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})