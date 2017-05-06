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
  });

  $('#douban').blur(function() {
    var $douban = $(this);
    var id = $douban.val();

    if(id) {
      $.ajax({
        method: 'GET',
        url: 'https://api.douban.com/v2/movie/subject/' +id,
        cache: true,
        dataType: 'jsonp',
        jsonp: 'callback',
        crossDomain: true,
        success: function(data) {

          $('#inputTitle').val(data.title)
          $('#inputDoc').val(data.directors[0].name)
          $('#inputCountry').val(data.countries[0])
          $('#inputlanguage').val()
          $('#inputposter').val(data.images.large)
          $('#inputyear').val(data.year)
          $('#inputsummary').val(data.summary)
        }
      })
    }
  })

})