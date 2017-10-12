import express from 'express';
import Promise from 'bluebird'
import { getTimeStamp,DB_ERROR, SUCCESS, INVALID_REQUEST, SERVER_ERROR,dbConnect,query,toRes} from '../utils';
import multer from 'multer';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'build/uploads/programImg/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {

    let name = `${req.params.user_id}-${getTimeStamp().replace(' ','')}-${file.originalname}`
    let url = `http://211.253.24.106/images/programImg/${name}`
    req.params.url = url;
    console.log('url은 멀터에서 '+url);

    cb(null, name) // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
})




const router = express.Router();


//내가만든 프로그램
router.get('/op/:user_id',(req,res)=>{
  let user_id = req.params.user_id;

  console.log(user_id+"get programs");


  dbConnect(res).then((conn)=>{
    query(conn,res,
      `SELECT * FROM programs WHERE user_id = ? ORDER BY program_id DESC`,
      [
        user_id
      ]
    ).then((programList)=>{
      //비동기에 scope 관련  -> 좀 더 좋은 방법생각하기
      new Promise((resolved,rejected)=>{
        for(let i = 0; i<programList.length;i++){
          query(conn,res,
            `SELECT op.*,
               COUNT(CASE WHEN r.status=1 THEN 1 END) reservStatus_success,
               COUNT(CASE WHEN r.status=0 THEN 1 END) reservStatus_wait
             FROM open_programs op
               LEFT OUTER JOIN reservations r
               ON op.open_program_id = r.open_program_id
             WHERE program_id = ?
               GROUP BY open_program_id`,[programList[i].program_id])
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


var upload = multer({ storage: storage }).single('program_img');

router.post('/',(req,res)=>{
  console.log("createPro server")

    let user_id = req.body.user_id;
    let title = req.body.title;
    let address = req.body.address;
    let start_time = req.body.startTime;
    let lng = req.body.lng;
    let lat = req.body.lat;
    let participant_max = req.body.participant;
    let content = req.body.content;
    let category = req.body.category;
    let routes = req.body.routes
    let themes=""
    let img_url = req.body.program_url
    let price = req.body.price;

    if(img_url==='undefined'){
      img_url = "http://211.253.24.106/images/programImg/default.png"
    }

    console.log(req.body);

    category.map((theme)=>{
      themes += (theme+';')
    })

    dbConnect(res).then((conn)=>{
      query(conn,res,
        `INSERT INTO programs(user_id, title,address,start_time,lat,lng,participant_max,themes,content,img_url,price)
        VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
        [
          user_id,
          title,
          address,
          start_time,
          lat,
          lng,
          participant_max,
          themes,
          content,
          img_url,
          price
        ]
      ).then((result)=>{

        new Promise((resolved,rejected)=>{routes.map((route,key)=>{
          let _title = route.placeName;
          let _lat = route.lat;
          let _lng = route.lng;
          let _explanation = route.explanation;
          let _pid = result.insertId;
          let elapsedTime=route.routeTime;

          query(conn,res,`
            INSERT INTO routes(title,lat,lng,explanation,program_id,elapsed_time) VALUES(?,?,?,?,?,?)`,
            [_title,_lat,_lng,_explanation,_pid,elapsedTime]).then((qres)=>{
              if(key === (routes.length-1)){
                resolved('true');
              }
            });
        })
      }).then((insertRes)=>{
              conn.release();
              console.log('create Program SUCEESS')
              res.json(SUCCESS);
         })
      });
    });



});

//안쓰이는듯?
router.get('/:user_id',(req,res)=>{
  let user_id = req.params.user_id;
  console.log(user_id+"get programs");
  dbConnect(res).then((conn)=>{
    query(conn,res,
      `SELECT * FROM programs WHERE user_id = ? ORDER BY program_id DESC`,
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



router.post('/uploadImg/:user_id',(req,res)=>{

  upload(req,res,(err)=>{

    res.json(toRes(SUCCESS,{
      program_url : req.params.url
    }))
  })

});




router.get('/detail/:pid',(req,res)=>{

  var pid = req.params.pid;
  console.log('get program detail ='+pid)

  dbConnect(res).then((conn)=>{
    query(conn,res,
      `SELECT * FROM programs WHERE program_id = ?`,
      [
        pid
      ]
    ).then((programInfo)=>{
      query(conn,res,`SELECT * FROM routes WHERE program_id = ?`,[pid]).then((routesInfo)=>{
        conn.release();
        var data = Object.assign(programInfo[0],{routesInfo : routesInfo});
        res.json(toRes(SUCCESS,{
          data
        }))
      })
    });
  });
});




export default router;
