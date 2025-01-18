const mongoose = require('mongoose');


// MONGODB CONNECTION STRING 
// const uri = "mongodb://127.0.0.1:27017/";
const uri = "mongodb+srv://vasumandaviya05:vlsxu1z4dIKmAALN@real-time-chat.yklqt.mongodb.net/NextJsEcommerce";

const getConnection = () => {

     try {

          mongoose.connect(uri, {
               useNewUrlParser: true,
               useUnifiedTopology: true
          }).then(() => {
               console.log('Connected to MongoDB Atlas successfully!');
          }).catch((error) => {
               console.error('Error connecting to MongoDB:', error);
          });

     } catch (error) {

          console.log(error);

     }

}

module.exports = getConnection;