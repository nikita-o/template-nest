// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const { env } = process;
export const config = () => ({
  host: env.HOST,
  port: +env.PORT,
  prod: !!+env.PROD,
  database: {
    type: 'mysql',
    host: env.DB_HOST,
    port: 1234,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: 'database',
  },
  secretKey: env.SECRET_KEY,
});
