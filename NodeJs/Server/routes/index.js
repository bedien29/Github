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




// /* GET san pham page. */
// router.get('/san-pham', function(req, res, next) {
//   res.render('index', { title: 'San pham' });
// });

// /* GET dien tich page. */
// router.get('/tinh-dien-tich', function(req, res, next) {
//   const {chieu_dai , chieu_rong} = req.query;
//   const dt = chieu_dai * chieu_rong;
//   res.render('index', { title: 'Dien tich', dt:dt });
// });

// /* GET giai phương trình page. */
// // localhost:3000/giai-phuong-trinh?a=10&b=8&c=5
// router.get('/giai-phuong-trinh', function(req, res, next) {
//   const {a, b, c} = req.query;
//   const kq='PT co 2 nghiem';
//   res.render('index', { title: 'hello nhung con nguoi dang yeu', kq:kq });
// });
// /* GET giai phương trình page. */
// // localhost:3000/bac2/giai-phuong-trinh?a=10&b=8&c=5
// router.get('/:loai/giai-phuong-trinh', function(req, res, next) {
//   //params
//   const {loai} = req.params;
//   /*
//   if(loai == 'bac1'){
//     giải pt bậc 1
//   }else if(loai == ' bac2'){
//     giai pt bậc 2
//   }
//   */
//   const {a, b, c} = req.query;
//   const kq='PT co 2 nghiem';
//   res.render('index', { title: 'hello nhung con nguoi dang yeu', kq:kq });
// });

// // Đăng nhập
// router.get('/dang-nhap', function(req, res, next) {
//   res.render('login');
// });
// //Bảng
// router.get('/chart', function(req, res, next) {
//   res.render('chart');
// });


// //POST
// router.post('/post', function(req, res, next) {
//   const {name} = req.body;
//   res.json({tieude : name, ten : name});
// });


// //req
//   //query : ?abc = 123
//   //params: /:id
//   //body

// //res
//   //render : tro den 1 view
//   //json   : API (application programing interface)


module.exports = router;
