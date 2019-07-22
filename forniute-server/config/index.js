require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 9000,
  dbUser: process.env.DB_USER || 'root',
  dbPassword: process.env.DB_PASSWORD || 'secret',
  dbHost: process.env.DB_HOST || 'forniute',
  dbPort: process.env.DB_PORT || 3306,
  dbName: process.env.DB_NAME || 'forniute',
  
  authAdminUsername: process.env.AUTH_ADMIN_USERNAME,
  authAdminPassword: process.env.AUTH_ADMIN_PASSWORD,
  authAdminEmail: process.env.AUTH_ADMIN_EMAIL,
  authJwtSecret: process.env.AUTH_JWT_SECRET || 'secret',
  
}

module.exports = { config };