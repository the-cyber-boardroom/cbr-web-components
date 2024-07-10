module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['qunit'],
    files: [
        {"pattern": "node_modules/jquery/dist/jquery.js"              },
        {"pattern": "node_modules/datatables.net/js/dataTables.js"    },
        { pattern: 'cbr_web_components/js/**/*.*'    , type: 'module' },
        { pattern: 'cbr_web_components/qunit/**/*.*' , type: 'module' },
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
    singleRun: true,
    concurrency: Infinity
  });
};

