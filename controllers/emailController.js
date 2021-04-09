const { ContactForm } = require('../models');
const { AppError, catchAsync, Email } = require('../utils');

exports.sendEmail = catchAsync(async (req, res, next) => {
  const newContact = await ContactForm.create(req.body);

  if (!newContact) {
    return next(
      new AppError(
        'There was an error with the provided information. Please try again later.',
        500
      )
    );
  }

  try {
    await new Email(
      newContact.name,
      newContact.email,
      newContact.message,
      newContact.website,
      newContact.email_to
    ).sendMessage();

    res.status(202).json({
      status: 'success',
      message: 'An email has been sent to the provided address!',
    });
  } catch (err) {
    return next(
      new AppError(
        'There was an error sending the provided email! Please try again later.',
        500
      )
    );
  }
});
