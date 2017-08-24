$(function () {
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
})
