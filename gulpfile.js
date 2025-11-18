const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const { deleteAsync } = require('del');
const imagemin = require('gulp-imagemin');

// --------------------------------
// PATHS
// --------------------------------
const paths = {
    html: {
        src: 'src/index.html',
        dest: 'dist/'
    },
    styles: {
        src: 'src/scss/**/*.scss',    // слідкуємо за всіма файлами SCSS
        main: 'src/scss/main.scss',   // компілюємо тільки main.scss
        dest: 'dist/css/'
    },
    images: {
        src: 'src/img/**/*',
        dest: 'dist/img/'
    },
    bootstrap: {
        css: {
            src: 'node_modules/bootstrap/dist/css/bootstrap.min.css',
            dest: 'dist/css/'
        },
        js: {
            src: 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
            dest: 'dist/js/'
        }
    }
};

// --------------------------------
// TASKS
// --------------------------------
function clean() {
    return deleteAsync(['dist']);
}

function html() {
    return src(paths.html.src).pipe(dest(paths.html.dest));
}

function styles() {
    return src(paths.styles.main)    // компілюємо тільки main.scss
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename('index.min.css'))
        .pipe(dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

function images() {
    return src(paths.images.src, { encoding: false })
        .pipe(imagemin())
        .pipe(dest(paths.images.dest))
        .pipe(browserSync.stream());
}

function copyBootstrapCSS() {
    return src(paths.bootstrap.css.src).pipe(dest(paths.bootstrap.css.dest));
}

function copyBootstrapJS() {
    return src(paths.bootstrap.js.src).pipe(dest(paths.bootstrap.js.dest));
}

// --------------------------------
// SERVER + WATCH
// --------------------------------
function server() {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });

    watch(paths.styles.src, styles);          // слідкуємо за всіма scss
    watch(paths.html.src, html).on('change', browserSync.reload);
    watch(paths.images.src, images).on('change', browserSync.reload);
}

// --------------------------------
// EXPORTS
// --------------------------------
const build = series(clean, parallel(html, styles, images, copyBootstrapCSS, copyBootstrapJS));

exports.clean = clean;
exports.build = build;
exports.serve = series(build, server);
exports.default = build;
