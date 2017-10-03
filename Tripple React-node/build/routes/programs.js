'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/op/:user_id', function (req, res) {
  var user_id = req.params.user_id;

  console.log(user_id + "get programs");

  (0, _utils.dbConnect)(res).then(function (conn) {
    (0, _utils.query)(conn, res, 'SELECT * FROM programs WHERE user_id = ?', [user_id]).then(function (programList) {
      //비동기에 scope 관련  -> 좀 더 좋은 방법생각하기
      new _bluebird2.default(function (resolved, rejected) {
        var _loop = function _loop(i) {
          (0, _utils.query)(conn, res, '\n            SELECT * FROM open_programs WHERE program_id = ?', [programList[i].program_id]).then(function (opList) {
            Object.assign(programList[i], { openList: opList });
            if (i == programList.length - 1) {
              resolved(programList);
            }
          });
        };

        for (var i = 0; i < programList.length; i++) {
          _loop(i);
        }
      }).then(function (result) {
        conn.release();
        res.json((0, _utils.toRes)(_utils.SUCCESS, { data: result }));
      });
    });
  });
});

router.post('/', function (req, res) {
  console.log(req.body);

  var user_id = req.body.user_id;
  var title = req.body.title;
  var address = req.body.address;
  var start_time = req.body.startTime;
  var end_time = req.body.endTime;
  var lng = req.body.lng;
  var lat = req.body.lat;
  var participant_max = req.body.participant;
  var content = req.body.content;
  var img_url = req.body.img_url;
  var category = req.body.category;
  var themes = "";
  category.map(function (theme) {
    console.log(theme);
    themes += theme + ';';
  });
  console.log(themes);

  if (img_url === undefined) {
    img_url = "http://127.0.0.1:4000/images/test.png";
  }

  var routes = req.body.routes;

  (0, _utils.dbConnect)(res).then(function (conn) {
    (0, _utils.query)(conn, res, 'INSERT INTO programs(user_id, title,address,start_time,end_time,lat,lng,participant_max,themes,content,img_url)\n      VALUES(?,?,?,?,?,?,?,?,?,?,?)', [user_id, title, address, start_time, end_time, lat, lng, participant_max, themes, content, img_url]).then(function (result) {
      conn.release();
      res.json(_utils.SUCCESS);
    });
  });
});

//내 프로그램 목록
router.get('/:user_id', function (req, res) {
  var user_id = req.params.user_id;
  console.log(user_id + "get programs");
  (0, _utils.dbConnect)(res).then(function (conn) {
    (0, _utils.query)(conn, res, 'SELECT * FROM programs WHERE user_id = ?', [user_id]).then(function (programList) {
      conn.release();
      res.json((0, _utils.toRes)(_utils.SUCCESS, {
        data: programList
      }));
    });
  });
});

exports.default = router;