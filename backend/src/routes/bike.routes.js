import express from 'express';
import {
  createBike,
  getAllBikes,
  getBikeById,
  updateBikeById,
  deleteBikeById
} from '../controllers/bike.controller.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

router.post('/', asyncHandler(createBike));
router.get('/', asyncHandler(getAllBikes));
router.get('/:id', asyncHandler(getBikeById));
router.put('/:id', asyncHandler(updateBikeById));
router.delete('/:id', asyncHandler(deleteBikeById));

export default router;