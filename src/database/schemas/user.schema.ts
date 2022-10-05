import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ERole } from '../../common/enums/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username!: string;
  @Prop()
  passwordHash!: string;
  @Prop()
  role!: ERole;
}

export const UserSchema = SchemaFactory.createForClass(User);
