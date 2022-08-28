import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor() {}

  async create(data: CreateUserDto): Promise<any> {
    return { user: data };
  }

  async read(id: number): Promise<any | null> {
    return { user: id };
  }

  async update(id: number, data: UpdateUserDto): Promise<any> {
    return { user: [id, data] };
  }

  async delete(id: number): Promise<void> {
    // delete user[id]
  }
}
