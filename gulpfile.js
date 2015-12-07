var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var del = require('del');
var runSequence = require('run-sequence');



// Watch Tasks

gulp.task('sass', function() {
  return gulp.src('site/scss/**/*.scss') // Gets all files ending with .scss in site/scss
    .pipe(sass())
    .pipe(gulp.dest('site/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', function() {
    browserSync({
        server: {
        },
    });
});

gulp.task('watch', ['browserSync', 'sass'], function(){
    gulp.watch('site/scss/**/*.scss', ['sass']);
    gulp.watch('site/css/**/*.css', browserSync.reload);  
    gulp.watch('site/*.html', browserSync.reload); 
    // gulp.watch('site/js/**/*.js', browserSync.reload);
});

gulp.task('default', function (callback) {
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    );
});


// Build Tasks

gulp.task('images', function(){
  return gulp.src('site/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(gulp.dest('dist/images'));
});

gulp.task('icons', function(){
  return gulp.src('site/favicon*.+(png|ico)')
  .pipe(gulp.dest('dist/'));
});

gulp.task('videos', function(){
  return gulp.src('site/videos/**/*.+(mp4|webm)')
  .pipe(gulp.dest('dist/videos'));
});

gulp.task('useref', function(){
    var assets = useref.assets();

    return gulp.src('site/*.html')
    .pipe(assets)
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', minifyCSS()))
    // Uglifies only if it's a Javascript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean:dist', function(callback){
  del(['dist/**/*', '!dist/images', '!dist/images/**/*'], callback);
});

gulp.task('clean', function() {
    del('dist');
});

gulp.task('build', function (callback) {
    runSequence('clean', 
        ['sass', 'useref', 'images', 'icons', 'videos'],
        callback
    );
});