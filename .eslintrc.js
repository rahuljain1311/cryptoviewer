module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended"
    ],
  "rules": {
    "no-console":0,
    "indent": [
        "error",
        4
    ],
    "linebreak-style": [
        "error",
        "unix"
    ],
    "semi": [
        "error",
        "always"
    ],
    "object-shorthand": 0,
    "comma-spacing": [
        "error",
        { "before": false, "after": true }
    ]
  }
};
