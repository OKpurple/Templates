'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

var _contents = require('./contents');

var _contents2 = _interopRequireDefault(_contents);

var _openPrograms = require('./openPrograms');

var _openPrograms2 = _interopRequireDefault(_openPrograms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/account', _account2.default);
router.use('/contents', _contents2.default);
router.use('/openPrograms', _openPrograms2.default);

exports.default = router;