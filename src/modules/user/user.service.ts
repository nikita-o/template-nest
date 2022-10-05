import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../database/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: CreateUserDto): Promise<User> {
    return this.userModel.create(data);
  }

  async read(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }

  async update(id: string, data: UpdateUserDto): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, data);
  }

  async delete(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id);
  }
}
