var gulp = require("gulp");
var del = require("del");
var webresource = require("gulp-webresource");
var cache = require('gulp-cached');
var config = require('config');

gulp.task("clean", function () {
    return del(["dist/**/*"]);
});

gulp.task("static", function () {
    gulp.src("./src/html/*.html")
        .pipe(gulp.dest("dist/html"));

    return gulp.src("./src/css/*.css")
        .pipe(gulp.dest("dist/css"));
});

gulp.task("cache", ["static"], function () {
    return gulp.src("./dist/**/*.+(css|html|js)")
        .pipe(cache('upload'));
});

gulp.task("upload",
    function () {
        return gulp.src("./dist/**/*.+(css|html|js)")
            .pipe(cache('upload'))
            .pipe(webresource.Upload(config().upload, true));
    });

gulp.task('watch', function () {
    gulp.watch('./**/*.js', ['upload']);
});

gulp.task("default", ["cache", "watch"]);