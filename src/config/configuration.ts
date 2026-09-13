export default () => ({
  app: {
    port: parseInt(process.env.APP_PORT ?? '8000', 10),
  },

  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '3306', 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '1h',
  },
  redis: {
    url: process.env.REDIS_URL
  }
});
