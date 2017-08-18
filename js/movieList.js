$(function () {
  function listRender (data, el) {
    var aLi = data.map(function (item) {
      item = item.subject || item

      var li = $('<li></li>')
      var img = $('<img></img>')
      var h3 = $('<h3></h3>')
      var p1 = $('<p></p>')
      var p2 = $('<p></p>')
      var p3 = $('<p></p>')
      var p4 = $('<p></p>')

      var actor = item.casts.map(function (item) {
        return item.name
      })

      var genres = item.genres.map(function (item) {
        return item
      })

      p1.append('演员：' + actor.join('/ '))

      p2.append('评分：' + item.rating.average)

      p3.append('年份：' + item.year)

      p4.append('类型：' + genres.join('/ '))

      h3.append(item.title)

      img.attr('src', item.images.small)
         .addClass('fl')

      li.addClass('rank-list-item clearfix')
        .attr('data-id', item.id)
        .append(img, h3, p1, p2, p3, p4)

      return li
    })

    aLi.map(function (oli) {
      el.append(oli)
    })
  }

  function searchRender () {
    var url = 'https://api.douban.com/v2/movie/search?q=' + localStorage.searchStr
    $('.main h2').text(localStorage.title)

    getData(url, function (data) {
      listRender(data.subjects, $('#movie-list'))
    })
  }

  function newMovieRender () {
    var url = 'https://api.douban.com/v2/movie/new_movies?apikey=0df993c66c0c636e29ecbb5344252a4a'
    $('.main h2').text(localStorage.title)
    getData(url, function (data) {
      listRender(data.subjects, $('#movie-list'))
    })
  }

  function topMovieRender () {
    var url = 'https://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a'
    $('.main h2').text(localStorage.title)

    getData(url, function (data) {
      listRender(data.subjects, $('#movie-list'))
    })
  }

  function usBoxRender () {
    var url = 'https://api.douban.com/v2/movie/us_box?apikey=0df993c66c0c636e29ecbb5344252a4a'
    $('.main h2').text(localStorage.title)

    getData(url, function (data) {
      listRender(data.subjects, $('#movie-list'))
    })
  }

  function weeklyMovieRender () {
    var url = 'https://api.douban.com/v2/movie/weekly?apikey=0df993c66c0c636e29ecbb5344252a4a'
    $('.main h2').text(localStorage.title)

    getData(url, function (data) {
      listRender(data.subjects, $('#movie-list'))
    })
  }

  $('#movie-list').on('click', function (e) {
    var el = e.target
    var id
    while (el.nodeName !== 'LI') {
      el = el.parentNode
    }

    id = el.getAttribute('data-id')
    localStorage.id = id
    location.href = './detail.html'
  })

  switch (localStorage.title) {
    case '搜索结果':
      searchRender()
      break
    case '新片榜':
      newMovieRender()
      break
    case '口碑榜':
      weeklyMovieRender()
      break
    case '北美票房榜':
      usBoxRender()
      break
    case 'Top250':
      topMovieRender()
      break
  }
})
