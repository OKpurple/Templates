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

// router.get('/op/:user_id',(req,res)=>{
//   let user_id = req.params.user_id;
//   console.log(user_id+"get programs");
//   dbConnect(res).then((conn)=>{
//     query(conn,res,
//       `SELECT * FROM programs WHERE user_id = ?`,
//       [
//         user_id
//       ]
//     ).then((programList)=>{
//       //비동기에 scope 관련  -> 좀 더 좋은 방법생각하기
//       new Promise((resolved,rejected)=>{
//         for(let i = 0; i<programList.length;i++){
//           query(conn,res,`
//             SELECT * FROM open_programs WHERE program_id = ?`,[programList[i].program_id])
//           .then((opList)=>{
//             Object.assign(programList[i],{openList : opList});
//             if(i == (programList.length-1)){
//               resolved(programList)
//             }
//           })
//         }
//       }).then((result)=>{
//         conn.release();
//         res.json(toRes(SUCCESS,
//           { data : result }
//         ));
//       })
//     });
//   });
// });


router.get('/op/:user_id', function (req, res) {
  var user_id = req.params.user_id;
  console.log(user_id + "get programs");
  (0, _utils.dbConnect)(res).then(function (conn) {
    return (0, _utils.query)(conn, res, 'SELECT * FROM programs WHERE user_id = ?', [user_id]);
  }).then(function (programList) {

    return _bluebird2.default.all(programList.map(function (program) {
      (0, _utils.query)(conn, res, '\n          SELECT * FROM open_programs WHERE program_id = ?', [program.program_id]).then(function (opList) {
        return Object.assign(program, { openList: opList });
      });
    }));
  }).then(function (result) {
    conn.release();
    console.log(result);
    res.json((0, _utils.toRes)(_utils.SUCCESS, { data: result }));
  });
});

exports.default = router;