require("dotenv").config();
const mongoose = require('mongoose');


const GetConnection = async () => {

     try {
          await mongoose.connect(process.env.MONGO_URI)
          console.log('Connected to MongoDB Atlas successfully!');
     } catch (error) {
          console.log('Error connecting to MongoDB:', error);
     }

}

module.exports = GetConnection;