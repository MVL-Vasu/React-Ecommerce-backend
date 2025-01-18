const express = require('express');
const Product = require('../models/Product');
const { singleproduct, addproduct, remove_product, allproducts, popularinwomen, newcollections } = require("../controllers/ProductController");

const router = express.Router();


// Add product 
router.post('/addproduct', addproduct);

// Remove product
router.post('/remove_product', remove_product);

// Get all products
router.get('/allproducts', allproducts);

// Popular in women products
router.get('/popularinwomen', popularinwomen);

// Get Letest Products
router.get('/newcollections', newcollections);


router.get('/:productId', singleproduct);

module.exports = router;

