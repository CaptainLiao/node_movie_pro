let Movie = require('../models/movie');
let Comment = require('../models/comment');
let _ = require('underscore');
let Category = require('../models/category');

exports.new = function(req, res) {
  res.render('category_admin', {
    title: '电影分类录入页',
    category: {name: ''}
  })
};

exports.save = (req, res) => {
  let _category = req.body.category;
  let category = new Category(_category);

  category.save((err, category) => {
    if(err) console.log(err);

    res.redirect('/admin/category/list');
  })
};

exports.list = (req, res) => {
  Category.fetch((err, categories) => {
    if(err) throw new Error(err)
      res.render('categoryList', {
        title: '电影分类列表页',
        categories: categories
      })
  })
}

