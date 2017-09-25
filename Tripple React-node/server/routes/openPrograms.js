import express from 'express';
import { DB_ERROR, SUCCESS, INVALID_REQUEST, SERVER_ERROR,dbConnect,query,toRes} from '../utils';

const router = express.Router();


router.get('/',(req,res)=>{
  let city = req.query.city;
  let meeting_date = req.qeury.meeting_date;
  console.log("city:"+city+"medate:"+meeting_date);

  dbConnect(res).then((conn)=>{
    query(conn,res,`
      SELECT p.program_id, p.title, p.meeting_address, u.login_id
      FROM open_programs op
        LEFT OUTER JOIN programs p
        ON op.program_id = p.program_id
        LEFT OUTER JOIN users u
        ON p.user_id = u.user_id
      WHERE p.meeting_address LIKE '%?%' AND op.meeting_date = ?`,[city,meeting_date])
      .then((result)=>{
       conn.relase();
       res.json(toRes(SUCCESS,{
         data : result
       }))
     })
  })

})

//search city/date
router.get('/search/:city/:date',(req,res)=>{
  let city = req.params.city;
  let meeting_date = req.params.date;
  var sql = `SELECT p.* FROM programs p, open_programs op WHERE`;
  var params;


  console.log("city = " + city + " date = " + meeting_date);
  if(city === "undefined" && meeting_date !== "undefined"){
    sql = sql + ` op.meeting_date =? AND p.program_id = op.program_id`
    params = [meeting_date]
  }else if(city !== "undefined" && meeting_date === "undefined"){
    sql = sql + ` p.city =? AND p.program_id = op.program_id ORDER BY op.meeting_date DESC`
    params = [city]
  }else if(city === "undefined" && meeting_date === "undefined"){
    sql = sql + ` p.program_id = op.program_id ORDER BY op.meeting_date DESC`
    params = []
  }else{
    sql = sql + ` p.city = ? AND p.program_id = op.program_id AND op.meeting_date = ?`
    params = [city , meeting_date]
  }


  console.log(sql + " " + params);
  dbConnect(res).then((conn)=>{
    query(conn,res,
      sql,params
    ).then((result)=>{
      conn.release();
      res.json(toRes(SUCCESS,{
        data : result
      }))
    });
  });
});


//내가 신청한 여행 목록
//reservation status = 0 예약대기
//                   = 1 입금완료
//                   = 2 참가확정
//                   =
 router.get('/:id',(req,res)=>{
   let user_id = req.params.id;
    dbConnect(res).then((conn)=>{
      query(conn,res,`
        SELECT op.meeting_date, p.*,r.status FROM open_programs op, reservations r, programs p
        WHERE r.user_id = ? AND r.open_program_id = op.open_program_id AND op.program_id = p.program_id
        `,[user_id]).then((result)=>{
          conn.release();
          res.json(toRes(SUCCESS,{
            data : result
          }))
        }
        )
    })

 })





export default router;
