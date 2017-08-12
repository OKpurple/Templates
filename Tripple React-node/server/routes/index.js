import express from 'express';
import account from './account';
import contents from './contents'
const router = express.Router();



router.use('/account', account);
router.use('/contents', contents);

export default router;
