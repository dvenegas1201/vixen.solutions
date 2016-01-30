/**
 * Load NPM dependencies
 */
var gulp = require('gulp');
var gutil = require("gulp-util");
var babelify = require('babelify');
var sass = require('gulp-ruby-sass');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sourcemaps = require("gulp-sourcemaps");
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

/**
 * Enviroment variables
 */
var env = {};

/**
 * Live task : HTTP server  + Sass + Javascript + HTML templates
 */

gulp.task('live', function () {
    var envFile = 'development-env';
    env = require('./config/' +  envFile);
    gulp.start('server');
});

/**
 * Static server
 */
gulp.task('server', ['js', 'sass', 'img'], function() {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(env.watchJavascriptDir, ['js'], reload);
    gulp.watch(env.watchSassDir, ['sass'], reload);
    gulp.watch(env.buildTemplatesDir).on("change", reload);
});

/**
 * Static views
 */
gulp.task('img', function () {
    return gulp.src(env.srcImagesDir)
        .pipe(gulp.dest(env.buildImagesDir))
        .pipe(browserSync.stream({once: true}));
});

/**
 * Js files
 */
gulp.task('js', function () {
    return browserify({
            entries: env.srcJavascriptInit,
            debug: true
        })
        .transform(babelify)
        .bundle()
        .on('error', function (err) {
            gutil.log( gutil.colors.red('ERROR', 'Compiling JS Error'));
            gutil.log( gutil.colors.red(err.message));
            gutil.beep();
            browserSync.notify("<span style='color: red;'>Compiling JS Error</>");
            this.emit('end');
        })
        .pipe(source(env.buildJavascriptFile ))
        .pipe(gulp.dest(env.buildJavascriptDir))
        .pipe(browserSync.stream({once: true}));
});

/**
 * Sass
 */
gulp.task('sass', function () {
    return sass(env.srcSassInit, env.configSass)
        .pipe(sourcemaps.write())
        .on('error', function () {
            gutil.log( gutil.colors.red('ERROR', 'Compiling Sass Error'));
            gutil.log( gutil.colors.red(err.message));
            gutil.beep();
            browserSync.notify("<span style='color: red;'>Compiling Sass Error</>");
            this.emit('end');
        })
        .pipe(gulp.dest(env.buildSassDir))
        .pipe(browserSync.stream({once: true}));
});
