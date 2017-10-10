import express from 'express';
import { DB_ERROR, SUCCESS, INVALID_REQUEST, SERVER_ERROR,dbConnect,query,toRes} from '../utils';
import session from 'express-session';
const router = express.Router();

// router.post('/signup',(req,res)=>{
//   let login_id = req.body.login_id;
//   let password = req.body.login_id;
//   let email = req.body.email;
//   let nation = req.body.nation;
//   let sex = req.body.sex;
//   let phone = req.body.phone;
//   let birth = req.body.birth;
//   let profile_url = req.body.profile_url;
//   let profile_text = req.body.profile_text;
//
//   dbConnect(res).then((conn)=>{
//     query(conn,res,
//       `INSERT INTO users(login_id,password,email,name,nation,sex,phone,birth,profile_url,profile_text) VALUES(?,?,?,?,?,?,?,?,?,?)`,
//       [
//         login_id,
//         password,
//         email,
//         name,
//         nation,
//         sex,
//         phone,
//         profile_url,
//         profile_text
//       ]
//   ).then((result)=>{
//       conn.release();
//       res.json(SUCCESS);
//     });
//   });
// });

router.post('/signup',(req,res)=>{
  let login_id = req.body.loginId;
  let password = req.body.password;
  let firstName = req.body.firstName;
  let lastName =req.body.lastName;

  dbConnect(res).then((conn)=>{
    query(conn,res,
      `INSERT INTO users(login_id,password,firstName,lastName) VALUES(?,?,?,?)`,
      [
        login_id,
        password,
        firstName,
        lastName
      ]
  ).then((result)=>{
      query(conn,res,`SELECT * FROM users WHERE login_id=?`,[login_id]).then((re)=>{
        conn.release();
        res.json(toRes(SUCCESS,{
          data:{
            userId:re[0].user_id
          }
        }));
      })
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

        res.json(toRes(SUCCESS,{
          data : result[0]
        }));
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
        data : result[0]
      }));
    };
    });
  });

});

router.post('/logout', (req, res) => {
    req.session.destroy(err => { if(err) throw err; });
    return res.json({ sucess: true });
});

//updateProfile
router.put('/info/:user_id',(req,res)=>{

  let profile_text = req.body.profile_text;
  let user_id = req.params.user_id;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let phone = req.body.phone;
  let sex = req.body.sex;
  let languages = req.body.languages;
  let nation = req.body.nation;
  let birth = req.body.birth;

  dbConnect(res).then((conn)=>{
    query(conn,res,`
      UPDATE users
      SET firstName = ?, lastName = ?, email = ?, phone = ?, sex = ?, languages = ?, nation = ?, birth = ?, profile_text=?
      WHERE user_id = ?
      `,[firstName,
        lastName,
        email,
        phone,
        sex,
        languages,
        nation,
        birth,
        profile_text,
        user_id
      ]).then((result)=>{
        conn.release();
        res.json(SUCCESS);
      })
  })
})

export default router;
