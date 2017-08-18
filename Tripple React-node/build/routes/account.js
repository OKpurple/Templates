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

router.post('/signup', function (req, res) {
  var login_id = req.body.login_id;
  var password = req.body.login_id;
  var email = req.body.email;
  var nation = req.body.nation;
  var sex = req.body.sex;
  var phone = req.body.phone;
  var birth = req.body.birth;
  var profile_url = req.body.profile_url;
  var profile_text = req.body.profile_text;

  (0, _utils.dbConnect)(res).then(function (conn) {
    (0, _utils.query)(conn, res, 'INSERT INTO users(login_id,password,email,name,nation,sex,phone,birth,profile_url,profile_text) VALUES(?,?,?,?,?,?,?,?,?,?)', [login_id, password, email, name, nation, sex, phone, profile_url, profile_text]).then(function (result) {
      conn.release();
      res.json(_utils.SUCCESS);
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
        res.json(_utils.SUCCESS);
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
          data: result
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

exports.default = router;