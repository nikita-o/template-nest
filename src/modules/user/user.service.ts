import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from '../../database/repository/user.repository';
import { UtilService } from '../../common/utils/util.service';
import { User } from '../../database/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private userRep: UserRepository,
    private util: UtilService,
  ) {}

  async create(data: CreateUserDto): Promise<any> {
    data.password = this.util.getHash(data.password);
    await this.userRep.create({ ...data });
  }

  async read(user: Partial<User>): Promise<User> {
    return (await this.userRep.read({ ...user }))[0];
  }

  async update(id: string, data: UpdateUserDto): Promise<any> {
    if (data.password) {
      data.password = this.util.getHash(data.password);
    }
    await this.userRep.update({ id }, { ...data });
  }

  async delete(id: string): Promise<void> {
    await this.userRep.delete({ id });
  }
}
