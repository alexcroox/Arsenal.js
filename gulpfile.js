'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var
    path = require('path'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    gutil = require('gulp-util'),
    jade = require('gulp-jade'),
    jadeify = require('jadeify'),
    sequence = require('run-sequence'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    stylus = require('gulp-stylus'),
    buffer = require('gulp-buffer'),
    server = require('gulp-webserver'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    plumber = require('gulp-plumber'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    paths;

paths = {

    // Source CSS files
    css: './src/css',

    // Source component files
    js: './src/js',

    // Images
    images: './src/files/images',

    // Fonts
    fonts: './src/files/fonts',

    // View templates
    templates: './src/templates',

    // Build directories
    builds: {

        development: './builds/development',
        production: './builds/production'
    }
};

gulp.task('jade', function() {

    return gulp.src(paths.templates + '/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest(paths.builds.development))
        .pipe(gulp.dest(paths.builds.production));
});

gulp.task('js-development', function() {

    var bundler = browserify({
        debug: true
    });
    bundler.add(paths.js + '/main.js');
    bundler.transform(require("jadeify"))

    return bundler.bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest(paths.builds.development + '/js'));
});

gulp.task('js-production', function() {

    var bundler = browserify();
    bundler.add(paths.js + '/main.js');
    bundler.transform(require("jadeify"))

    return bundler.bundle()
        .pipe(source('main.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(paths.builds.production + '/js'));
});

gulp.task('css', function() {

    return gulp.src([
            paths.css + '/base.styl'
        ])
        .pipe(stylus({
            'include css': true,
            paths: ['fonts']
        }))
        .pipe(autoprefixer(['last 2 versions', '> 2%']))
        .pipe(csso())
        .pipe(rename('main.css'))
        .pipe(gulp.dest(paths.builds.development + '/css'))
        .pipe(gulp.dest(paths.builds.production + '/css'));
});

gulp.task('images', function () {

    return gulp.src(paths.images + '/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(paths.builds.production + '/images'))
        .pipe(gulp.dest(paths.builds.development + '/images'));
});

gulp.task('fonts', function() {

    return gulp.src(paths.fonts + '/**/*')
        .pipe(gulp.dest(paths.builds.production + '/fonts'))
        .pipe(gulp.dest(paths.builds.development + '/fonts'));
});

/**
 * Serve
 *
 * Serve the files locally.
 */
gulp.task('serve', function() {

    var serverConfig = {
        livereload: true,
        directoryListing: true,
        host: '0.0.0.0'
    };

    return gulp.src('./').pipe(server(serverConfig));
});

gulp.task('watch', function() {

    gulp.watch(paths.templates + '**/*.jade', ['jade']);
    gulp.watch(paths.js + '**/*.js', ['js-development', 'js-production']);
    gulp.watch(paths.css + '**/*.styl', ['css']);
    gulp.watch(paths.images + '**/*.jpg', ['images']);
    gulp.watch(paths.fonts + '**/*', ['fonts']);
});

gulp.task('default', function() {

    sequence(['jade', 'js-development', 'js-production', 'css', 'images', 'fonts', 'serve', 'watch']);
});
