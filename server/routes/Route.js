const express = require('express');
const db = require('../database');
const router = express.Router();
const {getCatagory,productCatagory} = require('../controllers/product');

router.get('/getcatagory',getCatagory);
router.get('/products/:catagory',productCatagory);

module.exports = router;