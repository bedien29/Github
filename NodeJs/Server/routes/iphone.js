var express = require('express');
var router = express.Router();

const productController = require('../components/products/controller');
const categoryController = require('../components/categories/controller');
const iphoneController = require('../components/iphones/controller');
const upload = require('../middle/upload');
const signup = require('../middle/signup');

/**
 * page: iphone
 * http://localhost:3000/iphone
 * method: get
 * detail get list products
 */
router.get('/',[signup.checkLogin], async function (req, res, next) {
  //lay danh sach san pham
  const iphones = await iphoneController.getIphones();
console.log(iphones);
  res.render('iphones', { iphones: iphones });
});

/**
 * page: product
 * http://localhost:3000/san-pham
 * method: post
 * detail insert new products
 */
// router.post('/', [upload.single('image'),signup.checkLogin], async function (req, res, next) {
//   //su ly them moi san pham
//   let { params, body, file } = req;
//   let image = '';
//   if (file) {
//     image = `http://192.168.43.164:3000/images/${file.filename}`;
//   }

//   body = { ...body, image };
//   await productController.insert(body)
//   res.redirect('/san-pham',);
// });

/**
 * page: iphone
 * http://localhost:3000/san-pham
 * method: get
 * detail insert new iphone
 */
router.get('/insert',[signup.checkLogin], async function (req, res, next) {
  //su ly them moi san pham
  const iphones = await iphoneController.getIphones();
  res.render('iphone_insert', { iphones: iphones });
});


/**
 * page: product
 * http://localhost:3000/san-pham/:id/delete
 * method: delete
 * detail: delete products
 */
router.delete('/:id/delete',[signup.checkLogin], async function (req, res, next) {
  // su ly xoa san pham
  const { id } = req.params;
  await iphoneController.delete(id);
  //tra ve du lieu dang json
  res.json({ result: true });
});

/**
* page: product
* http://localhost:3000/san-pham/:id/edit
* method: get
* detail: get on products
*/
router.get('/:id/edit',[signup.checkLogin], async function (req, res, next) {
  const { id } = req.params;
  // xem chi tiet san pham
  const iphone = await iphoneController.getById(id);
  // lay danj sach danh muc
  const iphones = await iphoneController.getIphones();
  res.render('iphone', { iphone: iphone, iphones:iphones });
});
/**
* page: product
* http://localhost:3000/san-pham/:id/edit
* method: post
* detail: update on products
*/
// router.post('/:id/edit', [upload.single('image'),signup.checkLogin], async function (req, res, next) {
//   // su ly cap nhat san pham
//   let { params, file, body } = req;
//   delete body.image;

//   if (file) {
//     image = `http://192.168.43.164:3000/images/${file.filename}`;
//     body = { ...body, image };
//   }
 
//   await productController.update(params.id, body);
//   res.redirect('/san-pham',);
// });


module.exports = router;