const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const userAgent = require('express-useragent');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');

const app = express();

// Proxy
app.enable('trust proxy');

// Implement CORS
app.use(cors());
app.options('*', cors());

// GLOBALE MIDDLEWARES
// Helmet -- set security HTTP headers
app.use(helmet());

// Morgan --  development logging
if (process.env.NODE_EN === 'development') {
  app.use(morgan('dev'));
}

// Express-Rate-Limit -- limit requests from some API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: {
    status: 'fail',
    message: 'Too many requests from this IP 😮. Please try again in an hour.',
  },
});
app.use('/api', limiter);

// Expose User-Agent
app.use(userAgent.express());

// Body Parser -- reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));

// Data Sanitization
// --- against NoSQL query injection
app.use(mongoSanitize());

// -- against XSS
app.use(xss());

// Compression
app.use(compression());

module.exports = app;
