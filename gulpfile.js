const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const glob = require('glob');
const es = require('event-stream');

const config = {
  src: './src/',
  dist: './dist/'
};

const paths = {
  html: './*.html',
  js: 'js/*.js',
  scss: 'scss/main.scss',
  jquery: 'js/vendor/*.js',
  img: 'img/*.+(png|jpg|gif|svg|ico)',
  assets: 'assets/*.*'
};

gulp.task('html', () => {
  gulp.src(config.src + paths.html)
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(config.dist))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('js', (done) => {
  glob(config.src + paths.js, function(err, files) {
    if (err) done(err);

    var tasks = files.map(function(entry) {
      return browserify({
          entries: [entry]
        })
        .transform(babelify)
        .bundle()
        .pipe(source(entry.replace('./src/js/', '')))
        .pipe(rename({
          extname: '.b2b.js'
        }))
        .pipe(gulp.dest(config.dist + 'files'));
    });
    es.merge(tasks).on('end', done);
  })
});

gulp.task('sass', () => {
  return gulp.src(config.src + paths.scss)
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('Error', sass.logError))
    .pipe(rename('new-b2b-main.css'))
    .pipe(gulp.dest(config.dist + 'files'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('img', () => {
  gulp.src(config.src + paths.img)
    .pipe(gulp.dest(config.dist + 'img'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('assets', () => {
  gulp.src(config.src + paths.assets)
    .pipe(gulp.dest(config.dist + 'files'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('default', ['html', 'js', 'sass', 'img', 'assets']);

//asegurarse de que este corriendo en el servidor
gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: config.dist
    }
  });

  gulp.watch(config.src + paths.html, ['html']);
  gulp.watch(config.src + paths.js, ['js']);
  //gulp.watch(config.src + paths.scss, ['sass']);
  gulp.watch(config.src + './scss/**/*.scss', ['sass']);

});