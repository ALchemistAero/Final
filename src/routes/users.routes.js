import { Router } from 'express';
import * as usersController from '../controllers/users.controller.js';
import authenticate from '../middleware/auth.middleware.js';
import authorizeRoles from '../middleware/role.middleware.js';

const router = Router();

router.post('/', authenticate, authorizeRoles(['admin']), usersController.create);
router.get('/', authenticate, authorizeRoles(['admin']), usersController.getAll);
router.get('/:id', authenticate, usersController.getOne);
router.put('/:id', authenticate, usersController.update);
router.delete('/:id', authenticate, authorizeRoles(['admin']), usersController.remove);

export default router;
