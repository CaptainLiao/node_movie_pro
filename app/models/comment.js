
let Mongoose = require('mongoose');
let CommentSchema = require('../schemas/comment');

let Comment = Mongoose.model('Comment', CommentSchema, 'comments');

module.exports = Comment;


