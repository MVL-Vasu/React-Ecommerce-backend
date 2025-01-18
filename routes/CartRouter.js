const express = require("express");
const { addtocart, removefromcart, getcartitem } = require("../controllers/CartController");
const jwt = require("jsonwebtoken");
const router = express.Router();



// CREATING MIDDLEWARE TO FETCH USER

const fetchuser = async (req, res, next) => {
     const token = req.header('auth-token');
     if (!token) {
          console.log("please login first");
     }
     else {
          try {
               const data = jwt.verify(token, 'secret_ecom');
               req.user = data.user;
               next();
          }
          catch (error) {
               res.status(401).send({ errors: "please authenticate using a valid token" })
          }
     }
}

router.post("/addtocart", fetchuser, addtocart);

router.post("/removefromcart", fetchuser, removefromcart);

router.post("/getcartitem", fetchuser, getcartitem);

module.exports = router;