const nodemailer = require('nodemailer');


const sendMail = (otp, email) => {

     const transport = nodemailer.createTransport({

          service: 'GMAIL',
          auth: {
               user: 'vasumandaviya05@gmail.com',
               pass: 'fite lpov wahj ckng'
          },

     })

     const mailOptions = {
          from: 'vasumandaviya05@gmail.com',
          to: email,
          subject: 'reset password otp',
          html: `<div>${otp}</div>`,
     }


     transport.sendMail(mailOptions, (err, res) => {
          if (err) {
               return res.status(500).json({ success: false, error: 'failed to send mail' });
          }
     });

}


module.exports = sendMail;