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
    return src('app/html/*.html')
    .pipe(fileInclude())
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

function scssTask() {
  return src('app/scss/main.scss', { sourcemaps: true }) 
    .pipe(sass())
    .pipe(cssnano())
    .pipe(rename('index.min.css')) 
    .pipe(dest('dist/css', { sourcemaps: '.' }))
    .pipe(browserSync.stream());
}

// JS
function jsTask() {
  return src('app/js/*.js', { sourcemaps: true })
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(dest('dist/js', { sourcemaps: '.' }))
    .pipe(browserSync.stream());
}

// IMAGES
function imgTask() {
  return src('app/img/**/*', { encoding: false })
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
  watch('app/html/**/*.html', htmlTask);
  watch('app/scss/**/*.scss', scssTask);
  watch('app/js/*.js', jsTask);
  watch('app/img/*', imgTask);
}

// DEFAULT TASK
const build = parallel(htmlTask, scssTask, jsTask, imgTask);

exports.default = build;
exports.serve = series(build, serve);
exports.default = build;
