var express = require('express');
var router = express.Router();

const userController = require('../components/users/controller');
const productController = require('../components/products/controller');
const jwt = require('jsonwebtoken');
const signup = require('../middle/signup');


/**
 * page: register
 * http://localhost:3000/api/register
 * method: post
 */
router.post('/register', async function (req, res, next) {
  
  const { email, password, confirm_password } = req.body;
 
  const result = await userController.register(email, password,confirm_password)
  
  if (result) {
    res.json({status: true});
  } else {
    res.json({status: false});
  }
});

/**
 * page: register
 * http://localhost:3000/api/login
 * method: get
 */
router.post('/login', async function (req, res, next) {
  
  const { email, password } = req.body;
 
  const result = await userController.login(email, password);
  
 
  if (result) {
    const token = jwt.sign({ _id: result._id, email: result.email }, 'myKey');
    res.json({status: true,result,token})
  } else {
    res.json({status: false})
  }
});


/**
 * page: product
 * http://localhost:3000/api/products
 * method: get
 * detail:
 * author:
 * date:
 */
router.get('/products',[signup.checkToken], async function (req, res, next) {
  //lay danh sach san pham
  const products = await productController.getProducts();
  console.log(products);

  res.json(products);
});

router.get('/products/:id/detail',[signup.checkToken], async function (req, res, next) {

  const {id} = req.params;
  //lay danh sach san pham
  const product = await productController.getById(id);
  res.json(product);
});


module.exports = router;
