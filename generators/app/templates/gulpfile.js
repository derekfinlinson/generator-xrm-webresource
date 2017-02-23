var gulp = require("gulp");
var del = require("del");
var webresource = require("gulp-webresource");

var config = {
    Server: process.env.crmServer,
    User: process.env.crmUser,
    Password: process.env.crmPassword,
    WebResources: [
    ]
};

gulp.task("clean",
    function () {
        return del(["dist/**/*"]);
    });

gulp.task("default", function () {
    return gulp.src("./dist/js/*.js")
        .pipe(webresource.Upload(config, true));
});