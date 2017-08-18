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
  var user_id = req.body.user_id;
  var title = req.body.title;
  var city = req.body.city;
  var start_time = req.body.start_time;
  var end_time = req.body.end_time;
  var meeting_lng = req.body.meeting_lng;
  var meeting_lat = req.body.meeting_lat;
  var participant_max = req.body.participant_max;
  var content = req.body.content;
  var img_url = req.body.img_url;
  var languages = req.body.languages;
  var themes = req.body.themes;
  (0, _utils.dbConnect)(res).then(function (conn) {
    (0, _utils.query)(conn, res, 'INSERT INTO programs(user_id, title,city,start_time,end_time,meeting_lat,meeting_lng,participant_max,themes,content,img_url,languages)\n      VALUES(?,?,?,?,?,?,?,?,?,?,?,?)', [user_id, title, city, start_time, end_time, meeting_lat, meeting_lng, participant_max, themes, content, img_url, languages]).then(function (result) {
      conn.release();
      res.json(_utils.SUCCESS);
    });
  });
});

router.get('/:user_id', function (req, res) {
  var user_id = req.params.user_id;

  (0, _utils.dbConnect)(res).then(function (conn) {
    (0, _utils.query)(conn, res, 'SELECT * FROM programs WHERE user_id =?', [user_id]).then(function (result) {
      conn.release();
      res.json((0, _utils.toRes)(_utils.SUCCESS, {
        data: result
      }));
    });
  });
});

exports.default = router;