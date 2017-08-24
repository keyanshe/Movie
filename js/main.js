$(function () {
  function getData (_url, func) {
    $.ajax({
      type: 'GET',
      url: _url,
      dataType: 'jsonp',
      success: function (data) {
        func(data)
      }
    })
  }

  function search (str, title) {
    if (str.trim() === '') {
      alert('请输入')
    } else {
      localStorage.searchStr = str
      localStorage.title = title
      location.href = './movieList.html'
    }
  }

  $('.search button').on('click', function (e) {
    search($('.search input').val(), '搜索结果')
    e.preventDefault()
  })

  $('#rank').on('click', function (e) {
    localStorage.title = e.target.innerText
    location.href = './movieList.html'
  })
})
