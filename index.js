const port = 3001;
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

//IMPORT THE MONGODB CONNECTION FILE FROM UTILS FOLDER
const getConnection = require("./utils/getConnection");


const app = express();
// app.use(cors({
//      origin: ["https://react-ecommerce-frontend-iota.vercel.app"],
//      methods: ["GET", "POST"],
//      credentials: true
// }));  // Prevents Request Block when server and clien running in different ports

app.use(cors());
app.use(express.json());



// call the connection function
getConnection();

app.get('/example', async (req, res) => {
     try {
          // your code logic
          res.send('Success');
     } catch (error) {
          console.error('Error:', error);
          res.status(500).send('Internal Server Error');
     }
});


// ===================================> USER AUTHENTICATION APIS <=================================== //


// Create Endpoint for User Registration
app.post('/signup', require('./controllers/Register'));


// Create Endpoint for User Login
app.post('/login', require('./controllers/Login'));


app.post('/forgetpass', require('./controllers/ForgetPass'));

app.post('/verify', require('./controllers/VerifyOtp'));

app.post('/GetOtpTimer', require('./controllers/GetOtpTimer'));

app.post('/UpdatePass', require('./controllers/UpdatePass'));


// ===================================> IMAGE UPLOAD APIS <=================================== //

const imageUploadRoutes = require('./routes/imageUpload'); // Adjust the path if needed
app.use('/api', imageUploadRoutes);



// ====================================>  PRODUCT APIS <==================================== //


// Product Router 
const ProductRouter = require("./routes/ProductRoute");
app.use('/products', ProductRouter);



// ====================================>  CART APIS <==================================== //

const Users = require('./models/Users');
const Cart = require('./models/Cart');

app.post('/adminremove', async (req, res) => {

     let { id } = req.body;
     let product = await Cart.find({});


     // Iterate over each cart
     for (let cartproduct of product) {
          // Iterate over each item in the cart
          for (let i = 0; i < cartproduct.items.length; i++) {
               let item = cartproduct.items[i];
               // If the productId matches, remove the item
               if (item.productId === Number(id).toString()) {
                    cartproduct.items.splice(i, 1); // Remove the item
                    console.log('Removed:', item);
                    // i--; // Adjust index after removal to avoid skipping items
               }
          }
          // Save the updated cart
          await cartproduct.save();
     }

     // let data = Array(product)

     // data.map((item) => {

     //      item.map((cartproduct) => {

     //           cartproduct.items.map((a, i) => {

     //                if (a.productId === Number(id).toString()) {
     //                     cartproduct.items.splice(i, 1);
     //                     console.log(a);
     //                }

     //           })

     //      })
     // })

});



// END POINT FOR ADDING PRODUCT IN CART

// const Cart  = require("./models/Cart");

app.use("/cart", require("./routes/CartRouter"));


// END POINT FOR REMOVING PRODUCT FROM CART


// // ENDPOINT TO GET CART DATA

// app.post('/getcart', fetchuser, async (req, res) => {
//      let userdata = await Users.findOne({ _id: req.user.id })
//      res.json(userdata.cartData)
// })


app.listen(port, (error) => {
     if (!error) {
          console.log("Server Running on port " + port);
     }
     else {
          console.log("Error : " + error);
     }
})



