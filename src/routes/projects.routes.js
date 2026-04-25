import { Router } from 'express';
import * as projectsController from '../controllers/project.controller.js';
import authenticate from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', authenticate, projectsController.create);
router.get('/', authenticate, projectsController.getAll);
router.get('/:id', authenticate, projectsController.getOne);
router.put('/:id', authenticate, projectsController.update);
router.delete('/:id', authenticate, projectsController.remove);

export default router;
