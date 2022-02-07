const express = require('express');
const db = require('../database');
const router = express.Router();
const {getCatagory,productCatagory, addUser,getUser,addCart,getCart,updateCart} = require('../controllers/product');

router.get('/getcatagory',getCatagory);
router.get('/products/:catagory',productCatagory);
router.post('/adduser',addUser);
router.get('/getuser/:email',getUser);


//cart



router.post('/addcart',addCart);
router.put('/updatecart',updateCart);
router.get('/getcart/:userId',getCart);
module.exports = router;