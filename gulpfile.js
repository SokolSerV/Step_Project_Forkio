import gulp from "gulp";
const { src, dest, watch, series, parallel } = gulp;
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import groupMedia from "gulp-group-css-media-queries";
import browserSync from "browser-sync";
const bsServer = browserSync.create();
import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
import clean from "gulp-clean";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import rename from "gulp-rename";
import imagemin from "gulp-imagemin";
import fileInclude from "gulp-file-include";

function cleanDist() {
  return src("./dist/*", { read: false }).pipe(clean());
}

function serve() {
  bsServer.init({
    server: {
      baseDir: "./",
    },
  });
}

function html() {
  return src("./src/*.html")
    .pipe(fileInclude())
    .pipe(dest("./"))
    .pipe(bsServer.reload({ stream: true }));
}

function styles() {
  return src("./src/scss/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
        cascade: true,
      })
    )
    .pipe(groupMedia())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(dest("./dist/css/"))
    .pipe(bsServer.reload({ stream: true }));
}

function scripts() {
  return src("./src/js/**/*.js")
    .pipe(concat("script.min.js"))
    .pipe(uglify())
    .pipe(dest("./dist/js/"))
    .pipe(bsServer.reload({ stream: true }));
}

function images() {
  return src("./src/img/**/*.{jpg,jpeg,png,svg,webp,gif}")
    .pipe(imagemin())
    .pipe(dest("./dist/img"))
    .pipe(bsServer.reload({ stream: true }));
}

function watcher() {
  watch("./src/scss/**/*.scss", styles);
  watch("./src/**/*.html").on("change", html);
  watch("./src/js/*.js", scripts);
  watch("./src/img/**/*.{jpg,jpeg,png,svg,webp,gif}").on("change", images);
}

export const build = series(cleanDist, parallel(html, styles, scripts, images));
export const dev = series(build, parallel(serve, watcher));
