module.exports = function (wallaby) {
  return {
    files: [
      { pattern: 'node_modules/jquery/dist/jquery.js', instrument: false },
      { pattern: 'node_modules/datatables.net/js/dataTables.js', instrument: false },
      'cbr_web_components/js/**/*.*',
    ],
    tests: [
      'cbr_web_components/qunit/**/*.*',
    ],
    testFramework: 'qunit',
    env: {
      kind: 'chrome',
    },
    middleware: function (app, express) {
      // Serve the highlight files from node_modules
      app.use('/assets/plugins/highlight', express.static(require('path').join(__dirname, 'node_modules/highlight.js/styles')));
    },
  };
};