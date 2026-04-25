import { Router } from 'express';
import * as tasksController from '../controllers/tasks.controller.js';
import authenticate from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', authenticate, tasksController.create);
router.get('/', authenticate, tasksController.getAll);
router.get('/:id', authenticate, tasksController.getOne);
router.put('/:id', authenticate, tasksController.update);
router.delete('/:id', authenticate, tasksController.remove);

export default router;
