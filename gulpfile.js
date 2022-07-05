var gulp = require('gulp');
// var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var webserver = require('gulp-webserver');
// var header = require('gulp-header');
// var merge = require('merge-stream');
var uglify = require('gulp-uglify');

var distPath = './template';


gulp.task('html', function () {
    return gulp.src(distPath + '/*.html')
        .pipe(livereload());
});


gulp.task('css', function () {
    return gulp.src([
            './src/assets/css/bootstrap.css'
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
            './src/assets/js/app.js',
        ])
        .pipe(uglify())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(distPath + '/assets/js/'))
        .pipe(livereload())
});


gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(distPath + '/*.html', gulp.series(gulp.parallel(['html'])));
    gulp.watch('./src/assets/js/*.js', gulp.series(gulp.parallel(['js'])));
    gulp.watch('./src/assets/css/*.css', gulp.series(gulp.parallel(['css'])));

});


gulp.task('webserver', function () {
    gulp.src(distPath)
        .pipe(webserver({
            host: 'localhost',
            livereload: true,
            directoryListing: false,
            open: '/template/',
            fallback: 'index.html'
        }));
});


gulp.task('default', gulp.series(gulp.parallel(['css', 'js', 'webserver', 'watch'])));