export interface JwtSign {
  access_token: string; // токен доступа
  refresh_token: string; // токен обновления токенов
}

export interface JwtPayload {
  sub: number; // id
  iat: number; // дата создания
  exp: number; // оставшееся время жизни
}
