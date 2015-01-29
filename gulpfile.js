/*
创建Gulp配置文件
 */

//引入 gulp
var gulp = require('gulp');

//引入功能组件

var compass = require('gulp-compass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');

// 设置相关路径
var paths = {
    assets: './assets',
    sass: './css/sass/**/*',
    css: './css',
    js: './js/**/*', //js文件相关目录
    img: './img/**/*', //图片相关
};

gulp.task('clean', function(cb) {
    del(['build'], cb);
});

// Sass 处理
gulp.task('sass', function() {
    gulp.src(paths.sass)
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(paths.css))
        .pipe(minifycss())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('assets/css'));
});




// JS检查
gulp.task('lint', function() {
    return gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


gulp.task('scripts', ['clean'], function() {
    // Minify and copy all JavaScript (except vendor scripts)
    // with sourcemaps all the way down
    return gulp.src(paths.js)
        .pipe(sourcemaps.init()).pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/js'));
});



gulp.task('watch', function() {
    gulp.watch(paths.js, ['scripts']);
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('default', ['watch', 'scripts']);
gulp.task('watch:base', ['watch']);
