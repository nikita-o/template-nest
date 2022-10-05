import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';

export type RefreshTokenDocument = RefreshToken & Document;

@Schema()
export class RefreshToken {
  @Prop()
  token!: string;

  @Prop()
  expDate!: Date;

  @Prop()
  genDate!: Date;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  user!: User;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
