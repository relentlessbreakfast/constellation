/* 
* @Author: justinwebb
* @Date:   2015-05-26 15:18:17
* @Last Modified by:   justinwebb
<<<<<<< HEAD
* @Last Modified time: 2015-05-29 22:39:16
=======
* @Last Modified time: 2015-05-28 22:08:26
>>>>>>> 2152024e99a53cb616c7483aa0bd6289bcfcc43a
*/

'use strict';

// ---------------------------------------------------------
// Require build process dependencies
// ---------------------------------------------------------
var gulp = require('gulp');
var gUtil = require('gulp-util');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
<<<<<<< HEAD
var del = require('del');
var copy = require('gulp-copy');
var eventStream = require('event-stream');
var streamSeries = require('stream-series');
var changed = require('gulp-changed');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
=======
var clean = require('gulp-clean');
var copy = require('gulp-copy');
var inject = require('gulp-inject');
>>>>>>> 2152024e99a53cb616c7483aa0bd6289bcfcc43a
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var config = require('./build-config');
var browserSyncReload = browserSync.reload;

// ---------------------------------------------------------
// Setup task configurations
// ---------------------------------------------------------

var cleanPreviousBuild = function (cb) {
  del([config.dist]);
  cb();
};

var compileSassFiles = function (cb) {
  gulp.src(config.appFiles.scss)
    .on('error', sass.logError)
    .pipe(sourcemaps.init())
    .pipe(sass({
        includePaths: [config.importPath.fontawesomeSass],
        sourcemap: true
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.assets +'/styles'))
    .pipe(browserSyncReload({stream: true}));

  cb();
};

var transformSourceToDistFiles = function (cb) {
  var startTag = {starttag: '<!-- inject:head:{{ext}} -->'};
  var cssOptions = {
    addRootSlash: false,
    ignorePath: ['dist', 'client']
  };
  var jsOptions = {
    addRootSlash: false,
    ignorePath: ['dist', 'client']
  };

  // Concatenate vendor scripts 
  var vendorStream = gulp.src(config.vendorFiles.js)
    .pipe(concat('src/vendor.js'))
    .pipe(gulp.dest(config.dist));
   
  // Concatenate AND minify app sources 
  var appStream = gulp.src(config.appFiles.js)
    .pipe(concat('src/constellation-app.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.dist));

  // Inject CSS and JS into index.html
  gulp.src(config.client +'/index.html')
    .pipe(inject(gulp.src(config.assets +'/styles/main.css', {read: false}), cssOptions), startTag)
    .pipe(inject(streamSeries(vendorStream, appStream), jsOptions))
    .pipe(gulp.dest(config.dist));

  cb();
};

var attachSrcToIndex = function (cb) {
  var options = {
    addRootSlash: false
    //ignorePath: 'client'
  };
  var startTag = {starttag: '<!-- inject:head:{{ext}} -->'};
  var jsFiles = config.vendorFiles.js.concat(config.appFiles.js);
  var cssFiles = [config.styles +'/main.css'];

  gulp.src(config.client +'/index.html')
    .pipe(inject(gulp.src(cssFiles, {read: false}), options), startTag)
    .pipe(inject(gulp.src(jsFiles, {read: false}), options))
    .pipe(gulp.dest(config.dist));

  cb();
};

var runNodemon = function (cb) {
  var isActive = false;
  return nodemon({
    script: config.server +'/server.js',
    watch: [config.server +'/**/*.js']
  })
    .on('start', function onStart() {
      gUtil.log('runNodemon:\tstarting up...');
      if (!isActive) {
        isActive = true;
        cb();
      }
    })
    .on('restart', function onRestart() {
      setTimeout(function reload() {
        browserSyncReload({stream: false});
      }, 500);
    });
};

var cleanPreviousBuild = function () {
  return gulp.src(config.dist)
    .pipe(clean());
};

var copySrcFilesToBuild = function () {
  var options = {prefix: 0};
  var distFiles = [];

  // load all JavaScript related files in the order they 
  // should load inside index.html (e.g. vendor files appear
  // before files from 'client/src')
  distFiles = config.vendorFiles.js.concat(
    config.appFiles.js,
    config.data,
    config.styles + '/main.css'
  );

  // Load CSS files
  // TODO: add CSS to distFiles
  console.log('copySrcFilesToBuild: ', distFiles);
  return gulp.src(distFiles)
    .pipe(copy(config.dist, options));
};

var attachSrcToIndex = function () {
  var options = {addRootSlash: false};
  var startTag = {starttag: '<!-- inject:head:{{ext}} -->'};
  var jsFiles = config.vendorFiles.js.concat(config.appFiles.js);
  var cssFiles = [config.styles +'/main.css'];

  gulp.src(config.client +'/index.html')
    .pipe(inject(gulp.src(cssFiles, {read: false}), options), startTag)
    .pipe(inject(gulp.src(jsFiles, {read: false}), options))
    .pipe(gulp.dest(config.dist));
};

// ---------------------------------------------------------
// Register tasks
// ---------------------------------------------------------
gulp.task('clean', cleanPreviousBuild);

gulp.task('sass', compileSassFiles);

gulp.task('dist', transformSourceToDistFiles);

gulp.task('build', ['clean', 'sass', 'dist']);

gulp.task('nodemon', runNodemon);

gulp.task('watch-js', ['dist'], browserSyncReload);

gulp.task('watch-html', ['dist'], function () {
  setTimeout(browserSyncReload, 500);
});

gulp.task('serve', ['build', 'nodemon'], function () {
  
  var port = process.env.PORT || 3999;

  browserSync.init({
    server: {
      baseDir: config.dist,
      proxy: 'http://localhost:'+ port,
    }
  });

  gulp.watch(config.appFiles.scss, ['sass']);
  gulp.watch(config.appFiles.js, ['watch-js']);
  gulp.watch(config.appFiles.html, ['watch-html']);
});

gulp.task('default', ['serve']);
