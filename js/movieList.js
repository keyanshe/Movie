
function listRender (data, el) {
  var html = ''
  data.forEach(function (item) {
    item = item.subject || item

    var actor = item.casts.map(function (item) {
      return item.name
    })

    var genres = item.genres.map(function (item) {
      return item
    })

    html += '<li class="rank-list-item clearfix" data-id="' + item.id + '">'
    html += '<img src="' + item.images.small + '" class="fl">'
    html += '<h3>' + item.title + '</h3>'
    html += '<p>演员：' + actor.join('/ ') + '</p>'
    html += '<p>评分：' + item.rating.average + '</p>'
    html += '<p>年份：' + item.year + '</p>'
    html += '<p>类型：' + genres.join('/ ') + '</p>'
    html += '</li>'
  })

  el.append(html)
}

function searchRender () {
  var url = 'https://api.douban.com/v2/movie/search?q=' + localStorage.searchStr
  $('.main h2').text(localStorage.title)
  document.title = localStorage.title

  getData(url, function (data) {
    listRender(data.subjects, $('#movie-list'))
  })
}

function newMovieRender () {
  var url = 'https://api.douban.com/v2/movie/new_movies?apikey=0df993c66c0c636e29ecbb5344252a4a'
  $('.main h2').text(localStorage.title)
  document.title = localStorage.title

  getData(url, function (data) {
    listRender(data.subjects, $('#movie-list'))
  })
}

function topMovieRender () {
  var url = 'https://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a'
  $('.main h2').text(localStorage.title)
  document.title = localStorage.title

  getData(url, function (data) {
    listRender(data.subjects, $('#movie-list'))
  })
}

function usBoxRender () {
  var url = 'https://api.douban.com/v2/movie/us_box?apikey=0df993c66c0c636e29ecbb5344252a4a'
  $('.main h2').text(localStorage.title)
  document.title = localStorage.title

  getData(url, function (data) {
    listRender(data.subjects, $('#movie-list'))
  })
}

function weeklyMovieRender () {
  var url = 'https://api.douban.com/v2/movie/weekly?apikey=0df993c66c0c636e29ecbb5344252a4a'
  $('.main h2').text(localStorage.title)
  document.title = localStorage.title

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

function Render () {
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
}

Render()
