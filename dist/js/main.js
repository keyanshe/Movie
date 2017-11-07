
function detailRender () {
  var url = 'https://api.douban.com/v2/movie/subject/' + localStorage.id
  var html = ''
  getData(url, function (data) {
    var actor = data.casts.map(function (item) {
      return item.name
    })

    html += '<img src="' + data.images.large + '"></img>'
    html += '<h2>' + data.title + '</h2>'
    html += '<span>' + '导演：' + data.directors[0].name + '</span>'
    html += '<span>' + '年份：' + data.year + '</span>'
    html += '<span>' + '主演：' + actor.join('/ ') + '</span>'
    html += '<span>' + '类型：' + data.genres.join('/ ') + '</span>'
    html += '<span>' + '制作国家/地区：' + data.countries + '</span>'
    html += '<span>' + '豆瓣评分：' + data.rating.average + '分' + '</span>'
    html += '<span>' + '简介：' + data.summary + '</span>'

    $('.movie-mes').append(html)
  })
}

function commentsRender () {
  var url = 'https://api.douban.com/v2/movie/subject/' + localStorage.id + '/comments?apikey=0df993c66c0c636e29ecbb5344252a4a'
  var html = ''
  getData(url, function (data) {
    data.comments.forEach(function (item) {
      html += '<li class="movie-comments-item">'
      html += '<img class="fl" src="' + item.author.avatar + '">'
      html += '<div class="fl">'
      html += '<span>' + item.author.name + ' </span>'
      html += '<span class="comment-time"> ' + item.created_at + ' </span>'
      html += '<br />' + item.content
      html += '</div>'
      html += '</li>'
    })

    $('.movie-comments ul').append(html)
  })
}

detailRender()
commentsRender()

function hotMovieRender () {
  var $oUl = $('.hot-movie-list')
  var url = 'https://api.douban.com/v2/movie/nowplaying?apikey=0df993c66c0c636e29ecbb5344252a4a'

  getData(url, function (d) {
    var entries = d.entries
    var html = ''
    for (var i = 0; i < 12; i++) {
      html += '<li data-id="' + entries[i].id + '">'
      html += '<img src="' + entries[i].images.large + '" />'
      html += '<div class="hot-movie-mes">'
      html += '<h3>' + entries[i].title + '</h3>'
      html += '<p>' + '评分：' + entries[i].rating + '</p>'
      html += '</div>'
      html += '</li>'
    }
    $oUl.append(html)
  })
}

function futureMovieRender () {
  var $ul = $('.future-movie ul')
  var url = 'https://api.douban.com/v2/movie/coming?apikey=0df993c66c0c636e29ecbb5344252a4a'
  var html = ''
  getData(url, function (d) {
    var entries = d.entries
    for (var i = 0; i < 6; i++) {
      html += '<li>'
      html += '<div>'
      html += '<img src="' + entries[i].images.large + '" data-id="' + entries[i].id + '" />'
      html += '<h3>' + entries[i].title + '</h3>'
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

// https://api.douban.com/接口地址

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

$(function () {
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
