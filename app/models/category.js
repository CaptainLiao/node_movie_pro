
let Mongoose = require('mongoose');
let CategorySchema = require('../schemas/category');

let Category = Mongoose.model('Category', CategorySchema, 'category');

module.exports = Category;


