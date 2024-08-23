let path = require('path');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['qunit'],
    files: [
        {"pattern": "node_modules/jquery/dist/jquery.js"              },
        {"pattern": "node_modules/datatables.net/js/dataTables.js"    },
        { pattern: 'cbr_web_components/js/**/*.*'    , type: 'module' },
        { pattern: 'cbr_web_components/qunit/**/*.*' , type: 'module' },
        { pattern: 'modules/cbr-static/cbr_static/assets/plugins/**',
          served: true,
          included: false
        }
    ],
    exclude: [],
    preprocessors: {
      // You can specify preprocessors here if necessary
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    concurrency: Infinity,
    proxies: { '/assets/plugins/': '/base/modules/cbr-static/cbr_static/assets/plugins' }
  });
};

