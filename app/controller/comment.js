let Comment = require('../models/comment');

exports.save = function (req, res){

  let _comment = req.body.comment;
  let movieId = _comment.movie;

  if(_comment.cid) {  // 如果有用户与用户之间的评论
    Comment.findById(_comment.cid, (err, comment) => {
      let reply = {
        from: _comment.from,
        to: _comment.tid,
        content: _comment.content
      };

      comment.reply.push(reply);
      comment.save((err, comment) => {
        if(err) console.log(err);

        res.redirect('/movie/' + movieId);
      })

    })
  } else {  // 单独一条评论
    let comment = new Comment(_comment);

    comment.save(function(err, comment) {
      if(err) console.log(err);

      res.redirect('/movie/' + movieId);
    })
  }
};