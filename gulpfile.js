// 1 decl var
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const rename = require("gulp-rename");
const browserSync = require('browser-sync').create();


// 2 mes taches
gulp.task('img-placement', function(){
    return gulp.src('dev/img/*')
    .pipe(gulp.dest('prod/img'));
});

gulp.task('sassification', function(){
    return gulp.src('dev/css/*.scss')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename(function (path) {
        path.basename += ".min";
    }))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('prod/css'));
});

gulp.task('htmlification', function(){
    return gulp.src('dev/*.html')
    .pipe(gulp.dest('prod'));
});

gulp.task('jsification', function(){
    return gulp.src('dev/js/*.js')
    .pipe(uglify())
    .pipe(rename(function (path) {
        path.basename += ".min";
    }))
    .pipe(gulp.dest('prod/js'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "prod/"
        }
    });
});


// 3 exec taches
gulp.task('observation', gulp.parallel('img-placement', 'browser-sync', 'sassification', 'htmlification', 'jsification', function(){
    gulp.watch('dev/img/*', gulp.series('img-placement'));
    gulp.watch('dev/css/**/*.scss', gulp.series('sassification'));
    gulp.watch('dev/*.html', gulp.series('htmlification'));
    gulp.watch('dev/js/*.js', gulp.series('jsification'));
    gulp.watch('dev/**/*').on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('observation'));