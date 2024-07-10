module.exports = function (wallaby) {
  return {
    "files": [
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