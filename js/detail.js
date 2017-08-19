(function () {
  function detailRender () {
    var url = 'https://api.douban.com/v2/movie/subject/' + localStorage.id
    var html = ''
    getData(url, function (data) {
      var actor = data.casts.map(function (item) {
        return item.name
      })

      html += '<img src="' +
        data.images.large +
        '"></img><h2>' +
        data.title +
        '</h2><span>' +
        '导演：' + data.directors[0].name +
        '</span><span>' +
        '年份：' + data.year +
        '</span><span>' +
        '主演：' + actor.join('/ ') +
        '</span><span>' +
        '类型：' + data.genres.join('/ ') +
        '</span><span>' +
        '制作国家/地区：' + data.countries +
        '</span><span>' +
        '豆瓣评分：' + data.rating.average + '分' +
        '</span><span>' +
        '简介：' + data.summary +
        '</span>'

      $('.movie-mes').append(html)
    })
  }
  function commentsRender () {
    var url = 'https://api.douban.com/v2/movie/subject/' + localStorage.id + '/comments?apikey=0df993c66c0c636e29ecbb5344252a4a'
    var html = ''
    getData(url, function (data) {
      data.comments.forEach(function (item) {
        html += '<li class="movie-comments-item"><img class="fl" src="' +
          item.author.avatar +
          '"><div class="fl"><span>' +
          item.author.name + ' </span><span class="comment-time"> ' + item.created_at +
          ' </span><br />' +
          item.content +
          '</div></li>'
      })
      $('.movie-comments ul').append(html)
    })
  }

  detailRender()
  commentsRender()
})()
