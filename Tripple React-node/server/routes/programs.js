import express from 'express';
import Promise from 'bluebird'
import { DB_ERROR, SUCCESS, INVALID_REQUEST, SERVER_ERROR,dbConnect,query,toRes} from '../utils';




const router = express.Router();

router.post('/',(req,res)=>{
  let user_id = req.body.user_id;
  let title = req.body.title;
  let city = req.body.city;
  let start_time = req.body.start_time;
  let end_time = req.body.end_time;
  let meeting_lng = req.body.meeting_lng;
  let meeting_lat = req.body.meeting_lat;
  let participant_max = req.body.participant_max;
  let content = req.body.content;
  let img_url = req.body.img_url;
  let languages = req.body.languages;
  let themes = req.body.themes;
  dbConnect(res).then((conn)=>{
    query(conn,res,
      `INSERT INTO programs(user_id, title,city,start_time,end_time,meeting_lat,meeting_lng,participant_max,themes,content,img_url,languages)
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        user_id,
        title,
        city,
        start_time,
        end_time,
        meeting_lat,
        meeting_lng,
        participant_max,
        themes,
        content,
        img_url,
        languages
      ]
    ).then((result)=>{
      conn.release();
      res.json(SUCCESS);
    });
  });
});

//내 프로그램 목록
router.get('/:user_id',(req,res)=>{
  let user_id = req.params.user_id;
  console.log(user_id+"get programs");
  dbConnect(res).then((conn)=>{
    query(conn,res,
      `SELECT * FROM programs WHERE user_id = ?`,
      [
        user_id
      ]
    ).then((programList)=>{
        conn.release();
      res.json(toRes(SUCCESS,{
        data : programList
      }))
    });
  });
});

router.get('/op/:user_id',(req,res)=>{
  let user_id = req.params.user_id;
  console.log(user_id+"get programs");
  dbConnect(res).then((conn)=>{
    query(conn,res,
      `SELECT * FROM programs WHERE user_id = ?`,
      [
        user_id
      ]
    ).then((programList)=>{
      //비동기에 scope 관련  -> 좀 더 좋은 방법생각하기
      new Promise((resolved,rejected)=>{
        for(let i = 0; i<programList.length;i++){
          query(conn,res,`
            SELECT * FROM open_programs WHERE program_id = ?`,[programList[i].program_id])
          .then((opList)=>{
            Object.assign(programList[i],{openList : opList});
            if(i == (programList.length-1)){
              resolved(programList)
            }
          })
        }
      }).then((result)=>{
        conn.release();
        res.json(toRes(SUCCESS,
          { data : result }
        ));
      })
    });
  });
});










export default router;
