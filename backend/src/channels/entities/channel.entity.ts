import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ChannelType {
  PUB = 'public',
  PVT = 'private',
  PWD = 'password'
}

@Entity('channels')
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  channelName: string;

 @Column({
    type: 'enum',
    enum: ChannelType,
    default: ChannelType.PUB
  })
  channelType: number;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true} )
  channelOwner: string;

  @Column("text", {array: true, nullable: true})
  channelAdmins: string[];

}
