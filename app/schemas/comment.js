// 电影数据录入Schema

let mongoose = require('mongoose')

let Schema = mongoose.Schema;

let CommentSchema = new Schema({
  movie: {type: 'ObjectId', ref: 'movie'},
  from: {type: 'ObjectId', ref: 'User'},
  reply: [{
    to: {type: 'ObjectId', ref: 'User'},
    from: {type: 'ObjectId', ref: 'User'},
    content: String
  }],
  
  content: String,
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

CommentSchema.pre('save', function(next) {
  if(this.isNew) {
    this.meta.update = this.meta.createAt = Date.now();
  } else {
    this.meta.update = Date.now();
  }

  next();
})

CommentSchema.statics = {
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

module.exports = CommentSchema;