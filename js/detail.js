$(function () {
  var url = 'https://api.douban.com/v2/movie/subject/' + localStorage.id
  getData(url, function (data) {
    var img = $('<img></img>')
    var div = $('<div></div>')
    var h2 = $('<h2></h2>')
    var p1 = $('<p></p>')
    var p2 = $('<p></p>')
    var p3 = $('<p></p>')
    var p4 = $('<p></p>')
    var p5 = $('<p></p>')
    var p6 = $('<p></p>')

    var actor = data.casts.map(function (item) {
      return item.name
    })

    img.attr('src', data.images.large)
    h2.append(data.title)
    p1.append('导演：' + data.directors.name)
    p2.append('年份：' + data.year)
    p3.append('主演：' + actor.join('/ '))
    p4.append('类型：' + data.genres.join('/ '))
    p5.append('制作国家/地区：' + data.countries)
    p6.append('简介：' + data.summary)
    div.addClass('clearfix')
    div.append(p1, p2, p3, p4, p5, p6)
    $('.movie-mes').append(img, div)
  })
})
