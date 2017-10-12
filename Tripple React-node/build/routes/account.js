'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _utils = require('../utils');

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// router.post('/signup',(req,res)=>{
//   let login_id = req.body.login_id;
//   let password = req.body.login_id;
//   let email = req.body.email;
//   let nation = req.body.nation;
//   let sex = req.body.sex;
//   let phone = req.body.phone;
//   let birth = req.body.birth;
//   let profile_url = req.body.profile_url;
//   let profile_text = req.body.profile_text;
//
//   dbConnect(res).then((conn)=>{
//     query(conn,res,
//       `INSERT INTO users(login_id,password,email,name,nation,sex,phone,birth,profile_url,profile_text) VALUES(?,?,?,?,?,?,?,?,?,?)`,
//       [
//         login_id,
//         password,
//         email,
//         name,
//         nation,
//         sex,
//         phone,
//         profile_url,
//         profile_text
//       ]
//   ).then((result)=>{
//       conn.release();
//       res.json(SUCCESS);
//     });
//   });
// });

router.post('/signup', function (req, res) {
  var login_id = req.body.loginId;
  var password = req.body.password;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;

  (0, _utils.dbConnect)(res).then(function (conn) {
    (0, _utils.query)(conn, res, 'INSERT INTO users(login_id,password,firstName,lastName) VALUES(?,?,?,?)', [login_id, password, firstName, lastName]).then(function (result) {
      (0, _utils.query)(conn, res, 'SELECT * FROM users WHERE login_id=?', [login_id]).then(function (re) {
        conn.release();
        res.json((0, _utils.toRes)(_utils.SUCCESS, {
          data: {
            userId: re[0].user_id
          }
        }));
      });
    });
  });
});

router.post('/signin', function (req, res) {
  var login_id = req.body.login_id;
  var password = req.body.password;

  (0, _utils.dbConnect)(res).then(function (conn) {
    (0, _utils.query)(conn, res, 'SELECT * FROM users WHERE login_id =? AND password =?', [login_id, password]).then(function (result) {
      console.log(login_id + "," + password + " 결과는? " + result.length);
      conn.release();
      if (result.length === 0) {
        res.json(_utils.INVALID_REQUEST);
      } else {

        res.json((0, _utils.toRes)(_utils.SUCCESS, {
          data: result[0]
        }));
      };
    });
  });
});

router.get('/info/:user_id', function (req, res) {
  var user_id = req.params.user_id;

  (0, _utils.dbConnect)(res).then(function (conn) {
    (0, _utils.query)(conn, res, 'SELECT * FROM users WHERE user_id = ?', [user_id]).then(function (result) {
      conn.release();
      if (result.length === 0) {
        res.json(_utils.INVALID_REQUEST);
      } else {

        res.json((0, _utils.toRes)(_utils.SUCCESS, {
          data: result[0]
        }));
      };
    });
  });
});

router.post('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) throw err;
  });
  return res.json({ sucess: true });
});

//updateProfile
router.put('/info/:user_id', function (req, res) {

  var profile_text = req.body.profile_text;
  var user_id = req.params.user_id;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var phone = req.body.phone;
  var sex = req.body.sex;
  var languages = req.body.languages;
  var nation = req.body.nation;
  var birth = req.body.birth;

  (0, _utils.dbConnect)(res).then(function (conn) {
    (0, _utils.query)(conn, res, '\n      UPDATE users\n      SET firstName = ?, lastName = ?, email = ?, phone = ?, sex = ?, languages = ?, nation = ?, birth = ?, profile_text=?\n      WHERE user_id = ?\n      ', [firstName, lastName, email, phone, sex, languages, nation, birth, profile_text, user_id]).then(function (result) {
      conn.release();
      res.json(_utils.SUCCESS);
    });
  });
});

exports.default = router;