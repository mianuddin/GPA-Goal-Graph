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
  return gulp.src('scss/**/*.scss') // Gets all files ending with .scss in scss
    .pipe(sass())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', function() {
    browserSync({
        server: { },
    });
});

gulp.task('watch', ['browserSync', 'sass'], function(){
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('css/**/*.css', browserSync.reload);  
    gulp.watch('*.html', browserSync.reload); 
    gulp.watch('js/**/*.js', browserSync.reload);
});

gulp.task('default', function (callback) {
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    );
});


// Build Tasks

gulp.task('images', function(){
  return gulp.src('images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(gulp.dest('dist/images'));
});

gulp.task('icons', function(){
  return gulp.src('favicon*.+(png|ico)')
  .pipe(gulp.dest('dist/'));
});

gulp.task('videos', function(){
  return gulp.src('videos/**/*.+(mp4|webm)')
  .pipe(gulp.dest('dist/videos'));
});

gulp.task('font', function(){
  return gulp.src('font/**/*.(eot|ttf|woff|woff2)')
  .pipe(gulp.dest('dist/font'));
});

gulp.task('useref', function(){
    var assets = useref.assets();

    return gulp.src('*.html')
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
        ['sass', 'useref', 'images', 'icons', 'videos', 'font'],
        callback
    );
});
