// 电影分类

// 电影数据录入Schema

let mongoose = require('mongoose')

let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let MovieSchema = new Schema({
  name: String,
  // 电影的ObjectId
  movies: [{
    type: ObjectId,
    ref: 'Movie'
  }],
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

MovieSchema.pre('save', function(next) {
  if(this.isNew) {
    this.meta.update = this.meta.createAt = Date.now();
  } else {
    this.meta.update = Date.now();
  }

  next();
})

MovieSchema.statics = {
  fetch: function(cb) {
    return this.find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

module.exports = MovieSchema;