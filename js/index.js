function hotMovieRender () {
  var $oUl = $('.hot-movie-list')
  var url = 'https://api.douban.com/v2/movie/in_theaters'

  getData(url, function (d) {
    var subjects = d.subjects
    var html = ''
    subjects.forEach(function (item, index) {
      html += '<li data-id="' +
        item.id +
        '"><img src="' +
        item.images.large +
        '" /><div class="hot-movie-mes"><h3>' +
        item.title +
        '</h3><p>' +
        '评分：' + item.rating.average +
        '</p></div></li>'
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
      html += '<li><div><img src="' +
        subjects[i].images.large +
        '" data-id="' +
        subjects[i].id +
        '" /><h3>' +
        subjects[i].title +
        '</h3></div></li>'
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
      html += '<li data-id="' +
        item.subject.id +
        '">' +
        str +
        '</li>'
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
