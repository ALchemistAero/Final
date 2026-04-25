const router = require('express').Router();
const controller = require('../controllers/users.controller');
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');

router.post('/', auth, role(['admin']), controller.create);

router.get('/', auth, role(['admin']), controller.getAll);

router.get('/:id', auth, controller.getOne);

router.put('/:id', auth, controller.update);

router.delete('/:id', auth, role(['admin']), controller.remove);

module.exports = router;