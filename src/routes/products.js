const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');

const { renderAddProduct, addProduct, renderProducts, deleteProduct, editProduct, renderEditProduct } = require('../controllers/products.controller')

// Authorization
router.use(isLoggedIn);

// Routes
router.get('/add', renderAddProduct);
router.post('/add', addProduct);
router.get('/', isLoggedIn, renderProducts);
router.get('/delete/:id', deleteProduct);
router.get('/edit/:id', renderEditProduct);
router.post('/edit/:id', editProduct);

module.exports = router;