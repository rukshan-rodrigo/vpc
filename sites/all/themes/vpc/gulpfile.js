/**
 * @file
 * Gulp config. Note the theme name is used several times in this file.
 */

'use strict';

// Load plugins.
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  csscomb = require('gulp-csscomb'),
  cssmin = require('gulp-cssmin'),
  cssglob = require('gulp-sass-glob'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  clean = require('gulp-clean'),
  cache = require('gulp-cache'),
  livereload = require('gulp-livereload'),
  newer = require('gulp-newer'),
  plumber = require('gulp-plumber'),
  browserSync = require('browser-sync'),
  del = require('del'),
  mqpacker = require('css-mqpacker'),
  jscs = require("gulp-jscs"),
  postcss = require('gulp-postcss'),
  sourcemaps = require('gulp-sourcemaps'),
  sassLint = require('gulp-sass-lint'),
  nodeSassGlobbing = require('node-sass-globbing');


// Styles.
gulp.task('styles', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(cssglob({
      extensions: ['.scss']
    }))
      .pipe(plumber({
        errorHandler: function (error) {
          notify.onError({
            title: "Gulp",
            subtitle: "Failure!",
            message: "Error: <%= error.message %>",
            sound: "Beep"
          })(error);
          this.emit('end');
        }
      }))
        .pipe(sourcemaps.init())
        .pipe(sass({
          importer: nodeSassGlobbing,
          style: 'compressed',
          errLogToConsole: true
        }))
          .pipe(autoprefixer({
            browsers: [
              'last 2 versions',
              'IE >= 10',
              'safari 5',
              'opera 12.1',
              'ios 6',
              'android 4']
          }))
            .pipe(csscomb())
            .pipe(rename({suffix: '.min'}))
            .pipe(cssmin())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('build/css'))
            .pipe(browserSync.reload({stream: true}));
});

/*
 * sass-lint task.
 */
gulp.task('sass-lint', function () {
  return gulp.src([
    'source/sass/**/*.scss',
    // Exclude bootstrap.
    '!source/sass/base/*.scss'
  ])
    .pipe(sassLint({
      options: {
        formatter: 'stylish',
        'config-file': '.sass-lint-drupal.yml'
      },
      files: {ignore: 'source/sass/**/*.scss'},
      rules: {
        'no-ids': 0,
        'empty-line-between-blocks': 0,
        'property-sort-order': 0,
        'no-important': 0,
        'class-name-format': 0
      }
    }))
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError());
});

// Scripts.
gulp.task('scripts', function () {
  return gulp.src('source/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('vpc-scripts.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(notify({message: 'Scripts task complete'}));
});

// BrowserSync.
gulp.task('browser-sync', function () {
  // Watch files.
  var files = [
    './build/css/*.css',
    './build/js/*.js',
    './images/**/*'
  ];

  // Init BrowserSync.
  browserSync.init(files, {
    proxy: "beinghumancommerce.dev.dd:8083",
    notify: true
  });
});

// Default task.
gulp.task('default', function () {
  gulp.start('styles', 'scripts');
});


// Watch.
gulp.task('watch', function () {
  gulp.watch('source/sass/**/*.scss', ['styles','sass-lint']);
  gulp.watch('source/js/**/*.js', ['scripts']);
});

// Sync gulp task.
gulp.task('sync', ['styles', 'scripts', 'browser-sync'], function () {
  gulp.watch("source/sass/**/*.scss", ['sass']);
  gulp.watch("source/js/**/*.js", ['js']);
});
