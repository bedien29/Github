var express = require('express');
var router = express.Router();

const userController = require('../components/users/controller');
const jwt = require('jsonwebtoken');
const signup = require('../middle/signup');


/**
 * page: login
 * http://localhost:3000/dang-nhap
 * method: get
 */
router.get('/dang-nhap', [signup.checkLogin], function (req, res, next) {
  res.render('login');
});
/**
 * page: login
 * http://localhost:3000/dang-nhap
 * method: post
 */
router.post('/dang-nhap', async function (req, res, next) {
  //su ly login
  //doc email, password tu body
  const { email, password } = req.body;
  //kiem tra 
  const result = await userController.login(email, password)
  //neu dung chuyen san pham
  if (result) {
    const token = jwt.sign({ _id: result._id, email: result.email }, 'myKey');
    req.session.token = token;
    res.redirect('/san-pham');
  } else {
    //neu sai van o trang login
    res.redirect('/dang-nhap')
  }
});
/**
 * page: 
 * http://localhost:3000/dang-xuat
 * method: get
 */
router.get('/dang-xuat', [signup.checkLogin], function (req, res, next) {
  req.session.destroy(function (err) {
    // dang xuat thanh cong chuyen qua trang dang nhap
    res.redirect('/dang-nhap')
  })

});

module.exports = router;
