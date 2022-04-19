const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const iphoneSchema = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    price: {type: Number}
});

module.exports = mongoose.model('iphone', iphoneSchema);