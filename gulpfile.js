const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks');

gulp.task('default', () =>
    gulp.src('app/templates/app/note_detail.html')
        .pipe(nunjucks.precompile())
        .pipe(gulp.dest('app/static/templates/'))
);
