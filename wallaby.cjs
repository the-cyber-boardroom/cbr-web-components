module.exports = function (wallaby) {
  return {
    "files": [
        {"pattern": "node_modules/jquery/dist/jquery.js"           , "instrument": false},
        {"pattern": "node_modules/datatables.net/js/dataTables.js" , "instrument": false},
        "cbr_web_components/js/**/*.*" ,

    ],
    "tests": [
        "cbr_web_components/qunit/**/*.*" ,
    ],
    "testFramework": "qunit",
    "env": {
      "kind": "chrome"
    },
  };
};