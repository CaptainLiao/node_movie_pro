// 电影数据录入Schema

let mongoose = require('mongoose')

let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let MovieSchema = new Schema({
  category: ObjectId,
  doctor: String,
  title: String,
  language: String,
  country: String,
  summary: String,
  flash: String,
  poster: String,
  year: String,
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