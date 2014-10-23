'use strict';

var browserify = require('browserify');
var concat = require('gulp-concat');
var gulp = require('gulp');
var jade = require('gulp-jade');
var vinyl = require('vinyl-source-stream');

gulp.task('default', ['css', 'js', 'html', 'watch']);

gulp.task('css', function () {
    gulp.src('./src/css/*.css')
        .pipe(concat('common.css'))
        .pipe(gulp.dest('./test'));
});

gulp.task('html', function () {
    gulp.src('./src/index.jade')
        .pipe(jade())
        .pipe(gulp.dest('./test'));
});

gulp.task('js', function () {
    var stream = browserify('./src/js/index.js').bundle();

    stream
        .pipe(vinyl('index.js'))
        .pipe(gulp.dest('./test'));
});

gulp.task('watch', function () {
    gulp.watch('./src/index.jade', ['html']);
    gulp.watch('./src/css/*.css', ['css']);
    gulp.watch('./src/js/*.js', ['js']);
});