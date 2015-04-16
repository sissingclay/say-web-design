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
    es          = require('event-stream');
 
gulp.task('minify', function() {
  gulp.src('./app/html/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./app/'))
});
 
gulp.task('minify-css', function() {
  return gulp.src('./app/assets/css/*.css')
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest('app/assets/css'))
});
 
gulp.task('compress', function() {
    
  return gulp.src('app/assets/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('app/dist/js/'));
});
 
gulp.task('sass', function () {

    return gulp.src('scss/*.scss')
    .pipe(sass({
        precision: 10
    }))
    .pipe(gulp.dest('app/assets/css'));
});

gulp.task('jsConcat', function() {
    var vendorFiles = gulp.src('/app/components/owl2/dist/*.min.js'),
        appFiles    = gulp.src('app/assets/js/*.js');
    
  return es.concat(vendorFiles, appFiles)
        concat('all.js')
        .pipe(gulp.dest('./app/assets/js'));
});

gulp.task('cssConcat', function() {
    var vendorFiles = gulp.src('/app/components/owl2/dist/owl.carousel.min.css'),
        appFiles    = gulp.src('app/assets/css/*.css');
    
    return es.concat(vendorFiles, appFiles)
      .pipe(concat('all.css'))
      .pipe(gulp.dest('./app/assets/css'));
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

gulp.task('iconfont', function() {
    
    var fontName    = 'swdIcons_other';
    
    gulp.src(['assets/other/*.svg'])
        .pipe(iconfontCss({
            fontName: fontName,
            path: 'assets/css/templates/_icons_1.css',
            targetPath: '../css/_icons_other.css',
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

gulp.task('iconFontCustom', function() {
    
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

gulp.task('prodBuild', ['minify-css', 'cssConcat', 'compress', 'minify']);
 
gulp.task('default', ['connect']);