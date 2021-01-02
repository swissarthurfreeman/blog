const nodemailer = require('nodemailer')
const axios = require('axios')

module.exports = async (req, res) => {

    /*Don't use this, instead use OAUTH2 authentification with tokens.
    in order to send to gmail, there's a shit ton of security.

    https://nodemailer.com/usage/using-gmail/
    https://nodemailer.com/smtp/oauth2/
    
    split code into two controllers : one to send emails
    and the other (middleware it?) to check captcha.*/

    // SMTP parameters
    const smtp_trans = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    // Specify what the email will look like
    const mail_opts = {
        from: {
        name: "Gordon's blog contact form.",
        address: process.env.SMTP_USER
        },
        to: process.env.SMTP_USER,
        subject: `New message from ${req.body.name}`,
        text:
        `Email: ${req.body.email}\n` +
        `Number: ${req.body.number}\n\n` +
        `Message:\n\n` +
        req.body.message
    }

    //Attempt to send the email
    smtp_trans.sendMail(mail_opts, (error, response) => {
        if (error) {
        console.log(error)
        console.log("Error sending email");
        //on_failure()
        return
        }
        console.log("Success sending email");
        console.log(response)
        //on_success()
    })

  /*Google re-captcha bit, generatoke tokens for this website specifically,
  include in .env.*/ 
  /*const url = 'https://www.google.com/recaptcha/api/siteverify'
  const params = new URLSearchParams()
  params.append("secret", process.env.RECAPTCHA_SECRET)
  params.append("response", req.body["g-recaptcha-response"])

  //on envoie les données récupérées par le g-recaptcha à google afin
  //de confirmer l'utilisateur.
  axios.post(url, params).then((response) => {
    if (!response.data.success) {
      //send_error()
      console.log(response)
      console.log("error sending email")
      //logger.warn("Bad reCAPTCHA challenge")
      return
    }
    //sinon, on envoie l'email.
    smtp_send_mail(send_success, send_error)
  }).catch((error) => {
    //logger.error(`Error while verifying reCAPTCHA challenge: ${error}`)
    send_error()
  })*/
}
