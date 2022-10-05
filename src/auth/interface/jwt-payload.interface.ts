import { ERole } from '../../common/enums/role.enum';

export interface JwtPayload {
  sub: string; // id user
  role: ERole;
}
