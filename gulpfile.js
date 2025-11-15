const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const { deleteAsync } = require('del');
const imagemin = require('gulp-imagemin');

const paths = {
    html: {
        src: 'src/index.html',
        dest: 'dist/'
    },
    styles: {
        src: 'src/scss/**/*.scss',
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

function clean() {
    return deleteAsync(['dist']);
}

function html() {
    return src(paths.html.src).pipe(dest(paths.html.dest));
}

function styles() {
    return src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
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

function server() {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });

    watch(paths.html.src, html).on('change', browserSync.reload);
    watch(paths.styles.src, styles);
    watch(paths.images.src, images).on('change', browserSync.reload);
}

const build = series(clean, parallel(html, styles, images, copyBootstrapCSS, copyBootstrapJS));

exports.clean = clean;
exports.build = build;
exports.serve = series(build, server);
exports.default = build;

