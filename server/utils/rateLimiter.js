const rateLimit = require('express-rate-limit');

// USE store FOR MULTIPLE SERVER PURPOSES
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
});

module.exports = limiter;