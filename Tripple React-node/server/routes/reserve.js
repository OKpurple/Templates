import express from 'express';
import { DB_ERROR, SUCCESS, INVALID_REQUEST, SERVER_ERROR,dbConnect,query,toRes} from '../utils';
const router = express.Router();

//1 찜
//2 예약하기
//3 예약완료

router.delete('/dib/:rid',(req,res)=>{
  console.log("deleteMethod")
  var rid = req.params.rid;
  dbConnect(res).then((conn)=>{
    query(conn,res,
      `DELETE FROM reservations WHERE reservation_id = ?`,
      [
        rid
      ]
    ).then((result)=>{
      conn.release();
      res.json(SUCCESS)
    });
  });
});

router.post('/dib',(req,res)=>{

  var opid = req.body.opid;
  var cid = req.body.cid;

  dbConnect(res).then((conn)=>{
    query(conn,res,
      `SELECT * FROM reservations WHERE user_id = ? AND open_program_id=?`,
      [
        cid,opid
      ]
    ).then((result)=>{
      if(result.length === 0){
        query(conn,res,
          `INSERT INTO reservations(open_program_id,user_id,status) VALUES(?,?,1)`,
          [
            opid,cid
          ]).then((insRes)=>{
            conn.release();
            res.json(SUCCESS);
          })
      }else{
        conn.release();
        res.json(res.json(
          {
            "meta" :  {
              "code" : -1,
              "message" : ""
            }
          }
        ))
      }
    });
  });
});




export default router;
