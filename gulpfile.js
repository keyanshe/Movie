var gulp = require('gulp')
var browserSync = require('browser-sync')
var reload = browserSync.reload
const minify = require('gulp-minify')
const cssmin = require('gulp-clean-css')
const concat = require('gulp-concat')
// 监视文件改动并重新载入
gulp.task('start', function () {
  browserSync({
    server: {
      baseDir: './'
    }
  })

  gulp.watch(['*.html', 'style/**/*.css', 'js/**/*.js'], {cwd: './'}, reload)
})

gulp.task('jsmin', function () {
  return gulp.src('./js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(minify())
    .pipe(gulp.dest('dist/js'))
})

gulp.task('cssmin', function () {
  gulp.src('./style/*.css')
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/style'))
    .pipe(cssmin())
    .pipe(gulp.dest('dist/style'))
})

gulp.task('default', function () {
  gulp.start('jsmin', 'cssmin')
})
