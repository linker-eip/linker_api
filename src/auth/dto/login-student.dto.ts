import { ApiProperty } from "@nestjs/swagger";

export class LoginStudentDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}