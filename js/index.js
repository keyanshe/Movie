$(function () {
  function hotMovieRender () {
    var $oUl = $('.hot-movie-list')
    var url = 'https://api.douban.com/v2/movie/in_theaters'

    getData(url, function (d) {
      var subjects = d.subjects
      var html = ''
      subjects.forEach(function (item, index) {
        html += '<li data-id="' + item.id + '">'
        html += '<img src="' + item.images.large + '" />'
        html += '<div class="hot-movie-mes">'
        html += '<h3>' + item.title + '</h3>'
        html += '<p>' + '评分：' + item.rating.average + '</p>'
        html += '</div>'
        html += '</li>'
      })

      $oUl.append(html)
    })
  }

  function futureMovieRender () {
    var $ul = $('.future-movie ul')
    var url = 'https://api.douban.com/v2/movie/coming_soon'
    var html = ''
    getData(url, function (d) {
      var subjects = d.subjects
      for (var i = 0; i < 6; i++) {
        html += '<li>'
        html += '<div>'
        html += '<img src="' + subjects[i].images.large + '" data-id="' + subjects[i].id + '" />'
        html += '<h3>' + subjects[i].title + '</h3>'
        html += '</div>'
        html += '</li>'
      }
      $ul.append(html)
    })
  }

  function mRankRender () {
    var $ul = $('.movie-rank ul')
    var url = 'https://api.douban.com/v2/movie/weekly?apikey=0df993c66c0c636e29ecbb5344252a4a'
    var html = ''
    getData(url, function (d) {
      var subjects = d.subjects
      subjects.forEach(function (item) {
        var str = item.rank + '. ' + item.subject.title

        html += '<li data-id="' + item.subject.id + '">'
        html += str
        html += '</li>'
      })

      $ul.append(html)
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
})

// https://api.douban.com/接口地址
