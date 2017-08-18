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

export default router;
