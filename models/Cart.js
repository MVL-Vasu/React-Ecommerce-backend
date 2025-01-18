const mongoose = require('mongoose');

const Cart = mongoose.model("Cart" , {
     userId : String,
     items : [
          {
               productId : String,
               quantity : Number,
          },
     ],
});

module.exports = Cart;