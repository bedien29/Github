
const categoryModel = require('./model');


exports.getCategories = async() =>{
    // return data;
    
    /**
     * select *from categories
     */
    return await categoryModel.find();
}
exports.getById = async (id) => {
    // const product = data.filter(item => item._id == id)[0];
    // return product;
    const category = await categoryModel.findById(id);
    return category;
}

exports.insert = async (category) => {
    const p = new categoryModel(category);
    await p.save();
}

exports.delete = async (id) => {
    // data = data.filter(item => item._id != id);
    await categoryModel.findByIdAndDelete(id);
}

exports.update = async (id, category) => {
    await categoryModel.findByIdAndUpdate(id, category);
}













// var data = [{
//     "_id": 1,
//     "name": "Milk - 2% 250 Ml",
//     "description": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus."
//   }, {
//     "_id": 2,
//     "name": "Tea Leaves - Oolong",
//     "description": "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus."
//   }, {
//     "_id": 3,
//     "name": "Wine - Two Oceans Cabernet",
//     "description": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus."
//   }, {
//     "_id": 4,
//     "name": "Wine - Magnotta - Cab Franc",
//     "description": "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum."
//   }, {
//     "_id": 5,
//     "name": "Boogies",
//     "description": "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum."
//   }, {
//     "_id": 6,
//     "name": "C - Plus, Orange",
//     "description": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo."
//   }, {
//     "_id": 7,
//     "name": "Trout - Hot Smkd, Dbl Fillet",
//     "description": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis."
//   }, {
//     "_id": 8,
//     "name": "Beets - Golden",
//     "description": "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros."
//   }, {
//     "_id": 9,
//     "name": "Cumin - Whole",
//     "description": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum."
//   }, {
//     "_id": 10,
//     "name": "Wine - Marlbourough Sauv Blanc",
//     "description": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque."
//   }]