'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', function (req, res) {
  (0, _utils.dbConnect)(res).then(function (conn) {
    (0, _utils.query)(conn, res, '', []).then(function (result) {});
  });
});

router.get('/', function (req, res) {
  (0, _utils.dbConnect)(res).then(function (conn) {
    (0, _utils.query)(conn, res, '', []).then(function (result) {});
  });
});

exports.default = router;