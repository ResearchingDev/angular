const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.SECRET_KEY;

function encryptId(userId) {
    const payload = { id: userId };
    const options = { expiresIn: '1h' }; // You can customize the expiration time
    return jwt.sign(payload, JWT_SECRET, options);
}

function decryptId(token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded.id; // Return the user ID from the decoded payload
    } catch (err) {
      throw new Error('Invalid or expired token');
    }
}

module.exports = { encryptId, decryptId };
