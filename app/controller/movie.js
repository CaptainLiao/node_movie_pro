let Movie = require('../models/movie');
let Category = require('../models/category')
let Comment = require('../models/comment');
let _ = require('underscore');

// movie控制器
  // detail 详情页
  exports.detail = (req, res) => {
    let id = req.params.id;

    Movie.findById(id, (err, movie) => {
      if(err) throw new Error(err)
        Comment.find({movie: id}) 
          .populate('from', 'username')
          .populate('reply.from reply.to', 'username')
          .exec((err, comments) => {
            console.log(comments);
          
            res.render('detail', {
              title: '豆瓣電影 '+ movie.title,
              movie: movie,
              comments: comments
          })
      })
    })
  };


  // admin update movie
  exports.update = function(req, res) {
    var id = req.params.id;
    console.log(id)

    if(id) {
      Movie.findById(id, (err, movie) => {
  
        Category.find({}, (err, categories) => {
          if(err) console.log(err)
          res.render('admin', {
            title: '豆瓣電影後臺更新頁',
            movie: movie,
            categories: categories
          })
        })
      })  
    }
  };

  // admin post movie
  exports.save = function (req, res){

    let movieObj = req.body.movie;
    let id = movieObj._id;
    var _movie = {};

    console.log(movieObj);
    console.log('id= '+id);

    if(id) {
      Movie.findById(id, (err, movie) => {
        if(err) return console.log(err)

        _movie = _.extend(movie, movieObj);
        _movie.save(function(err, movie) {
          if(err) console.log(err);
          res.redirect('/admin/movie/list')
          //res.redirect('/movie/' +movie._id)
        })
      })
    } else {
      _movie = new Movie(movieObj);

      let categoryId = _movie.category;

      _movie.save(function(err, movie) {
        if(err) console.log(err);

        Category.findById(categoryId, (err, category) => {
          category.movies.push(movie._id);
          category.save((err, category) => {
             res.redirect('/admin/movie/list');
          })
        })   
      })
    }
  };

  // list 列表页
  exports.list = (req, res) => {
    Movie.fetch((err, movies) => {
      if(err) throw new Error(err)
      res.render('list', {
        title: '电影列表页',
        movies: movies
      })
    })
  }

  // admin 后台
  exports.new = (req, res) => {
    Category.find({}, (err, categories) => {
      res.render('admin', {
        title: '电影后台',
        categories: categories,
        movie: {
          title: '',
          doctor: '',
          country: '',
          year: '',
          poster: '',
          flash: '',
          summary: '',
          language: '',
        }
      })
    })

  };

  // delete admin movie list
  exports.del = (req, res) => {
    let id = req.query.id;

    if(id) {
      Movie.remove({_id: id}, (err, movie) => {
        if(err) {
          console.log(err);
        } else {
          res.send({success: 1})
        }
      })
    }
  };