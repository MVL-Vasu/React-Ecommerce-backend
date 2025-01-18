
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const Register = async (req, res) => {

     const { username, email, password } = req.body;

     let check = await Users.findOne({ email: email });

     if (check) {

          return res.status(400).json({ success: false, error: "user already exists" });

     }
     else {

          let cart = {};

          for (let i = 0; i < 300; i++) {
               cart[i] = 0;
          }

          const hashedpass = await bcrypt.hash(password, 10);

          const user = new Users({
               name: username,
               email: email,
               password: hashedpass,
               cartData: cart,
          })

          await user.save();

          const data = {
               user: {
                    id: user.id
               }
          }

          const token = jwt.sign(data, 'secret_ecom');

          res.json({ success: true, token })

     }

}

module.exports = Register;