const Cart = require("../models/Cart");


const addtocart = async (req, res) => {

     const userId = req.user.id;

     const { itemId } = req.body;

     let usercart = await Cart.findOne({ userId });


     if (!usercart) {
          usercart = new Cart({ userId, items: [] })
     }

     const item = await usercart.items.find((item) => item.productId === itemId.toString());

     if (item) {
          item.quantity += 1;
     }
     else {
          usercart.items.push({ productId: itemId, quantity: 1 });
     }

     await usercart.save();

     // res.json(usercart);

     res.send({
          success: true,
     })

}


const removefromcart = async (req, res) => {

     const userId = req.user.id;
     const { itemId } = req.body;

     let usercart = await Cart.findOne({ userId });

     if (!usercart) {
          return res.status(404).json({ success: false, error: "Cart Not Found" });
     }

     const ItemIndex = await usercart.items.findIndex((item) => item.productId === itemId.toString());

     if (usercart.items[ItemIndex].quantity > 1) {

          usercart.items[ItemIndex].quantity -= 1;

     } else {

          usercart.items.splice(ItemIndex, 1);

     }

     await usercart.save();

     res.send({ success: true });

}

const getcartitem = async (req, res) => {

     const userId = req.user.id;

     const usercart = await Cart.findOne({ userId });

     if (usercart !== null) {
          res.json(usercart.items);
     }
     // res.json({ success: false})

}


module.exports = { addtocart, removefromcart, getcartitem };