'use strict';

var browserify = require('browserify');
var concat = require('gulp-concat');
var glob = require('glob');
var gulp = require('gulp');
var jade = require('gulp-jade');
var source = require('vinyl-source-stream');

gulp.task('default', ['css', 'js', 'html', 'watch']);

gulp.task('css', function () {
    gulp.src('./src/blocks/*/*.css')
        .pipe(concat('common.css'))
        .pipe(gulp.dest('./test'));
});

gulp.task('html', function () {
    gulp.src('./src/index.jade')
        .pipe(jade())
        .pipe(gulp.dest('./test'));
});

gulp.task('js', function () {
    var files = glob.sync('./src/blocks/*/*.js', {});
    var stream = browserify(files, {paths: ['./src']}).bundle();

    stream
        .pipe(source('index.js'))
        .pipe(gulp.dest('./test'));
});

gulp.task('watch', function () {
    gulp.watch('./src/index.jade', ['html']);
    gulp.watch('./src/blocks/**/*.css', ['css']);
    gulp.watch('./src/blocks/**/*.js', ['js']);
});
