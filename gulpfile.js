var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var babelify = require('babelify');
var browserSync = require('browser-sync').create();

gulp.task('js:dev', function () {
    return browserify({
        entries: ['src/main.js'],
        debug: true
    })
    .transform('babelify', { presets: ['env']})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream())
})

gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: './public'
        }
    });

    gulp.watch('public/**/*.html').on('change', browserSync.reload);
    gulp.watch('src/**/*.js', ['js:dev']);
});

gulp.task('default', ['watch']);
