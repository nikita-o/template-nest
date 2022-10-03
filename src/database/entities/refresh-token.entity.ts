import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class RefreshToken {
  @PrimaryColumn()
  public token!: string;

  @Column()
  public expDate!: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  public genDate!: Date;

  @OneToOne(() => User)
  @JoinColumn()
  public user!: User;
}
