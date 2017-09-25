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

//search city/date
router.get('/search/:city/:date', function (req, res) {
  var city = req.params.city;
  var meeting_date = req.params.date;
  var sql = 'SELECT p.* FROM programs p, open_programs op WHERE';
  var params;

  console.log("city = " + city + " date = " + meeting_date);
  if (city === "undefined" && meeting_date !== "undefined") {
    sql = sql + ' op.meeting_date =? AND p.program_id = op.program_id';
    params = [meeting_date];
  } else if (city !== "undefined" && meeting_date === "undefined") {
    sql = sql + ' p.city =? AND p.program_id = op.program_id ORDER BY op.meeting_date DESC';
    params = [city];
  } else if (city === "undefined" && meeting_date === "undefined") {
    sql = sql + ' p.program_id = op.program_id ORDER BY op.meeting_date DESC';
    params = [];
  } else {
    sql = sql + ' p.city = ? AND p.program_id = op.program_id AND op.meeting_date = ?';
    params = [city, meeting_date];
  }

  console.log(sql + " " + params);
  (0, _utils.dbConnect)(res).then(function (conn) {
    (0, _utils.query)(conn, res, sql, params).then(function (result) {
      conn.release();
      res.json((0, _utils.toRes)(_utils.SUCCESS, {
        data: result
      }));
    });
  });
});

//내가 신청한 여행 목록
//reservation status = 0 예약대기
//                   = 1 입금완료
//                   = 2 참가확정
//                   =
router.get('/:id', function (req, res) {
  var user_id = req.params.id;
  (0, _utils.dbConnect)(res).then(function (conn) {
    (0, _utils.query)(conn, res, '\n        SELECT op.meeting_date, p.*,r.status FROM open_programs op, reservations r, programs p\n        WHERE r.user_id = ? AND r.open_program_id = op.open_program_id AND op.program_id = p.program_id\n        ', [user_id]).then(function (result) {
      conn.release();
      res.json((0, _utils.toRes)(_utils.SUCCESS, {
        data: result
      }));
    });
  });
});

exports.default = router;