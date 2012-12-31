basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'dist/js/vendor.js',
  'test/lib/angular/angular-mocks.js',
  'dist/js/app.js',
  'test/unit/**/*.js'
];

autoWatch = false;

browsers = ['Chrome'];

// Auto run tests on start (when browsers are captured) and exit
singleRun = true;
