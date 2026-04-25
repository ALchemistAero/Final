import { Router } from 'express';
import * as commentsController from '../controllers/comments.controller.js';
import authenticate from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', authenticate, commentsController.create);
router.get('/', authenticate, commentsController.getAll);
router.get('/:id', authenticate, commentsController.getOne);
router.put('/:id', authenticate, commentsController.update);
router.delete('/:id', authenticate, commentsController.remove);

export default router;
