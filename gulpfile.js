var ENV             = process.env.NODE_ENV || 'DEV',
    gulp            = require('gulp'),
    connect         = require('gulp-connect'),
    sass            = require('gulp-sass'),
    watch           = require('gulp-watch'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    minifyCSS       = require('gulp-minify-css'),
    iconfont        = require('gulp-iconfont');
    iconfontCss     = require('gulp-iconfont-css'),
    htmlmin         = require('gulp-html-minifier'),
    es              = require('event-stream'),
    nunjucksRender  = require('gulp-nunjucks-render'),
    shell           = require('gulp-shell'),
    preprocess      = require('gulp-preprocess'),
    
    filesToMove = [
        './src/img/**/*.*',
        './src/.htaccess',
        './src/humans.txt',
        './src/process.php',
        './src/svg/**/*.svg',
        './src/swd.png'
    ];

if (ENV === 'DEV') {
    require('dotenv').load();
}

gulp.task('nunjucks', function () {
    return gulp.src('./src/templates/*.html')
        .pipe(nunjucksRender({
            data: {
                base_url: process.env['URL_' + ENV]
            },
            path: ['./src/templates/'] // String or Array
        }))
        .pipe(shell([
            './node_modules/nunjucks/bin/precompile ./src/templates/main > ./app/js/index.js'
        ]))
        .pipe(gulp.dest('./app'));
});

gulp.task('move', function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(filesToMove, { base: './src/' })
      .pipe(preprocess({context: { HOSTNAME: process.env['HOSTNAME_' + ENV]}}))
      .pipe(gulp.dest('./app/'));
});

gulp.task('moveFonts', function(){
    // the base option sets the relative root for the set of files,
    // preserving the folder structure
    gulp.src('./src/icons/generated_font/font/**.*', { base: './src/icons/generated_font/font/' })
        .pipe(gulp.dest('./app/fonts'));
});

gulp.task('moveFontsCss', function(){
    // the base option sets the relative root for the set of files,
    // preserving the folder structure
    gulp.src('./src/icons/generated_font/css/**.*', { base: './src/icons/generated_font/css/' })
        .pipe(gulp.dest('./app/css'));
});
 
gulp.task('sass', function () {

    return gulp.src('src/scss/*.scss')
    .pipe(sass({
        precision: 10
    }))
    .pipe(gulp.dest('./app/css'));
});
 
gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['javascript']);
    gulp.watch('src/img/**/*.*', ['move']);
    gulp.watch('src/templates/**/*.*', ['nunjucks']);
});

gulp.task('javascript', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(shell([
            'webpack --progress --colors --debug -p'
        ]))
});

gulp.task('connect', function() {
    connect.server({
        root: 'app',
        livereload: true
    });
});

gulp.task('iconfa', function() {
    
    var fontName    = 'swdfa';
    
    gulp.src(['src/icons/fa/*.svg'])
        .pipe(iconfontCss({
            fontName: fontName,
            path: 'src/icons/css/templates/_icons_other.css',
            targetPath: '../css/_iconsfa.css',
            fontPath: '../fonts/',
            className: 'fa',
            normalize: true
        }))
        .pipe(iconfont({
            fontName: fontName,
            appendCodepoints: true // recommended option
        }))
        .pipe(gulp.dest('./app/fonts/'));
});

//Prod Build
gulp.task('minify', function() {
  gulp.src('./app/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./app/'))
});

gulp.task('compress', function() {
    
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('app/js/'));
});

gulp.task('cssConcat', function() {
    
    return gulp.src(['./app/css/style.css', './app/css/_iconsfa.css'])
      .pipe(concat('defer.min.v2.css'))
      .pipe(minifyCSS())
      .pipe(gulp.dest('./app/css'));
});

gulp.task('minifyCss', function() {
    
    return gulp.src(['./app/css/main.v2.css'])
      .pipe(minifyCSS())
      .pipe(gulp.dest('./app/css/'));
});


gulp.task('prodBuild', ['cssConcat', 'minifyCss', 'compress', 'minify']);
 
gulp.task('default', ['connect', 'sass', 'iconfa', 'moveFonts', 'moveFontsCss', 'move', 'cssConcat', 'nunjucks', 'watch']);