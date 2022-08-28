const { env } = process;
export const config = {
  host: env.HOST,
  port: +env.PORT,
  prod: !!+env.PROD,
  database: {
    type: 'mysql',
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
  },
  secretKey: env.SECRET_KEY,
};
