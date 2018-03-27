/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  Dependencies
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var sass = require('gulp-sass');


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  Path variables
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var paths = {
  allJs: './public/js/**/*.js',
  // allJs: './public/**/*.js',
  // allStyles: './public/styles/styles.scss',
  allStyles: './public/styles/main{.scss,.css}',
  allOtherStyles: './public/styles/*{.scss,.css}',
  indexHtml: './public/index.html'
};


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  Tasks
    Concatenate and babelize .js and .scss/.css files
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
gulp.task('js', function() {
  return gulp.src(['./public/app.js', paths.allJs])
  .pipe(concat('all.js'))
  .pipe(babel({
    // compact: false,
    presets: ['es2015']
  }))
  .pipe(gulp.dest('./public/builds/'));
});

gulp.task('sass', function() {
  return gulp.src(paths.allStyles)
  .pipe(concat('all.css'))
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./public/builds/'));
});



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  Default tasks
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
gulp.task('default', ['sass']);
// gulp.task('default', ['js','sass']);

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  Watch tasks
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
gulp.watch([paths.allStyles, paths.allOtherStyles], ['sass']);
gulp.watch(['./public/styles/trees{.scss,.css}'], ['sass']);
gulp.watch([paths.allJs, paths.indexHtml], ['js']);






// FIN
