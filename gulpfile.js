var gulp = require('gulp');

gulp.task('lint', function () {
    var eslint = require('gulp-eslint');
    return gulp.src(['index.js', 'test/*.js', 'gulpfile.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('css', function () {
    var postcss = require('gulp-postcss');
    return gulp.src('src/**/*.css')
        .pipe( postcss([ require('./index.js') ]) )
        .pipe( gulp.dest('build/') );
});

gulp.task('test', function () {
    var mocha = require('gulp-mocha');
    return gulp.src('test/*.js', { read: false }).pipe(mocha());
});

gulp.task('default', ['lint', 'test', 'css']);
