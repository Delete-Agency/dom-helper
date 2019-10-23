"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("./polyfills");

var _domHelper = require("./dom-helper");

Object.keys(_domHelper).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _domHelper[key];
    }
  });
});