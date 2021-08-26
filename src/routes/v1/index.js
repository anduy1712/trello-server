import express from 'express';
import { HttpStatusCode } from '../../utilities/constants';
import { BoardRoutes } from './board.route';
import { CardRoutes } from './card.route';
import { ColumnRoutes } from './column.route';
const router = express.Router();

/**
 * GET V1 STATUS
 */
router.get('/status', (req, res) =>
  res.status(HttpStatusCode.OK).json({ status: 'OK!' })
);
//Boards API
router.use('/boards', BoardRoutes);
//Column API
router.use('/columns', ColumnRoutes);
//Card API
router.use('/cards', CardRoutes);
export const apiV1 = router;
