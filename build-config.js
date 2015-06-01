module.exports  = {
  dist    : 'dist',
  assets  : 'dist/assets',
  src     : 'src',
  server  : 'server',
  client  : 'client',
  app     : 'client/app',
  data    : 'client/assets/data',
  images  : 'client/assets/images',
  fonts   : 'client/assets/fonts',
  styles  : 'client/assets/styles',
  appFiles : {

    // Source excluding test and template files
    js: [ 'client/app/**/*.js', '!client/app/**/*.spec.js' ],

    // Templates
    atpl: [ 'client/app/**/*.tpl.html' ],

    // Entry page
    html: [ 'client/index.html' ],

    // Module styles
    scss: [ 'client/assets/styles/**/*.scss' ]
  },
  vendorFiles  : {
    js: [
      'vendor/angular/angular.js',
      'vendor/angular-ui-router/release/angular-ui-router.js',
      'vendor/angular-animate/angular-animate.js',
      'vendor/lodash/lodash.js'
    ],
    css: [
      'vendor/animate.css/animate.min.css'
    ]
  },
  importPath: {
    foundationSass : 'vendor/font-awesome/scss',
    fontawesomeSass : 'vendor/font-awesome/scss'
  }
};
