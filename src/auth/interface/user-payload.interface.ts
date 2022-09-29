// Можно тупо всего юзера отправлять
import { ERole } from '../../common/enums/role.enum';

export interface UserPayload {
  userId: string;
  username: string;
  roles: ERole[];
}
