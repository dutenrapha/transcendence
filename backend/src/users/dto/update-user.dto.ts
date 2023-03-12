import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { CreateUserDto } from "./create-user.dto";


export class UpdateUserDto extends PartialType(CreateUserDto) {
  readonly refreshToken?: string;

  @IsBoolean()
  readonly mfa_enabled?: boolean;

  @IsOptional()
  readonly picture?: string;
}
