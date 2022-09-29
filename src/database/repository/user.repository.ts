import { DatabaseService } from '../database.service';
import { Entity } from '../helpers';
import { User } from '../entities/user.entity';

export class UserRepository implements Entity<User> {
  tableName = 'user';
  namesFields = {
    id: 'id',
    username: 'name',
    passwordHash: 'password_hash',
    role: 'role',
  };

  constructor(private db: DatabaseService) {}

  async create(entity: User) {
    await this.db.create(this.tableName, entity, this.namesFields);
  }
}
