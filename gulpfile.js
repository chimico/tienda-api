var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var eslint = require('gulp-eslint');

gulp.task('default', ['lint', 'nodemon-src']);

gulp.task('debug-dist', ['list', 'build', 'nodemon-dist']);

gulp.task('nodemon-dist', function() {
  return nodemon({
    exec: 'node --inspect',
    script: 'dist/api/bin/server.js',
    watch: ['src/**/**/*'],
    tasks: ['build'],
    delay: 2000,
    inspect: true,
  });
});

gulp.task('build', function() {
  return gulp.src(['src/api/**/*.js'], { base: 'src' })
    .pipe(babel())
    .pipe(gulp.dest('dist/'));
});

gulp.task('nodemon-src', function() {
  return nodemon({
    exec: 'babel-node --inspect',
    script: 'src/api/bin/server.js',
    watch: ['src/**/**/*'],
    tasks: ['lint'],
    delay: 2000,
  });
});

gulp.task('watch', function() {
  return gulp.watch(['src/**/*.js'], ['lint']);
});

gulp.task('lint', function() {
  return gulp.src(['src/api/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
