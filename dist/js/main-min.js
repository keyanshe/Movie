function detailRender(){var e="";getData("https://api.douban.com/v2/movie/subject/"+localStorage.id,function(t){var a=t.casts.map(function(e){return e.name});e+='<img src="'+t.images.large+'"></img>',e+="<h2>"+t.title+"</h2>",e+="<span>导演："+t.directors[0].name+"</span>",e+="<span>年份："+t.year+"</span>",e+="<span>主演："+a.join("/ ")+"</span>",e+="<span>类型："+t.genres.join("/ ")+"</span>",e+="<span>制作国家/地区："+t.countries+"</span>",e+="<span>豆瓣评分："+t.rating.average+"分</span>",e+="<span>简介："+t.summary+"</span>",$(".movie-mes").append(e)})}function commentsRender(){var e="";getData("https://api.douban.com/v2/movie/subject/"+localStorage.id+"/comments?apikey=0df993c66c0c636e29ecbb5344252a4a",function(t){t.comments.forEach(function(t){e+='<li class="movie-comments-item">',e+='<img class="fl" src="'+t.author.avatar+'">',e+='<div class="fl">',e+="<span>"+t.author.name+" </span>",e+='<span class="comment-time"> '+t.created_at+" </span>",e+="<br />"+t.content,e+="</div>",e+="</li>"}),$(".movie-comments ul").append(e)})}function hotMovieRender(){var e=$(".hot-movie-list");getData("https://api.douban.com/v2/movie/nowplaying?apikey=0df993c66c0c636e29ecbb5344252a4a",function(t){for(var a=t.entries,i="",n=0;n<12;n++)i+='<li data-id="'+a[n].id+'">',i+='<img src="'+a[n].images.large+'" />',i+='<div class="hot-movie-mes">',i+="<h3>"+a[n].title+"</h3>",i+="<p>评分："+a[n].rating+"</p>",i+="</div>",i+="</li>";e.append(i)})}function futureMovieRender(){var e=$(".future-movie ul"),t="";getData("https://api.douban.com/v2/movie/coming?apikey=0df993c66c0c636e29ecbb5344252a4a",function(a){for(var i=a.entries,n=0;n<6;n++)t+="<li>",t+="<div>",t+='<img src="'+i[n].images.large+'" data-id="'+i[n].id+'" />',t+="<h3>"+i[n].title+"</h3>",t+="</div>",t+="</li>";e.append(t)})}function mRankRender(){var e=$(".movie-rank ul"),t="";getData("https://api.douban.com/v2/movie/weekly?apikey=0df993c66c0c636e29ecbb5344252a4a",function(a){a.subjects.forEach(function(e){var a=e.rank+". "+e.subject.title;t+='<li data-id="'+e.subject.id+'">',t+=a,t+="</li>"}),e.append(t)})}function jumpToDetail(e){localStorage.id=e.getAttribute("data-id"),location.href="./detail.html"}function getData(e,t){$.ajax({type:"GET",url:e,dataType:"jsonp",success:function(e){t(e)}})}function listRender(e,t){var a="";e.forEach(function(e){var t=(e=e.subject||e).casts.map(function(e){return e.name}),i=e.genres.map(function(e){return e});a+='<li class="rank-list-item clearfix" data-id="'+e.id+'">',a+='<img src="'+e.images.small+'" class="fl">',a+="<h3>"+e.title+"</h3>",a+="<p>演员："+t.join("/ ")+"</p>",a+="<p>评分："+e.rating.average+"</p>",a+="<p>年份："+e.year+"</p>",a+="<p>类型："+i.join("/ ")+"</p>",a+="</li>"}),t.append(a)}function searchRender(){var e="https://api.douban.com/v2/movie/search?q="+localStorage.searchStr;$(".main h2").text(localStorage.title),document.title=localStorage.title,getData(e,function(e){listRender(e.subjects,$("#movie-list"))})}function newMovieRender(){$(".main h2").text(localStorage.title),document.title=localStorage.title,getData("https://api.douban.com/v2/movie/new_movies?apikey=0df993c66c0c636e29ecbb5344252a4a",function(e){listRender(e.subjects,$("#movie-list"))})}function topMovieRender(){$(".main h2").text(localStorage.title),document.title=localStorage.title,getData("https://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a",function(e){listRender(e.subjects,$("#movie-list"))})}function usBoxRender(){$(".main h2").text(localStorage.title),document.title=localStorage.title,getData("https://api.douban.com/v2/movie/us_box?apikey=0df993c66c0c636e29ecbb5344252a4a",function(e){listRender(e.subjects,$("#movie-list"))})}function weeklyMovieRender(){$(".main h2").text(localStorage.title),document.title=localStorage.title,getData("https://api.douban.com/v2/movie/weekly?apikey=0df993c66c0c636e29ecbb5344252a4a",function(e){listRender(e.subjects,$("#movie-list"))})}function Render(){switch(localStorage.title){case"搜索结果":searchRender();break;case"新片榜":newMovieRender();break;case"口碑榜":weeklyMovieRender();break;case"北美票房榜":usBoxRender();break;case"Top250":topMovieRender()}}detailRender(),commentsRender(),$(".hot-movie-list").on("click",function(e){for(var t=e.target;"LI"!==t.nodeName;)t=t.parentNode;jumpToDetail(t)}),$("#fmovie ul").on("click",function(e){"IMG"===e.target.nodeName&&jumpToDetail(e.target)}),$(".movie-rank ul").on("click",function(e){jumpToDetail(e.target)}),mRankRender(),hotMovieRender(),futureMovieRender(),$(function(){$(".search button").on("click",function(e){!function(e,t){""===e.trim()?alert("请输入"):(localStorage.searchStr=e,localStorage.title=t,location.href="./movieList.html")}($(".search input").val(),"搜索结果"),e.preventDefault()}),$("#rank").on("click",function(e){localStorage.title=e.target.innerText,location.href="./movieList.html"})}),$("#movie-list").on("click",function(e){for(var t,a=e.target;"LI"!==a.nodeName;)a=a.parentNode;t=a.getAttribute("data-id"),localStorage.id=t,location.href="./detail.html"}),Render();