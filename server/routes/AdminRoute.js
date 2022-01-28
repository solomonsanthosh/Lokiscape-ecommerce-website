const express = require('express');
const db = require('../database');
const router = express.Router();
const  {addProduct, getProducts,deleteProduct,getProduct,updateProduct,putCatagory} = require('../controllers/product');
router.post('/addproduct', addProduct);
router.get('/getproducts', getProducts);
router.get('/getproduct/:id', getProduct);
router.delete('/deleteproduct/:id', deleteProduct);
router.put('/updateproduct/:id', updateProduct);
//catagory
router.put('/putCatagory',putCatagory);
module.exports = router;