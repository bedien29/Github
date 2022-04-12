var express = require('express');
var router = express.Router();

const productController = require('../components/products/controller');
const categoryController = require('../components/categories/controller');
const upload = require('../middle/upload');
const signup = require('../middle/signup');

/**
 * page: product
 * http://localhost:3000/san-pham
 * method: get
 * detail get list products
 */
router.get('/',[signup.checkLogin], async function (req, res, next) {
  //lay danh sach san pham
  const products = await productController.getProducts();
console.log(products);
  res.render('products', { products: products });
});

/**
 * page: product
 * http://localhost:3000/san-pham
 * method: post
 * detail insert new products
 */
router.post('/', [upload.single('image'),signup.checkLogin], async function (req, res, next) {
  //su ly them moi san pham
  let { params, body, file } = req;
  let image = '';
  if (file) {
    image = `http://192.168.43.164:3000/images/${file.filename}`;
  }

  body = { ...body, image };
  await productController.insert(body)
  res.redirect('/san-pham',);
});

/**
 * page: product
 * http://localhost:3000/san-pham
 * method: get
 * detail insert new products
 */
router.get('/insert',[signup.checkLogin], async function (req, res, next) {
  //su ly them moi san pham
  const categories = await categoryController.getCategories();
  res.render('product_insert', { categories: categories });
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
  await productController.delete(id);
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
  const product = await productController.getById(id);
  // lay danj sach danh muc
  const categories = await categoryController.getCategories();
  res.render('product', { product: product, categories:categories });
});
/**
* page: product
* http://localhost:3000/san-pham/:id/edit
* method: post
* detail: update on products
*/
router.post('/:id/edit', [upload.single('image'),signup.checkLogin], async function (req, res, next) {
  // su ly cap nhat san pham
  let { params, file, body } = req;
  delete body.image;

  if (file) {
    image = `http://192.168.43.164:3000/images/${file.filename}`;
    body = { ...body, image };
  }
 
  await productController.update(params.id, body);
  res.redirect('/san-pham',);
});


module.exports = router;