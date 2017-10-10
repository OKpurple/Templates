import express from 'express';
import account from './account';
import reserve from './reserve'
import programs from './programs'
import openPrograms from './openPrograms'

const router = express.Router();



router.use('/account', account);
router.use('/reserve', reserve);
router.use('/openPrograms',openPrograms);
router.use('/programs',programs);

export default router;
