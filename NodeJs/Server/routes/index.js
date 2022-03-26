var express = require('express');
var router = express.Router();

const userController = require('../components/users/controller');

/**
 * page: login
 * http://localhost:3000/dang-nhap
 * method: get
 */
 router.get('/', function(req, res, next) {
  res.render('login');
});
router.get('/dang-nhap', function(req, res, next) {
  res.render('login');
});
/**
 * page: login
 * http://localhost:3000/dang-nhap
 * method: post
 */
router.post('/dang-nhap',async function(req, res, next) {
  //su ly login
  //doc email, password tu body
  const {email, password} = req.body;
  //kiem tra 
  const result =await userController.login(email,password)
  //neu dung chuyen san pham
  if (result) {
    res.redirect('/san-pham');
  }else{
  //neu sai van o trang login
  res.redirect('/dang-nhap')
  }
});
/**
 * page: 
 * http://localhost:3000/dang-xuat
 * method: get
 */
router.get('/dang-xuat', function(req, res, next) {
  // dang xuat thanh cong chuyen qua trang dang nhap
  res.redirect('/dang-nhap')
});

module.exports = router;
