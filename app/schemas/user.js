// 用户登录注册Schema
// 使用hash + salt的方式加密，本项目使用bcrypt进行（window中使用npm install bcryptjs）

let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');
let SALT_WORK_FACTOR = 10;

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  // 用户权限管理
  // 0: normal
  // 1：verified user
  // 2：professional user
  // >10：admin
  // >50：super admin
  role: {
    type: Number,
    default: 0
  },
  username: {
    unique: true,
    type: String
  },
  password: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

UserSchema.pre('save', function(next) {
  let user = this;

  if(this.isNew) {
    this.meta.update = this.meta.createAt = Date.now();
  } else {
    this.meta.update = Date.now();
  }

  // 加密
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if(err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) return next(err)

      user.password = hash;
      next();
    })
  })
})

// 实例方法，实例可以调用
UserSchema.methods = {
  comparePassword(password, cb) {
    bcrypt.compare(password, this.password, (err, isMatched) => {
      if(err) return cb(err);

      cb(null, isMatched);
    });
  }
};

// 静态方法，只有模型才可以调用
UserSchema.statics = {
  fetch: function(cb) {
    return this.find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  },
  comparePassword: function(password, hash, cb) {
    bcrypt.compare(password, hash, cb)
  }
}

module.exports = UserSchema;