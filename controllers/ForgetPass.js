const Otp = require('../models/Otp');
const Users = require('../models/Users');
const crypto = require('crypto');
const sendMail = require('../utils/SendMain');

const ForgetPass = async (req, res) => {
     try {
          // Find user by email
          const findEmail = await Users.findOne({ email: req.body.email });

          if (!findEmail) {
               return res.status(404).json({ success: false, error: 'Email does not exist' });
          }

          // Check for existing OTP record
          let check = await Otp.findOne({ email: req.body.email });

          // If no OTP record exists, create one
          if (!check) {
               check = new Otp({
                    email: req.body.email,
                    otp: {
                         otp: null,
                         sendtime: null,
                         token: null,
                    },
               });
          }

          // Validate if OTP was recently sent
          if (check.otp.otp && check.otp.sendtime && check.otp.sendtime > Date.now()) {
               const waitTime = new Date(check.otp.sendtime).toLocaleTimeString();
               return res.status(429).json({
                    success: false,
                    error: `Please wait until ${waitTime} to request another OTP`,
               });
          }

          // Generate OTP and token
          const otp1 = Math.floor(Math.random() * 900000) + 100000; // 6-digit OTP
          const token = crypto.randomBytes(32).toString('hex');

          
          // Update OTP record
          check.otp.otp = otp1;
          check.otp.sendtime = Date.now() + 60 * 1000; // OTP valid for 5 minutes
          check.otp.token = token;
          
          await check.save();

          sendMail(otp1, req.body.email);

          // Send response (you can integrate email sending here)
          res.status(200).json({
               success: true,
               message: 'OTP sent successfully',
               token,
          });

          // Note: Add email sending functionality here using a library like Nodemailer.
     } catch (error) {
          console.error('Error in ForgetPass:', error);
          res.status(500).json({ success: false, error: 'An internal server error occurred' });
     }
};

module.exports = ForgetPass;
