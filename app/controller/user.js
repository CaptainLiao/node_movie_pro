let User = require('../models/user');

// 用户列表页
exports.userList = (req, res) => {
  User.fetch((err, users) => {
    if(err) throw new Error(err)
      res.render('userList', {
        title: '用户列表页',
        users: users
      })
  })
}

// showSignin
exports.showSignin = (req, res) => {
  res.render('signin', {
    title: '登录'
  })
}
// showSignup
exports.showSignup = (req, res) => {
  res.render('signup', {
    title: '注册'
  })
}

  // 注册
  exports.signup = (req, res) => {
    let _user = req.body.user;
    let user = new User(_user);

    User.find({username: _user.username}, (err, user) => {
      if(err) return console.log(err);

      if(user.length > 0) {
        res.redirect('/signin');
      } else {
        user.save((err, user) => {
          if(err) return console.log(err);

          res.redirect('/admin/userList');
        })
      }
    });
  };

  // 登录
  exports.signin = (req, res) => {
    let _user = req.body.user;
    let username = _user.username;
    let password = _user.password;
    console.log(_user)
    if(username && password) {
      User.findOne({username: username}, (err, user) => {
        if(err) console.log(err);

        if(!user) {
          res.redirect('/signup');
        } else {
          console.log(user);
          user.comparePassword(password, (err, isMatched) => {
            if(err) console.log(err);

            if(isMatched) {
              req.session.user = user;
              res.redirect('/');
            } else {
              res.redirect('/signin');
            }
          })
        }
      })
    } else {
      res.send('用户名或密码不能为空')
    }
  };

  // 退出
  exports.logout = (req, res) => {
    delete req.session.user;
    //delete app.locals.user;

    res.redirect('/')
  }

// midware for user
exports.signinRequired = (req, res, next) => {
  let user = req.session.user;

  if(!user) {
    return res.redirect('/signin')
  }
  next();
}

exports.adminRequired = (req, res, next) => {
  let user = req.session.user;

  if(user.role <= 10) {
    return res.redirect('/signin');
  }
  next();
}
