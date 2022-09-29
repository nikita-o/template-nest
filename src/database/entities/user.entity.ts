import { ERole } from '../../common/enums/role.enum';

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  role: ERole; // Пока что 1 роль
}
