let Movie = require('../models/movie');
let _ = require('underscore');

// movie控制器
  // detail 详情页
  exports.detail = (req, res) => {
    let id = req.params.id;

    Movie.findById(id, (err, movie) => {
      if(err) throw new Error(err)
      res.render('detail', {
        title: '豆瓣電影 '+ movie.title,
        movie: movie
      })
    })
  };

  // admin update movie
  exports.update = function(req, res) {
    var id = req.params.id;
    console.log(id)

    if(id) {
      Movie.findById(id, (err, movie) => {
        if(err) console.log(err)
        res.render('admin', {
          title: '豆瓣電影後臺更新頁',
          movie: movie
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

    if(id !== 'undefined') {
      Movie.findById(id, (err, movie) => {
        if(err) return console.log(err)

        _movie = _.extend(movie, movieObj);
        _movie.save(function(err, movie) {
          if(err) console.log(err);
          res.redirect('/admin/list')
          //res.redirect('/movie/' +movie._id)
        })
      })
    } else {
      _movie = new Movie({
        doctor: movieObj.doctor,
        title: movieObj.title,
        country: movieObj.country,
        language: movieObj.language,
        year: movieObj.year,
        poster: movieObj.poster,
        summary: movieObj.summary,
        flash: movieObj.flash,
      });

      _movie.save(function(err, movie) {
        if(err) console.log(err);

        res.redirect('/admin/list')
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
    res.render('admin', {
      title: '电影后台',
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