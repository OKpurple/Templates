import Promise from 'bluebird'
import express from 'express'
// import db from '../server/db'
import mysql from 'mysql'
import dbConfig from '../server/config/db-config.json';


const db = mysql.createPool({
    host                 : dbConfig.host,
    port                 : dbConfig.port,
    user                 : dbConfig.user,
    password             : dbConfig.password,
    database             : dbConfig.database,
    multipleStatements   : dbConfig.multipleStatements,
    connectionLimit      : dbConfig.connectionLimit,
    waitForConnections   : dbConfig.waitForConnections,
    charset              : dbConfig.charset
});



export const DB_ERROR = {
                            meta: {
                                code: -11,
                                message: "데이터베이스 오류"
                            }
                        };

export const SERVER_ERROR = {
                            meta: {
                                code: -12,
                                message: "서버 오류"
                            }
                        };

export const SUCCESS = {
                            "meta": {
                                "code": 0,
                                "message": "success"
                            }
                        }

export const INVALID_REQUEST =  {
                                    meta: {
                                        code: -10,
                                        message: "잘못된 요청"
                                    }
                                };

export const toRes = (meta,data)=>{
    return Object.assign(
      {},
      meta,
      data
    )
}

export const query = (connection, res, queryString, queryValueArr = null) => {
    return new Promise((resolved, rejected) => {
        connection.query(queryString, queryValueArr, (err, result) => {
            if (err) {
                console.log(err);
                connection.release();
                return connection.rollback(() => {
                    res.status(500).json(DB_ERROR);
                });
            } else {
                resolved(result);
            }
        });
    });
};


export const dbConnect = (res) => {
    return new Promise((resolved, rejected) => {
        db.getConnection((connectionErr, connection)=>{
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
