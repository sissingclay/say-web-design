var gulp        = require('gulp'),
    connect     = require('gulp-connect'),
    sass        = require('gulp-sass'),
    watch       = require('gulp-watch'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    minifyCSS   = require('gulp-minify-css'),
    iconfont    = require('gulp-iconfont');
    iconfontCss = require('gulp-iconfont-css'),
    htmlmin     = require('gulp-html-minifier'),
    es          = require('event-stream'),
    
    filesToMove = [
        './app/assets/fonts/**/*.*',
        './app/assets/img/**/*.*'
    ];

gulp.task('move', function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(filesToMove, { base: './app/assets' })
  .pipe(gulp.dest('./app/dist'));
});
 
gulp.task('sass', function () {

    return gulp.src('scss/*.scss')
    .pipe(sass({
        precision: 10
    }))
    .pipe(gulp.dest('app/assets/css'));
});
 
gulp.task('watch', function () {
    gulp.watch('scss/**/*.scss', ['sass']);
}); 
 
gulp.task('connect', function() {
    connect.server({
        root: 'app',
        livereload: true
    });
});

gulp.task('iconFont', function() {
    
    var fontName    = 'swdIcons';
    
    gulp.src(['assets/icons/*.svg'])
        .pipe(iconfontCss({
            fontName: fontName,
            path: 'assets/css/templates/_icons.css',
            targetPath: '../css/_icons.css',
            fontPath: '../fonts/',
            className: 'ccFontIcon',
            normalize: true
        }))
        .pipe(iconfont({
            fontName: fontName,
            appendCodepoints: true // recommended option
        }))
        .pipe(gulp.dest('app/assets/fonts/'));
});

gulp.task('iconfa', function() {
    
    var fontName    = 'swdfa';
    
    gulp.src(['assets/fa/*.svg'])
        .pipe(iconfontCss({
            fontName: fontName,
            path: 'assets/css/templates/_icons_other.css',
            targetPath: '../css/_iconsfa.css',
            fontPath: '../fonts/',
            className: 'fa',
            normalize: true
        }))
        .pipe(iconfont({
            fontName: fontName,
            appendCodepoints: true // recommended option
        }))
        .pipe(gulp.dest('app/assets/fonts/'));
});

//Prod Build
gulp.task('minify', function() {
  gulp.src('./app/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./app/dist/'))
});

gulp.task('minify-css', function() {
  return gulp.src('./app/dist/css/*.css')
    .pipe(minifyCSS({keepBreaks:false}))
    .pipe(gulp.dest('prod/dist/css'))
});

gulp.task('compress', function() {
    
  return gulp.src('app/assets/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('app/dist/js/'));
});

gulp.task('cssConcat', function() {
    
    return gulp.src(['./app/assets/css/_icons.css', './app/assets/css/_iconsfa.css'])
      .pipe(concat('defer.min.css'))
      .pipe(minifyCSS())
      .pipe(gulp.dest('./app/dist/css'));
});

gulp.task('minifyCss', function() {
    
    return gulp.src(['./app/assets/css/main.css'])
      .pipe(minifyCSS('main.min.css'))
      .pipe(gulp.dest('./app/dist/css'));
});


gulp.task('prodBuild', ['cssConcat', 'minifyCss', 'compress', 'minify', 'move']);
 
gulp.task('default', ['connect']);