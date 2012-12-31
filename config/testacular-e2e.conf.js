basePath = '../';

files = [
   ANGULAR_SCENARIO,
   ANGULAR_SCENARIO_ADAPTER,
  'test/e2e/**/*.js'
];

browsers = ['Chrome'];

proxies = {
  '/': 'http://localhost:8000/'
};

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};

// Auto run tests on start (when browsers are captured) and exit
singleRun = true;
