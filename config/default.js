module.exports = {
  mongoURL: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: 3600 * 24, // 24 hours
  bcryptSalt: 10,
  port: process.env.PORT || 8000
};
