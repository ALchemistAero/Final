const router = require('express').Router();
const controller = require('../controllers/tasks.controller');
const auth = require('../middleware/auth.middleware');

router.post('/', auth, controller.create);

router.get('/', auth, controller.getAll);

router.get('/:id', auth, controller.getOne);

router.put('/:id', auth, controller.update);

router.delete('/:id', auth, controller.remove);

module.exports = router;