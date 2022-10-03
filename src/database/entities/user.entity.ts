import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ERole } from '../../common/enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column()
  public username!: string;

  @Column()
  public passwordHash!: string;

  @Column({
    type: 'enum',
    enum: ERole,
  })
  public role!: ERole;
}
