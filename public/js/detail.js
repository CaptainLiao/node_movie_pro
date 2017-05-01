// 後臺數據刪除功能
$(function() {
  $('.comment').on('click', function(e) {
    var $target = $(this),
      toId = $target.data('tid'),
      commentId = $target.data('cid');

    if($('#toId').length > 0) {
      $('#toId').val(toId);
    } else {
      $('<input>')
      .attr({
        type: 'hidden',
        id: 'toId',
        name: 'comment[tid]',
        value: toId
      })
      .appendTo('#commentForm');
    }

    if($('#commentId').length > 0) {
      $('#commentId').val(toId);
    } else {
      $('<input>')
        .attr({
          type: 'hidden',
          id: 'commentId',
          name: 'comment[cid]',
          value: commentId
        }) 
        .appendTo('#commentForm');
    }
  })
})