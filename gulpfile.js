/* 
* @Author: justinwebb
* @Date:   2015-05-26 15:18:17
* @Last Modified by:   justinwebb
* @Last Modified time: 2015-05-29 11:56:42
*/

'use strict';

// ---------------------------------------------------------
// Require build process dependencies
// ---------------------------------------------------------
var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var copy = require('gulp-copy');
var inject = require('gulp-inject');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var config = require('./build-config');
var browserSyncReload = browserSync.reload;

// ---------------------------------------------------------
// Setup task configurations
// ---------------------------------------------------------

var compileSassFiles = function () {
  gulp.src(config.appFiles.scss)
    .on('error', sass.logError)
    .pipe(sourcemaps.init())
    .pipe(sass({
        includePaths: [config.importPath.fontawesomeSass],
        sourcemap: true
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.styles))
    .pipe(browserSyncReload({stream: true}));
};

var cleanPreviousBuild = function (cb) {
  del([config.dist]);
  cb();
};

var copySrcFilesToDist = function (cb) {
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
  console.log('copySrcFilesToDist: ', distFiles);
  gulp.src(distFiles)
    .pipe(copy(config.dist, options));
  cb();
};

var attachSrcToIndex = function () {
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
};

var serveDistFiles = function () {
  browserSync({
    server: {
      baseDir: config.dist,
      proxy: 'http://localhost:3030'
    }
  });
};

// ---------------------------------------------------------
// Register tasks
// ---------------------------------------------------------

gulp.task('clean', cleanPreviousBuild);

gulp.task('sass', compileSassFiles);

gulp.task('copy', copySrcFilesToDist);

gulp.task('index', attachSrcToIndex);

gulp.task('serve', ['clean', 'sass', 'copy', 'index'], function () {

  serveDistFiles();
  
  gulp.watch(config.appFiles.scss, ['sass']);
  gulp.watch(config.appFiles.js).on('change', browserSyncReload);
  gulp.watch(config.appFiles.html).on('change', browserSyncReload);
});

gulp.task('default', ['serve']);
