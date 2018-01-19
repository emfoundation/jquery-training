var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './public'
        }
    });

    gulp.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync']);
