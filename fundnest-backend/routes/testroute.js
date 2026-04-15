import express from 'express';
import { testAPI } from '../controllers/testcontroller.js';

const router = express.Router();


router.get('/', testAPI);

export default router;