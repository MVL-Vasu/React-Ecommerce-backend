const mongoose = require('mongoose');

const Otp = mongoose.model('Otp', {
     email: {
          type: String,
     },
     otp: {
          otp: { type: String },
          sendtime: { type: Number },
          token: { type: String },
     },
});

module.exports = Otp;