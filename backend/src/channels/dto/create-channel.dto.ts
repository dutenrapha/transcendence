import { IsOptional, IsString, IsInt, IsArray, IsEnum } from 'class-validator';

import { ChannelType } from '../entities/channel.entity'

export class CreateChannelDto {
  @IsString()
  readonly channelName: string;

  @IsEnum(ChannelType)
  readonly channelType: number;


  @IsString()
  @IsOptional()
  readonly password?: string | null;

  @IsString()
  readonly channelOwner: string;

  @IsArray()
  channelAdmins: string[];

}
