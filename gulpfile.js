var del = require('del');
var gulp = require('gulp');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var mkdirp = require('mkdirp');

var buildSource = './build';

mkdirp.sync(buildSource);

gulp.task('build:clean', function () {
    return del.sync(buildSource);
});

gulp.task('build:scripts', function () {
    return gulp.src('./src/index.js')
        .pipe(babel({'presets': ['es2015']}))
        .pipe(rename('circle-progress-bar.js'))
        .pipe(gulp.dest(buildSource));
});

gulp.task('build', function () {
    gulp.start('build:clean');
    gulp.start('build:scripts');
});

gulp.task('watch', ['build'], function () {
    gulp.watch(['./src/*.js'], ['build:scripts']);
});
