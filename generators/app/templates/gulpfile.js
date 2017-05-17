var gulp = require("gulp");
var webresource = require("gulp-webresource");
var cache = require('gulp-cached');
var webResources = require('./config.json').webResources;
var config = require('./creds.json');

var uploadConfig = {
    Server: config.server,
    User: config.username,
    Password: config.password,
    ClientId: config.clientId,
    ClientSecret: config.clientSecret,
    Solution: config.solution,
    WebResources: webResources
};

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
            .pipe(webresource.Upload(uploadConfig, true));
    });

gulp.task("deploy", function () {
    return gulp.src("./dist/**/*.+(css|html|js)").pipe(webresource.Upload(uploadConfig, true));
});

gulp.task('watch', function () {
    gulp.watch('./dist/**/*.(css|html|js)', ['upload']);
});

gulp.task("default", ["cache", "watch"]);