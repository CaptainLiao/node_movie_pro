
// 首页路由控制器
let Movie = require('../models/movie');
let Category = require('../models/category');

exports.index = (req, res) => {
  console.log('user in session: ');
  console.log(req.session.user);

  Movie.fetch((err, movies) => {
    if(err) throw new Error(err)
    res.render('index', {
      title: '電影首頁',
      movies: movies
    })
  })
}