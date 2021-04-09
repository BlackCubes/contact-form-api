const validator = require('./validate');

const { AppError, catchAsync } = require('../utils');

const errMsg = (errObj) => {
  let message = '';
  Object.values(errObj).forEach((err) => (message += `${err[0]} `));
  return message.slice(0, -1);
};

const givenValidation = (req, next, validationRule) =>
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return next(new AppError(`${errMsg(err.errors)}`, 400));
    }
    next();
  });

exports.sendEmail = catchAsync(async (req, res, next) => {
  const validationRule = {
    name: 'required|string|min:2|max:70|regexName',
    email: 'required|email',
    message: 'required|string|min:20|max:280',
    email_to: 'required|email',
    website: 'required|url',
  };

  givenValidation(req, next, validationRule);
});
