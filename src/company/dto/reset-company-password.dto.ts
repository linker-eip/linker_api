import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResetCompanyPasswordDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  @IsString()
  password: string;
}
