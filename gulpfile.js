const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const fileInclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();

// HTML
function htmlTask() {
  return src('app/*.html')
    .pipe(fileInclude())
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

// SCSS
function scssTask() {
  return src('app/scss/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

// JS
function jsTask() {
  return src('app/js/*.js')
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

// IMAGES
function imgTask() {
  return src('app/img/*')
    .pipe(imagemin())
    .pipe(dest('dist/imgs'))
    .pipe(browserSync.stream());
}

// SERVE
function serve() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
  watch('app/*.html', htmlTask);
  watch('app/scss/*.scss', scssTask);
  watch('app/js/*.js', jsTask);
  watch('app/img/*', imgTask);
}

// DEFAULT TASK
const build = parallel(htmlTask, scssTask, jsTask, imgTask);

exports.default = build;
exports.serve = series(build, serve);
