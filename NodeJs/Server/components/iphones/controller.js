const iphoneService = require('./service');

exports.getIphones = async () => {
    // const data = await categoryService.getCategories();
    // return data;
    let data = await iphoneService.getIphones();
    data = data.map(item => {
        item = {
            _id: item._id,
            name: item.name,
           price: item.price,
        }
        return item;
    });
    console.log('############################################### get categories controller');
    return data;
}

exports.getById = async (id) => {
    // const product = data.filter(item => item._id == id)[0];
    // return product;
    let iphone = await iphoneService.getById(id);
    iphone = {
        _id: iphone._id,
        name: iphone.name,
        price: iphone.price
    }
    return iphone;
}

exports.insert = async (body) => {
    await iphoneService.insert(body);
}

exports.delete = async (id) => {  
    await iphoneService.delete(id);
}

exports.update = async (id, iphone) => { 
    await iphoneService.update(id, iphone);
}
