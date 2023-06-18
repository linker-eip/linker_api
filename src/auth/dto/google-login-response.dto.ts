import { ApiProperty } from "@nestjs/swagger";

export class GoogleLoginDtoResponse {
  @ApiProperty()
  token: string;
}