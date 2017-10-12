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

//프로그램 오픈하기
router.post('/:pid', function (req, res) {
  var pid = req.params.pid;
  var date = req.body.date;
  console.log(pid + ',' + date + "open하려고");
  (0, _utils.dbConnect)(res).then(function (conn) {
    (0, _utils.query)(conn, res, 'INSERT INTO open_programs(program_id, meeting_date) VALUES(?,?)', [pid, date]).then(function (result) {
      conn.release();
      res.json(_utils.SUCCESS);
    });
  });
});

//검색 city/date
router.get('/search/:city/:date', function (req, res) {
  var city = req.params.city;
  var meeting_date = req.params.date;
  var sql = 'SELECT p.*, op.open_program_id, op.meeting_date FROM programs p, open_programs op WHERE ';
  var params;

  console.log("city = " + city + " date = " + meeting_date);

  if (city === "undefined" && meeting_date !== "undefined") {
    sql = sql + ' op.meeting_date =? AND p.program_id = op.program_id ORDER BY open_program_id DESC';
    params = [meeting_date];
  } else if (city !== "undefined" && meeting_date === "undefined") {
    sql = sql + 'p.address LIKE ? AND p.program_id = op.program_id ORDER BY op.meeting_date DESC, open_program_id DESC';
    params = ['%' + city + '%'];
  } else if (city === "undefined" && meeting_date === "undefined") {
    sql = sql + ' p.program_id = op.program_id ORDER BY op.meeting_date DESC, open_program_id DESC';
    params = [];
  } else {
    sql = sql + ' p.address LIKE ? AND p.program_id = op.program_id AND op.meeting_date = ? ORDER BY open_program_id DESC';
    params = ['%' + city + '%', meeting_date];
  }

  console.log(sql + ", " + params);
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

//검색한거 상세보기
router.get('/detail/:opid', function (req, res) {
  var opid = req.params.opid;
  (0, _utils.dbConnect)(res).then(function (conn) {
    (0, _utils.query)(conn, res, 'SELECT op.*, p.*\n       FROM programs p, open_programs op\n       WHERE open_program_id = ? AND op.program_id = p.program_id ', [opid]).then(function (programInfo) {
      (0, _utils.query)(conn, res, 'SELECT * FROM users WHERE user_id = ?', [programInfo[0].user_id]).then(function (userInfo) {
        (0, _utils.query)(conn, res, 'SELECT * FROM routes WHERE program_id =? ', [programInfo[0].program_id]).then(function (routesInfo) {
          (0, _utils.query)(conn, res, 'SELECT * FROM reservations WHERE open_program_id = ?', [opid]).then(function (reservationInfo) {
            conn.release();
            res.json((0, _utils.toRes)(_utils.SUCCESS, {
              data: {
                programInfo: programInfo[0],
                userInfo: userInfo[0],
                routesInfo: routesInfo,
                reservationInfo: reservationInfo
              }
            }));
          });
        });
      });
    });
  });
});

//지도에 루트 띄울때 루트 알기위해서
router.get('/routes/:opid', function (req, res) {
  var opid = req.params.opid;
  (0, _utils.dbConnect)(res).then(function (conn) {
    (0, _utils.query)(conn, res, 'SELECT r.* FROM routes r, open_programs op WHERE open_program_id=? AND op.program_id=r.program_id', [opid]).then(function (result) {
      conn.release();
      res.json((0, _utils.toRes)(_utils.SUCCESS, {
        data: result
      }));
    });
  });
});

router.get('/wishList/:user_id', function (req, res) {
  var user_id = req.params.user_id;
  (0, _utils.dbConnect)(res).then(function (conn) {
    (0, _utils.query)(conn, res, 'SELECT op.*, p.*, r.apply_date, r.reservation_id\n       FROM programs p , open_programs op,reservations r\n       WHERE r.user_id=? AND r.status =1 AND r.open_program_id = op.open_program_id AND op.program_id = p.program_id', [user_id]).then(function (result) {
      conn.release();
      res.json((0, _utils.toRes)(_utils.SUCCESS, {
        data: result
      }));
    });
  });
});

exports.default = router;