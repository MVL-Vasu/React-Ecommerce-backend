
const Product = require('../models/Product');


// Add Product API

const addproduct = async (req, res) => {

     // fetch all products from the database
     let products = await Product.find({});

     let id;
     if (products.length > 0) {
          // access the last product from the database
          let last_product_array = products.slice(-1);

          let last_product = last_product_array[0];

          // increment the id i.e. supposed last product id is 10 then id will be 11
          id = last_product.id + 1;
     }
     else {
          id = 1;
     }

     const product = new Product({
          id: id,
          name: req.body.name,
          image: req.body.image,
          category: req.body.category,
          new_price: req.body.new_price,
          old_price: req.body.old_price
     });
     await product.save();
     res.json({
          success: true,
          name: req.body.name,
     })
}




const remove_product = async (req, res) => {

     await Product.findOneAndDelete({ id: req.body.id });

     res.json({

          success: true,
          name: req.body.name

     })

}


const allproducts = async (req, res) => {

     let products = await Product.find({});
     res.send(products);

}


const popularinwomen = async (req, res) => {

     let product = await Product.find({ category: "womens" }).limit(4)
     res.json(product);

}


const newcollections = async (req, res) => {

     let products = await Product.find().sort({ _id: -1 }).limit(8);
     res.json(products);

}

const singleproduct = async (req, res) => {

     let productid = req.params.productId;
     
     let product = await Product.findOne({ id: productid });
     
     if (!product) {
          return res.status(404).json("product not found");
     }
     // console.log(product);
     res.json(product);

}

module.exports = { singleproduct, addproduct, remove_product, allproducts, popularinwomen, newcollections };
