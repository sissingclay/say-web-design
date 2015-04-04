'use strict';

var gulp = require('gulp');

gulp.task('clean', function (cb) {
    require('rimraf')('dist', cb);
});

gulp.task('lint', function () {
    var jshint = require('gulp-jshint');

    return gulp.src('app/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('sass', function () {
    var sass = require('gulp-sass');

    return gulp.src('scss/*.scss')
        .pipe(sass({
            precision: 10
        }))
        .pipe(gulp.dest('app/assets/css'));
});

gulp.task('fonts', function () {
    return gulp.src('app/styles/fonts/*')
        .pipe(gulp.dest('dist/styles/fonts'));
});

gulp.task('misc', function () {
    return gulp.src([
            'app/*.{ico,png,txt}',
            'app/.htaccess'
        ])
        .pipe(gulp.dest('dist'));
});

gulp.task('html', ['sass'], function () {
    var uglify = require('gulp-uglify'),
        minifyCss = require('gulp-minify-css'),
        useref = require('gulp-useref'),
        gulpif = require('gulp-if'),
        assets = useref.assets();

    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('scss/**/*.scss')
        .pipe(wiredep({directory: 'bower_components'}))
        .pipe(gulp.dest('app/assets/css'));

    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'bower_components'
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('connect', function () {
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var serveIndex = require('serve-index');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(serveStatic('app'))
        .use(serveIndex('app'));

    require('http').createServer(app)
        .listen(8000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

gulp.task('serve', ['sass'], function () {

    // watch for changes
    gulp.watch([
        'app/*.html',
        '.tmp/styles/**/*.css',
        'app/scripts/**/*.js',
        'app/images/**/*',
        'scss/**/*.scss'
    ]);

    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('bower.json', ['wiredep']);
});

gulp.task('build', ['lint', 'html', 'fonts', 'misc']);

/*gulp.task('iconfont', function() {
    
    var iconfont    = require('gulp-iconfont');
    var iconfontCss = require('gulp-iconfont-css');
    var fontName    = 'swdIcons';
    
    gulp.src(['assets/icons/*.svg'])
        .pipe(iconfontCss({
            fontName: fontName,
            path: 'assets/css/templates/_icons.css',
            targetPath: '../../app/assets/css/_icons.css',
            fontPath: '../fonts/',
            className: 'ccFontIcon',
            normalize: true
        }))
        .pipe(iconfont({
            fontName: fontName,
            appendCodepoints: true // recommended option
        }))

        .pipe(gulp.dest('app/assets/fonts/'));
});*/

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
