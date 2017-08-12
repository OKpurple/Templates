import express from 'express';
import { DB_ERROR, SUCCESS, INVALID_REQUEST, SERVER_ERROR,dbConnect,query,toRes} from '../utils';

const router = express.Router();

router.post('/',(req,res)=>{
  dbConnect(res).then((conn)=>{
    query(conn,res,
      ``,
      [

      ]
    ).then((result)=>{

    });
  });
});




router.get('/',(req,res)=>{
  dbConnect(res).then((conn)=>{
    query(conn,res,
      ``,
      [

      ]
    ).then((result)=>{

    });
  });
});

export default router;
