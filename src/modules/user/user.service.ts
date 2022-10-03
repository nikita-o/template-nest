import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../../database/entities/user.entity';
import { Repository } from 'typeorm';
import { ERole } from '../../common/enums/role.enum';
import { UtilService } from '../../common/utils/util.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repUser: Repository<User>,
    private util: UtilService,
  ) {}

  async create(data: CreateUserDto): Promise<any> {
    data.password = this.util.getHash(data.password);
    return await this.repUser.save({
      username: data.name,
      passwordHash: data.password,
      role: ERole.User,
    });
  }

  async read(id: string): Promise<any | null> {
    return await this.repUser.findBy({ id });
  }

  async update(id: string, data: UpdateUserDto): Promise<any> {
    if (data.password) {
      data.password = this.util.getHash(data.password);
    }
    return await this.repUser.update(id, {
      username: data.name,
      passwordHash: data.password,
    });
  }

  async delete(id: string): Promise<void> {
    await this.repUser.delete({ id });
  }
}
