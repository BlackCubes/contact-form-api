const express = require('express');

const { emailController } = require('../controllers');

const router = express.Router();

router.post('/sendEmail', emailController.sendEmail);

module.exports = router;
