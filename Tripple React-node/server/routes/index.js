import express from 'express';
import account from './account';
import contents from './contents'
import openPrograms from './openPrograms'
const router = express.Router();



router.use('/account', account);
router.use('/contents', contents);
router.use('/openPrograms',openPrograms);

export default router;
