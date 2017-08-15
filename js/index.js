function hotMovieRender () {
  var $ul = $('.hot-movie-list ul')
  var url = 'https://api.douban.com/v2/movie/in_theaters'
  getData(url, function (d) {
    d.subjects.map(function (item) {
      var li = $('<li></li>')
      var img = $('<img></img>')
      var div = $('<div></div>')
      var h3 = $('<h3></h3>')
      var p = $('<p></p>')

      p.append('评分：' + item.rating.average)
      h3.append(item.title)
      div.addClass('hot-movie-mes')
      div.append(h3, p)
      img.attr('src', item.images.large)
      img.attr('data-id', item.id)
      li.append(img, div)
      $ul.append(li)
    })
  })
}

function futureMovieRender () {
  var $ul = $('.future-movie ul')
  var url = 'https://api.douban.com/v2/movie/coming_soon'

  getData(url, function (d) {
    for (var i = 0; i < 6; i++) {
      var li = $('<li></li>')
      var div = $('<div></div>')
      var h3 = $('<h3></h3>')
      var img = $('<img></img>')

      h3.append(d.subjects[i].title)
      img.attr('src', d.subjects[i].images.large)
      img.attr('data-id', d.subjects[i].id)
      div.append(img, h3)
      li.append(div)
      $ul.append(li)
    }
  })
}

function mRankRender () {
  var $ul = $('.movie-rank ul')
  var url = 'https://api.douban.com/v2/movie/weekly?apikey=0df993c66c0c636e29ecbb5344252a4a'

  getData(url, function (d) {
    d.subjects.map(function (item) {
      var li = $('<li></li>')
      var str = item.rank + '. ' + item.subject.title

      li.append(str)
      li.attr('data-id', item.subject.id)
      $ul.append(li)
    })
  })
}

$('.hot-movie-list ul').on('click', function (e) {
  localStorage.id = e.target.getAttribute('data-id')
  location.href = './detail.html'
})

$('#fmovie ul').on('click', function (e) {
  localStorage.id = e.target.getAttribute('data-id')
  location.href = './detail.html'
})

$('.movie-rank ul').on('click', function (e) {
  localStorage.id = e.target.getAttribute('data-id')
  location.href = './detail.html'
})

mRankRender()
hotMovieRender()
futureMovieRender()

// https://api.douban.com/接口地址
