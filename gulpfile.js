/* 
* @Author: justinwebb
* @Date:   2015-05-26 15:18:17
* @Last Modified by:   justinwebb
* @Last Modified time: 2015-05-27 11:01:32
*/

'use strict';

// ---------------------------------------------------------
// Require build process dependencies
// ---------------------------------------------------------
var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var open = require('gulp-open');
var jshint = require('gulp-jshint');
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

// ---------------------------------------------------------
// Register tasks
// ---------------------------------------------------------
gulp.task('sass', compileSassFiles);


gulp.task('serve', ['sass'], function () {

  serveBuildFiles();
  
  gulp.watch(config.appFiles.scss, ['sass']);
  gulp.watch(config.appFiles.html).on('change', browserSyncReload);
});

gulp.task('default', ['serve']);
