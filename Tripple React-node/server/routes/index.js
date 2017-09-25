import express from 'express';
import account from './account';
import contents from './contents'
import programs from './programs'
import openPrograms from './openPrograms'

const router = express.Router();



router.use('/account', account);
router.use('/contents', contents);
router.use('/openPrograms',openPrograms);
router.use('/programs',programs);

export default router;
