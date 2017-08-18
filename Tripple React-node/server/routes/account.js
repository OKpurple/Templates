import express from 'express';
import { DB_ERROR, SUCCESS, INVALID_REQUEST, SERVER_ERROR,dbConnect,query,toRes} from '../utils';
import session from 'express-session';
const router = express.Router();

router.post('/signup',(req,res)=>{
  let login_id = req.body.login_id;
  let password = req.body.login_id;
  let email = req.body.email;
  let nation = req.body.nation;
  let sex = req.body.sex;
  let phone = req.body.phone;
  let birth = req.body.birth;
  let profile_url = req.body.profile_url;
  let profile_text = req.body.profile_text;

  dbConnect(res).then((conn)=>{
    query(conn,res,
      `INSERT INTO users(login_id,password,email,name,nation,sex,phone,birth,profile_url,profile_text) VALUES(?,?,?,?,?,?,?,?,?,?)`,
      [
        login_id,
        password,
        email,
        name,
        nation,
        sex,
        phone,
        profile_url,
        profile_text
      ]
  ).then((result)=>{
      conn.release();
      res.json(SUCCESS);
    });
  });
});

router.post('/signin',(req,res)=>{
  let login_id = req.body.login_id;
  let password = req.body.password;

  dbConnect(res).then((conn)=>{
    query(conn,res,
      `SELECT * FROM users WHERE login_id =? AND password =?`,
      [
        login_id,
        password
      ]
    ).then((result)=>{
      console.log(login_id + ","+password+" 결과는? "+result.length);
      conn.release();
      if(result.length === 0){
        res.json(INVALID_REQUEST);
      }else{
        res.json(SUCCESS);
      };
    });
  });
});

router.get('/info/:user_id',(req,res)=>{
  let user_id = req.params.user_id;

  dbConnect(res).then((conn)=>{
    query(conn,res,
      `SELECT * FROM users WHERE user_id = ?`,
      [
        user_id
      ]
  ).then((result)=>{
    conn.release();
    if(result.length === 0){
      res.json(INVALID_REQUEST);
    }else{
      res.json(toRes(SUCCESS,{
        data : result
      }));
    };
    });
  });

});

router.post('/logout', (req, res) => {
    req.session.destroy(err => { if(err) throw err; });
    return res.json({ sucess: true });
});

export default router;
