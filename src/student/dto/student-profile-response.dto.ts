import { ApiProperty } from '@nestjs/swagger';

export class StudentProfileResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  studies: string;

  @ApiProperty()
  skills: string;

  @ApiProperty()
  website: string;
}
