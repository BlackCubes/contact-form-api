const express = require('express');

const { emailController } = require('../controllers');

const { validationController } = require('../validations');

const router = express.Router();

router.post(
  '/sendEmail',
  validationController.sendEmail,
  emailController.sendEmail
);

module.exports = router;
