const categoryService = require('./service');

exports.getCategories = async () => {
    // const data = await categoryService.getCategories();
    // return data;
    let data = await categoryService.getCategories();
    data = data.map(item => {
        item = {
            _id: item._id,
            name: item.name,
            description: item.description,
        }
        return item;
    });
    console.log('############################################### get categories controller');
    return data;
}

exports.getById = async (id) => {
    // const product = data.filter(item => item._id == id)[0];
    // return product;
    let category = await categoryService.getById(id);
    category = {
        _id: category._id,
        name: category.name,
        description: category.description
    }
    return category;
}

exports.insert = async (body) => {
    await categoryService.insert(body);
}

exports.delete = async (id) => {  
    await categoryService.delete(id);
}

exports.update = async (id, category) => { 
    await categoryService.update(id, category);
}
