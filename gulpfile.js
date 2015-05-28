/* 
* @Author: justinwebb
* @Date:   2015-05-26 15:18:17
* @Last Modified by:   justinwebb
* @Last Modified time: 2015-05-27 17:39:19
*/

'use strict';

// ---------------------------------------------------------
// Require build process dependencies
// ---------------------------------------------------------
var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var copy = require('gulp-copy');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var config = require('./build-config');
var browserSyncReload = browserSync.reload;

// ---------------------------------------------------------
// Setup task configurations
// ---------------------------------------------------------
var serveBuildFiles = function () {
  browserSync({
    server: {
      baseDir: config.client
    }
  });
};

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

var cleanPreviousBuild = function () {
  return gulp.src(config.build)
    .pipe(clean());
};

var copySrcFilesToBuild = function () {
  var options = {prefix: 0};
  var buildFiles = [];

  buildFiles = config.vendorFiles.js.concat(config.appFiles.js, config.data);
  console.log('copySrcFilesToBuild: ', buildFiles);
  return gulp.src(buildFiles)
    .pipe(copy(config.build, options));
};

// ---------------------------------------------------------
// Register tasks
// ---------------------------------------------------------
gulp.task('clean', cleanPreviousBuild);

gulp.task('copy', copySrcFilesToBuild);

gulp.task('sass', compileSassFiles);

gulp.task('serve', ['sass'], function () {

  serveBuildFiles();
  
  gulp.watch(config.appFiles.scss, ['sass']);
  gulp.watch(config.appFiles.html).on('change', browserSyncReload);
});

gulp.task('default', ['serve']);
