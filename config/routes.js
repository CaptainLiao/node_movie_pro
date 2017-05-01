let Index = require('../app/controller/index')
let Movie = require('../app/controller/movie')
let User = require('../app/controller/user')
let Comment = require('../app/controller/comment')

module.exports = function(app) {
  // 预处理session
  app.use((req, res, next) => {
    let _user = req.session.user;

    app.locals.user = _user;

    next();
  })

  // index 首页
  app.get('/', Index.index);


  // Movie
  app.get('/movie/:id', Movie.detail);
  app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update);
  app.post('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.save);
  app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list);
  app.get('/admin/movie/create', User.signinRequired, User.adminRequired, Movie.new);
  app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.del);

  // User
  app.get('/signin', User.showSignin);
  app.get('/signup', User.showSignup);
  app.post('/user/signup', User.signup);
  app.post('/user/signin', User.signin);
  app.get('/logout', User.logout);
  app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.userList);

  // comment
  app.post('/user/comment', User.signinRequired, Comment.save);
}