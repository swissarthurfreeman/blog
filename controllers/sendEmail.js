const nodemailer = require('nodemailer')
require('dotenv').config({path: '../.env'})
const axios = require('axios')

function sendEmail(req) { 
  //SMTP parameters
  console.log(process.env)
  const smtp_trans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    service: 'gmail', 
    auth: {
      user: `${process.env.GMAIL_FORWARDER_ADDRESS}`,
      pass: `${process.env.GMAIL_FORWARDER_PASS}`
    }
  })
  
  // Specify what the email will look like
  const mail_opts = {
      from: `${req.body.email}`,
      to: `${process.env.GMAIL_FORWARDER_ADDRESS}`,
      subject: `${req.body.name}`,
      number: `${req.body.number}`,
      text: `From: ${req.body.email}\n` + `Number: ${req.body.number}\n` + `Message: ${req.body.message}`
  }

  //Attempt to send the email
  smtp_trans.sendMail(mail_opts, (error, response) => {
      if (error) {
        console.log(error)
        console.log("Error sending email");
      } else {
        console.log("Success sending email");
        console.log(response)
      }
  })
}

module.exports = async (req, res) => {
  /*Tokens in .env*/ 
  const url = 'https://www.google.com/recaptcha/api/siteverify'
  const params = new URLSearchParams()
  params.append("secret", process.env.RECAPTCHA_SECRET)
  params.append("response", req.body["g-recaptcha-response"])

  //on envoie les données récupérées par le g-recaptcha à google afin
  //de confirmer l'utilisateur.
  axios.post(url, params).then((response) => {
    if (!response.data.success) {
      console.log("Bad ReCaptcha challenge")
      res.render('emailError')
    } else {
      //sinon, on envoie l'email.
      console.log("verification success")
      sendEmail(req)
      res.render('emailSuccess')
    }
    //smtp_send_mail(send_success, send_error)
  }).catch((error) => {
    res.render('emailError')
    console.log(error)
  })
}