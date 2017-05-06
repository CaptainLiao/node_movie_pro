
// 首页路由控制器
let Movie = require('../models/movie');
let Category = require('../models/category');

// index page
exports.index = (req, res) => {
  Category
    .find({})
    .populate({path: 'movie', options: {limit: 5}})
    .exec((err, categories) => {
      if(err) throw new Error(err);

      res.render('index', {
        title: '電影首頁',
        categories: categories
      })
    })
}