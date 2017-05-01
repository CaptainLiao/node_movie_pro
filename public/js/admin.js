// 後臺數據刪除功能
$(function() {
  $('.del').on('click', function(e) {
    var t = $(e.target),
      id = t.data('id'),
      $tr = $('.item-id-' + id);
      console.log(id)

    $.ajax({
      method: 'DELETE',
      url: '/admin/movie/list?id=' + id
    })
    .done(function(res) {
      if(res.success === 1 && $tr.length > 0) {
        $tr.remove();
      }
    })
  })
})