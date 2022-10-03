import { DatabaseService } from '../database.service';
import { Entity } from '../helpers';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements Entity<User> {
  tableName = 'user';
  namesFields = {
    id: 'id',
    username: 'name',
    passwordHash: 'password_hash',
    role: 'role',
  };

  constructor(private db: DatabaseService) {}

  async create(entity: Partial<User>): Promise<void> {
    await this.db.create(this.tableName, entity, this.namesFields);
  }

  async read(entity: Partial<User>): Promise<User[]> {
    return await this.db.read(this.tableName, entity, this.namesFields);
  }

  async update(where: Partial<User>, entity: Partial<User>): Promise<void> {
    await this.db.update(this.tableName, where, entity, this.namesFields);
  }

  async delete(entity: Partial<User>): Promise<void> {
    await this.db.delete(this.tableName, entity, this.namesFields);
  }
}
