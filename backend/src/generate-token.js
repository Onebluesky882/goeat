const jwt = require('jsonwebtoken');

const payload = {
  id: 1,
  email: 'test@gmail.com',
};

const secret = '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';
const token = jwt.sign(payload, secret, { expiresIn: '1h' });
