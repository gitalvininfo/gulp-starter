var gulp = require('gulp');
// var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var htmlmin = require('gulp-htmlmin');
var livereload = require('gulp-livereload');
var webserver = require('gulp-webserver');
// var header = require('gulp-header');
// var merge = require('merge-stream');
var uglify = require('gulp-uglify');

var distPath = './dist';
var src = './src'


gulp.task('html', function () {
    return gulp.src(src + '/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(distPath + '/'))
        .pipe(livereload());
});


gulp.task('css', function () {
    return gulp.src([
            './src/assets/css/bootstrap.min.css'
        ])
        .pipe(concat('bootstrap.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(distPath + '/assets/css/'))
        .pipe(livereload());
});


gulp.task('js', function () {
    return gulp.src([
            './src/assets/js/jquery.js',
            './src/assets/js/popper.js',
            './src/assets/js/bootstrap.js',
            './src/assets/js/data.js',
            './src/assets/js/app.js',
        ])
        // .pipe(uglify())
        // .pipe(concat('app.min.js'))
        .pipe(gulp.dest(distPath + '/assets/js/'))
        .pipe(livereload())
});


gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(src + '/*.html', gulp.series(gulp.parallel(['html'])));
    gulp.watch('./src/assets/js/*.js', gulp.series(gulp.parallel(['js'])));
    gulp.watch('./src/assets/css/*.css', gulp.series(gulp.parallel(['css'])));

});


gulp.task('webserver', function () {
    gulp.src(src)
        .pipe(webserver({
            host: 'localhost',
            livereload: true,
            directoryListing: false,
            open: '/',
            fallback: 'index.html'
        }));
});


gulp.task('default', gulp.series(gulp.parallel(['html', 'css', 'js', 'webserver', 'watch'])));