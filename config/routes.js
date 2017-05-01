let Index = require('../app/controller/index')
let Movie = require('../app/controller/movie')
let User = require('../app/controller/user')

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
  app.get('/admin/update/:id', Movie.update);
  app.post('/admin/movie/new', Movie.save);
  app.get('/admin/list', Movie.list);
  app.get('/admin/movie', Movie.new);
  app.delete('/admin/list', Movie.del);

  // User
  app.get('/signin', User.showSignin);
  app.get('/signup', User.showSignup);
  app.post('/user/signup', User.signup);
  app.post('/user/signin', User.signin);
  app.get('/logout', User.logout);
  app.get('/admin/userList', User.signinRequired, User.adminRequired, User.userList);
}