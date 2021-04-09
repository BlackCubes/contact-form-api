const mongoose = require('mongoose');
const validator = require('validator');

const contactformSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name!'],
    minlength: [2, 'Please enter a name with a minimum of 2 characters!'],
    maxlength: [70, 'Please enter a name less than or equal to 70 characters!'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email!'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email!'],
  },
  message: {
    type: String,
    required: [true, 'A meesage is required!'],
    minlength: [20, 'A message must have a minimum of 20 characters'],
    maxlength: [280, 'A message must be less than or equal to 280 characters!'],
  },
  email_to: {
    type: String,
    required: [true, 'Please enter an email to send!'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email!'],
  },
  website: {
    type: String,
    required: [true, 'A website is required!'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// STATIC METHODS
// -- find query in DB
contactformSchema.statics.valueExists = function (query) {
  return this.findOne(query).then((res) => res);
};

const ContactForm = mongoose.model('ContactForm', contactformSchema);

module.exports = ContactForm;
