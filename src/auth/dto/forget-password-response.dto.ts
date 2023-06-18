import { ApiProperty } from '@nestjs/swagger';

export class ForgetPasswordResponseDto {
  @ApiProperty()
  token: string;
}
