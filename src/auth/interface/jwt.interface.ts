import { ERole } from '../../common/enums/role.enum';

export interface JwtPayload {
  sub: string; // id
  roles: ERole[];
  // iat и exp сами генерируются
  // iat: number; // дата создания
  // exp: number; // оставшееся время жизни
}
