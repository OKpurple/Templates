'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
  var city = req.query.city;
  var meeting_date = req.qeury.meeting_date;
  console.log("city:" + city + "medate:" + meeting_date);

  (0, _utils.dbConnect)(res).then(function (conn) {
    (0, _utils.query)(conn, res, '\n      SELECT p.program_id, p.title, p.meeting_address, u.login_id\n      FROM open_programs op\n        LEFT OUTER JOIN programs p\n        ON op.program_id = p.program_id\n        LEFT OUTER JOIN users u\n        ON p.user_id = u.user_id\n      WHERE p.meeting_address LIKE \'%?%\' AND op.meeting_date = ?', [city, meeting_date]).then(function (result) {
      conn.relase();
      res.json((0, _utils.toRes)(_utils.SUCCESS, {
        data: result
      }));
    });
  });
});

exports.default = router;