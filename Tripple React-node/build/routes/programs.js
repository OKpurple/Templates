'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _utils = require('../utils');

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = _multer2.default.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'build/uploads/programImg/'); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function filename(req, file, cb) {

    var name = req.params.user_id + '-' + (0, _utils.getTimeStamp)().replace(' ', '') + '-' + file.originalname;
    var url = 'http://211.253.24.106/images/programImg/' + name;
    req.params.url = url;
    console.log('url은 멀터에서 ' + url);

    cb(null, name); // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
});

var router = _express2.default.Router();

//내가만든 프로그램
router.get('/op/:user_id', function (req, res) {
  var user_id = req.params.user_id;

  console.log(user_id + "get programs");

  (0, _utils.dbConnect)(res).then(function (conn) {
    (0, _utils.query)(conn, res, 'SELECT * FROM programs WHERE user_id = ? ORDER BY program_id DESC', [user_id]).then(function (programList) {
      //비동기에 scope 관련  -> 좀 더 좋은 방법생각하기
      new _bluebird2.default(function (resolved, rejected) {
        var _loop = function _loop(i) {
          (0, _utils.query)(conn, res, 'SELECT op.*,\n               COUNT(CASE WHEN r.status=1 THEN 1 END) reservStatus_success,\n               COUNT(CASE WHEN r.status=0 THEN 1 END) reservStatus_wait\n             FROM open_programs op\n               LEFT OUTER JOIN reservations r\n               ON op.open_program_id = r.open_program_id\n             WHERE program_id = ?\n               GROUP BY open_program_id', [programList[i].program_id]).then(function (opList) {
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

var upload = (0, _multer2.default)({ storage: storage }).single('program_img');

router.post('/', function (req, res) {
  console.log("createPro server");

  var user_id = req.body.user_id;
  var title = req.body.title;
  var address = req.body.address;
  var start_time = req.body.startTime;
  var lng = req.body.lng;
  var lat = req.body.lat;
  var participant_max = req.body.participant;
  var content = req.body.content;
  var category = req.body.category;
  var routes = req.body.routes;
  var themes = "";
  var img_url = req.body.program_url;
  var price = req.body.price;

  if (img_url === 'undefined') {
    img_url = "http://211.253.24.106/images/programImg/default.png";
  }

  console.log(req.body);

  category.map(function (theme) {
    themes += theme + ';';
  });

  (0, _utils.dbConnect)(res).then(function (conn) {
    (0, _utils.query)(conn, res, 'INSERT INTO programs(user_id, title,address,start_time,lat,lng,participant_max,themes,content,img_url,price)\n        VALUES(?,?,?,?,?,?,?,?,?,?,?)', [user_id, title, address, start_time, lat, lng, participant_max, themes, content, img_url, price]).then(function (result) {

      new _bluebird2.default(function (resolved, rejected) {
        routes.map(function (route, key) {
          var _title = route.placeName;
          var _lat = route.lat;
          var _lng = route.lng;
          var _explanation = route.explanation;
          var _pid = result.insertId;
          var elapsedTime = route.routeTime;

          (0, _utils.query)(conn, res, '\n            INSERT INTO routes(title,lat,lng,explanation,program_id,elapsed_time) VALUES(?,?,?,?,?,?)', [_title, _lat, _lng, _explanation, _pid, elapsedTime]).then(function (qres) {
            if (key === routes.length - 1) {
              resolved('true');
            }
          });
        });
      }).then(function (insertRes) {
        conn.release();
        console.log('create Program SUCEESS');
        res.json(_utils.SUCCESS);
      });
    });
  });
});

//안쓰이는듯?
router.get('/:user_id', function (req, res) {
  var user_id = req.params.user_id;
  console.log(user_id + "get programs");
  (0, _utils.dbConnect)(res).then(function (conn) {
    (0, _utils.query)(conn, res, 'SELECT * FROM programs WHERE user_id = ? ORDER BY program_id DESC', [user_id]).then(function (programList) {
      conn.release();
      res.json((0, _utils.toRes)(_utils.SUCCESS, {
        data: programList
      }));
    });
  });
});

router.post('/uploadImg/:user_id', function (req, res) {

  upload(req, res, function (err) {

    res.json((0, _utils.toRes)(_utils.SUCCESS, {
      program_url: req.params.url
    }));
  });
});

router.get('/detail/:pid', function (req, res) {

  var pid = req.params.pid;
  console.log('get program detail =' + pid);

  (0, _utils.dbConnect)(res).then(function (conn) {
    (0, _utils.query)(conn, res, 'SELECT * FROM programs WHERE program_id = ?', [pid]).then(function (programInfo) {
      (0, _utils.query)(conn, res, 'SELECT * FROM routes WHERE program_id = ?', [pid]).then(function (routesInfo) {
        conn.release();
        var data = Object.assign(programInfo[0], { routesInfo: routesInfo });
        res.json((0, _utils.toRes)(_utils.SUCCESS, {
          data: data
        }));
      });
    });
  });
});

exports.default = router;