// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const { env } = process;
export const config = () => ({
  host: env.HOST || 'localhost',
  port: +env.PORT || 3000,
  prod: !!+env.PROD || false,
  database: {
    type: 'postgres',
    host: env.DB_HOST || 'localhost',
    port: env.DB_PORT || 5432,
    username: env.DB_USER || 'postgres',
    password: env.DB_PASSWORD || 'postgres',
    database: env.DB_DATABASE || 'postgres',
  },
  secure: {
    refreshLifetime: +env.REFRESH_LIFETIME || 10e18,
    refreshLength: +env.REFRESH_LENGTH || 64,
    jwtLifetime: +env.JWT_LIFETIME || 3600,
    jwtSecret: env.JWT_SECRET || 'secret',
  },
});
