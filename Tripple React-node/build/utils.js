'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dbConnect = exports.query = exports.toRes = exports.INVALID_REQUEST = exports.SUCCESS = exports.SERVER_ERROR = exports.DB_ERROR = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _dbConfig = require('../server/config/db-config.json');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import db from '../server/db'
var db = _mysql2.default.createPool({
    host: _dbConfig2.default.host,
    port: _dbConfig2.default.port,
    user: _dbConfig2.default.user,
    password: _dbConfig2.default.password,
    database: _dbConfig2.default.database,
    multipleStatements: _dbConfig2.default.multipleStatements,
    connectionLimit: _dbConfig2.default.connectionLimit,
    waitForConnections: _dbConfig2.default.waitForConnections,
    charset: _dbConfig2.default.charset
});

var DB_ERROR = exports.DB_ERROR = {
    meta: {
        code: -11,
        message: "데이터베이스 오류"
    }
};

var SERVER_ERROR = exports.SERVER_ERROR = {
    meta: {
        code: -12,
        message: "서버 오류"
    }
};

var SUCCESS = exports.SUCCESS = {
    "meta": {
        "code": 0,
        "message": "success"
    }
};

var INVALID_REQUEST = exports.INVALID_REQUEST = {
    meta: {
        code: -10,
        message: "잘못된 요청"
    }
};

var toRes = exports.toRes = function toRes(meta, data) {
    return Object.assign({}, meta, data);
};

var query = exports.query = function query(connection, res, queryString) {
    var queryValueArr = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    return new _bluebird2.default(function (resolved, rejected) {
        connection.query(queryString, queryValueArr, function (err, result) {
            if (err) {
                console.log(err);
                connection.release();
                return connection.rollback(function () {
                    res.status(500).json(DB_ERROR);
                });
            } else {
                resolved(result);
            }
        });
    });
};

var dbConnect = exports.dbConnect = function dbConnect(res) {
    return new _bluebird2.default(function (resolved, rejected) {
        db.getConnection(function (connectionErr, connection) {
            if (connectionErr) {
                console.log(connectionErr);
                connection.release();
                return res.status(500).json(DB_ERROR);
            } else {
                resolved(connection);
            }
        });
    });
};