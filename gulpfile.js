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
var sourcemaps = require('gulp-sourcemaps');
var pngquant = require('imagemin-pngquant');


var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
// 图像处理
var imagemin = require('gulp-imagemin');
var spritesmith = require('gulp.spritesmith');
var imageResize = require('gulp-image-resize');


// 错误处理
var plumber = require("gulp-plumber");

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
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(paths.css))
        .pipe(minifycss())
        .pipe(sourcemaps.write({sourceRoot: '/css/sass'}))
        .pipe(rename('dev.min.css'))
        .pipe(gulp.dest('assets/css'));

    gulp.src(paths.sass)
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(paths.css))
        .pipe(minifycss())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('assets/css'));

});


// 图片精灵处理
gulp.task('sprite', function () {
  var spriteData = gulp.src('img/sprite/*.png').pipe(spritesmith({
    imgName: 'sprite@2x.png',
    cssName: '_sprite.scss',
     algorithm: 'alt-diagonal'
  })
  );
   spriteData.img.pipe(gulp.dest('./img/')); // 输出合成图片
   spriteData.css.pipe(gulp.dest('./css/sass/')); // 输出的CSS
  // spriteData.pipe(gulp.dest('path/to/output/'));
});


// gulp.task('half', function () {
//   gulp.src('./img/*.png')
//     .pipe(imageResize({
//       width : 100,
//       height : 100
//     }))
//     .pipe(gulp.dest('./img/1x/'));
// });

// JS检查
gulp.task('lint', function() {
    return gulp.src(paths.js)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


gulp.task('scripts', ['clean'], function() {
    // Minify and copy all JavaScript (except vendor scripts)
    // with sourcemaps all the way down
    return gulp.src(paths.js)
        .pipe(plumber())
        .pipe(sourcemaps.init()).pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/js'));
});


// gulp.task('scripts', ['clean'], function() {
//     // Minify and copy all JavaScript (except vendor scripts)
//     // with sourcemaps all the way down
//         gulp.src(paths.js)
//         .pipe(plumber())
//         .pipe(sourcemaps.init())
//         .pipe(jshint())
//         .pipe(jshint.reporter(stylish))
//         .pipe(uglify())
//         .pipe(concat('all.min.js'))
//         .pipe(gulp.dest('assets/js'))
//         .pipe(rename('dev.min.js'))
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest('assets/js'));


//         gulp.src(paths.js)
//         .pipe(plumber())
//         .pipe(jshint())
//         .pipe(uglify())
//         .pipe(concat('all.min.js'))
//         .pipe(gulp.dest('assets/js'))

// });




// 处理图像
gulp.task('image', function () {
    return gulp.src(paths.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('assets/images'));
});



gulp.task('watch', function() {
    gulp.watch(paths.js, ['scripts']);
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('default', ['watch', 'scripts']);
gulp.task('watch:base', ['watch']);
