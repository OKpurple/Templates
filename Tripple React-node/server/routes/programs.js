import express from 'express';
import Promise from 'bluebird'
import { DB_ERROR, SUCCESS, INVALID_REQUEST, SERVER_ERROR,dbConnect,query,toRes} from '../utils';




const router = express.Router();


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

router.post('/',(req,res)=>{
  console.log(req.body);

  let user_id = req.body.user_id;
  let title = req.body.title;
  let address = req.body.address;
  let start_time = req.body.startTime;
  let end_time = req.body.endTime;
  let lng = req.body.lng;
  let lat = req.body.lat;
  let participant_max = req.body.participant;
  let content = req.body.content;
  let img_url = req.body.img_url;
  let languages = req.body.language;
  let themes = req.body.category;

  if(img_url===undefined){
    img_url = "http://127.0.0.1:4000/images/test.png"
  }
  dbConnect(res).then((conn)=>{
    query(conn,res,
      `INSERT INTO programs(user_id, title,address,start_time,end_time,lat,lng,participant_max,themes,content,img_url,languages)
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        user_id,
        title,
        address,
        start_time,
        end_time,
        lat,
        lng,
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












export default router;
