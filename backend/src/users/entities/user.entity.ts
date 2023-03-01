import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  fullname: string;

  @Column({ nullable: true })
  enable2fa: boolean;

  @Column({ nullable: true })
  refreshToken?: string;

  @Column({ type: 'bytea', nullable: true })
  avatar: Uint8Array;

}
