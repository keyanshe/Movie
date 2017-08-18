function hotMovieRender () {
  var $oUl = $('.hot-movie-list')
  var url = 'https://api.douban.com/v2/movie/in_theaters'
  var aLi = []

  getData(url, function (d) {
    var subjects = d.subjects
    aLi = subjects.map(function (item, index) {
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

      li.append(img, div)
      li.attr('data-id', item.id)
      return li
    })

    aLi.map(function (oli) {
      $oUl.append(oli)
    })
  })
}

function futureMovieRender () {
  var $ul = $('.future-movie ul')
  var url = 'https://api.douban.com/v2/movie/coming_soon'
  var aLi = []
  getData(url, function (d) {
    var subjects = d.subjects
    for (var i = 0; i < 6; i++) {
      var li = $('<li></li>')
      var div = $('<div></div>')
      var h3 = $('<h3></h3>')
      var img = $('<img></img>')

      h3.append(subjects[i].title)
      img.attr('src', subjects[i].images.large)
      img.attr('data-id', subjects[i].id)
      div.append(img, h3)
      li.append(div)
      aLi.push(li)
    }
    aLi.map(function (oli) {
      $ul.append(oli)
    })
  })
}

function mRankRender () {
  var $ul = $('.movie-rank ul')
  var url = 'https://api.douban.com/v2/movie/weekly?apikey=0df993c66c0c636e29ecbb5344252a4a'
  var aLi = []
  getData(url, function (d) {
    var subjects = d.subjects
    aLi = subjects.map(function (item) {
      var li = $('<li></li>')
      var str = item.rank + '. ' + item.subject.title

      li.append(str)
      li.attr('data-id', item.subject.id)

      return li
    })
    aLi.map(function (oli) {
      $ul.append(oli)
    })
  })
}

function jumpToDetail (el) {
  localStorage.id = el.getAttribute('data-id')
  location.href = './detail.html'
}

$('.hot-movie-list').on('click', function (e) {
  var el = e.target

  while (el.nodeName !== 'LI') {
    el = el.parentNode
  }

  jumpToDetail(el)
})

$('#fmovie ul').on('click', function (e) {
  if (e.target.nodeName === 'IMG') jumpToDetail(e.target)
})

$('.movie-rank ul').on('click', function (e) {
  jumpToDetail(e.target)
})

mRankRender()
hotMovieRender()
futureMovieRender()

// https://api.douban.com/接口地址
