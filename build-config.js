module.exports  = {
  build   : 'build',
  server  : 'server',
  app     : 'client/app',
  data    : 'client/assets/data',
  images  : 'client/assets/images',
  fonts   : 'client/assets/fonts',
  styles  : 'client/assets/styles',
  app_files: {

    // Source excluding test files
    js: [ 'client/app/**/*.js', '!client/app/**/*.spec.js'],

    // Templates
    atpl: [ 'client/app/**/*.tpl.html' ],

    // Entry page
    html: [ 'client/index.html' ],

    // Module styles
    scss: [ 'client/app/**/*.scss' ]
  },
  vendor_files  : {
    js: [
      'vendor/angular/angular.js',
      'vendor/angular-ui-router/release/angular-ui-router.js',
      'vendor/angular-animate/angular-animate.js',
      'vendor/lodash/lodash.js',
    ],
    css: [
      'vendor/animate.css/animate.min.css'
    ]
  },
  import_path: {
    bootstrap : 'vendor/bootstrap-sass-official/assets/stylesheets',
    fontawesome : 'vendor/font-awesome/scss'
  }
};
