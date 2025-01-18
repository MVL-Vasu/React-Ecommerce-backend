
const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Create Endpoint for User Login

const Login = async (req, res) => {

     let {email, password} = req.body;

     let user = await Users.findOne({ email: email })

     if (user) {

          const passcompare = await bcrypt.compare(password, user.password);

          if (passcompare) {

               const data = {
                    user: {
                         id: user.id
                    }
               }

               const token = jwt.sign(data, 'secret_ecom');
               res.json({ success: true, token })

          }
          else {

               res.json({ success: false, error: 'Wrong password!' });

          }
     }

     else {

          res.json({ success: false, error: 'Wrong Email Address' });

     }

};

module.exports = Login;