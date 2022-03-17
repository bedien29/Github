var express = require('express');
var router = express.Router();

/**
 * page: product
 * http://localhost:3000/san-pham
 * method: get
 * detail get list products
 */
router.get('/', function(req, res, next) {
  //lay danh sach san pham
  res.render('products',);
});

/**
 * page: product
 * http://localhost:3000/san-pham
 * method: post
 * detail insert new products
 */
router.post('/', function(req, res, next) {
//su ly them moi san pham

  res.render('products',);
});

/**
 * page: product
 * http://localhost:3000/san-pham/:id/delete
 * method: delete
 * detail: delete products
 */
router.delete('/:id/delete', function(req, res, next) {
  // su ly xoa san pham
  const {id} = req.params;

    res.render('products',);
  });

  /**
 * page: product
 * http://localhost:3000/san-pham/:id/edit
 * method: get
 * detail: get on products
 */
router.get('/:id/edit', function(req, res, next) {
  // xem chi tiet san pham
    res.render('products',);
  });
    /**
 * page: product
 * http://localhost:3000/san-pham/:id/edit
 * method: put
 * detail: update on products
 */
router.put('/:id/edit', function(req, res, next) {
  // xem chi tiet san pham
    res.render('products',);
  });


module.exports = router;