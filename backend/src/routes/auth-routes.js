const authController = require('../controllers/auth-controller');
const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/register', authController.register);
router.post('/signin', authController.signin);
router.get('/me', authController.me);
router.patch('/me', authController.update);

module.exports = router;
