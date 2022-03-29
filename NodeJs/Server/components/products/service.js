
const productModel = require('./model');



exports.getProducts = async () =>{

  /**
   * select * from products
   */
  const products =await productModel.find().populate('category_id')
    // return data;
    return products;
}

// lay chi tiet 1 san pham

exports.getById = async(id) =>{
    // const product = data.filter(item => item._id == id)[0];
    // return product;
    const product = await productModel.findById(id).populate('category_id');
    return product;
}

/**
 * them moi san pham
 */
exports.insert = async(product) =>{
    // data.push(product);
    const p =new productModel(product);
    await p.save();
}

/**
 * Xoa sp
 */
exports.delete = async(id)=>{
  // data = data.filter(item => item._id != id)
  await productModel.findByIdAndDelete(id);
}

/**
 * Sửa sản phẩm
 * 
 */
exports.update = async (id, product) =>{
  // data = data.map(item =>{
  //   if (item._id ==id){
  //     item ={...item,...product}
  //   }
  //   return item;
  // })
  await productModel.findByIdAndUpdate(id,product);
}


// var data = 
// [{
//     "_id": 1,
//     "name": "Gherkin",
//     "price": 72,
//     "quantity": 74,
//     "image": "https://fptshop.com.vn/Uploads/images/2015/Tin-Tuc/QuanLNH2/iphone-13-mini-1.jpg",
//     "description": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
//     "category_id": {
//         "_id": 8,
//         "name": "Sage - Fresh",
//         "description": "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam."
//       },
//     "released": "6/3/2021"
//   }, {
//     "_id": 2,
//     "name": "Cream - 18%",
//     "price": 97,
//     "quantity": 69,
//     "image": "https://fptshop.com.vn/Uploads/images/2015/Tin-Tuc/QuanLNH2/iphone-13-mini-1.jpg",
//     "description": "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
//     "category_id": {
//         "_id": 3,
//         "name": "Sorrel - Fresh",
//         "description": "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem."
//       },
//     "released": "3/25/2021"
//   }, {
//     "_id": 3,
//     "name": "Salmon Steak - Cohoe 8 Oz",
//     "price": 45,
//     "quantity": 32,
//     "image": "https://fptshop.com.vn/Uploads/images/2015/Tin-Tuc/QuanLNH2/iphone-13-mini-1.jpg",
//     "description": "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
//     "category_id": {
//         "_id": 6,
//         "name": "Phyllo Dough",
//         "description": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero."
//       },
//     "released": "8/25/2021"
//   }, {
//     "_id": 4,
//     "name": "Ham - Proscuitto",
//     "price": 89,
//     "quantity": 43,
//     "image": "https://fptshop.com.vn/Uploads/images/2015/Tin-Tuc/QuanLNH2/iphone-13-mini-1.jpg",
// "image": "https://fptshop.com.vn/Uploads/images/2015/Tin-Tuc/QuanLNH2/iphone-13-mini-1.jpg",
//     "description": "In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
//     "category_id": {
//         "_id": 9,
//         "name": "Crab - Soft Shell",
//         "description": "In congue. Etiam justo. Etiam pretium iaculis justo."
//       },
//     "released": "7/21/2021"
//   }, {
//     "_id": 8,
//     "name": "Soup - Campbells Pasta Fagioli",
//     "price": 75,
//     "quantity": 74,
//     "image": "https://fptshop.com.vn/Uploads/images/2015/Tin-Tuc/QuanLNH2/iphone-13-mini-1.jpg",
//     "description": "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
//     "category_id": {
//         "_id": 6,
//         "name": "Phyllo Dough",
//         "description": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero."
//       },
//     "released": "9/20/2021"
//   }, {
//     "_id": 9,
//     "name": "Bread - Ciabatta Buns",
//     "price": 32,
//     "quantity": 92,
//     "image": "https://fptshop.com.vn/Uploads/images/2015/Tin-Tuc/QuanLNH2/iphone-13-mini-1.jpg",
//     "description": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
//     "category_id":  {
//         "_id": 10,
//         "name": "Soup - Campbells",
//         "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis."
//       },
//     "released": "2/4/2022"
//   }, {
//     "_id": 10,
//     "name": "Bagelers",
//     "price": 71,
//     "quantity": 28,
//     "image": "https://fptshop.com.vn/Uploads/images/2015/Tin-Tuc/QuanLNH2/iphone-13-mini-1.jpg",
//     "description": "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
// "category_id": {
//         "_id": 1,
//         "name": "The Pop Shoppe - Grape",
//         "description": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est."
//       },
//     "released": "5/15/2021"
//   }]

