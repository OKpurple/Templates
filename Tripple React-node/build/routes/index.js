'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

var _reserve = require('./reserve');

var _reserve2 = _interopRequireDefault(_reserve);

var _programs = require('./programs');

var _programs2 = _interopRequireDefault(_programs);

var _openPrograms = require('./openPrograms');

var _openPrograms2 = _interopRequireDefault(_openPrograms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/account', _account2.default);
router.use('/reserve', _reserve2.default);
router.use('/openPrograms', _openPrograms2.default);
router.use('/programs', _programs2.default);

exports.default = router;