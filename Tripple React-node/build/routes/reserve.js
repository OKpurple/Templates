'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//1 찜
//2 예약하기
//3 예약완료

router.delete('/dib/:rid', function (req, res) {
  console.log("deleteMethod");
  var rid = req.params.rid;
  (0, _utils.dbConnect)(res).then(function (conn) {
    (0, _utils.query)(conn, res, 'DELETE FROM reservations WHERE reservation_id = ?', [rid]).then(function (result) {
      conn.release();
      res.json(_utils.SUCCESS);
    });
  });
});

router.post('/dib', function (req, res) {

  var opid = req.body.opid;
  var cid = req.body.cid;

  (0, _utils.dbConnect)(res).then(function (conn) {
    (0, _utils.query)(conn, res, 'SELECT * FROM reservations WHERE user_id = ? AND open_program_id=?', [cid, opid]).then(function (result) {
      if (result.length === 0) {
        (0, _utils.query)(conn, res, 'INSERT INTO reservations(open_program_id,user_id,status) VALUES(?,?,1)', [opid, cid]).then(function (insRes) {
          conn.release();
          res.json(_utils.SUCCESS);
        });
      } else {
        conn.release();
        res.json(res.json({
          "meta": {
            "code": -1,
            "message": ""
          }
        }));
      }
    });
  });
});

exports.default = router;