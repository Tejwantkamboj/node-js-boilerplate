import crypto from 'crypto';

const generateOtp = () => {
  return crypto.randomInt(100000, 999999);
};

export default {
  generateAuthTokens,
  generateOtp,
};
