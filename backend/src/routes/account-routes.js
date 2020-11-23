const accountController = require('../controllers/account-controller');
const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', accountController.list);
router.get('/:id', accountController.read);
router.post('/', accountController.create);
router.patch('/', accountController.update);
router.delete('/:id', accountController.delete);

module.exports = router;
