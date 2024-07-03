import { Router } from 'express';
import { createBusiness, getAllBusinesses, getBusinessById, updateBusinessById, deleteBusinessById } from '../controllers/business.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route('/')
    .post(
        upload.single('profilePic'),
        createBusiness
    )
    .get(getAllBusinesses);

router.route('/:id')
    .get(getBusinessById)
    .put(upload.single('profilePic'), updateBusinessById)
    .delete(deleteBusinessById);

export default router;

