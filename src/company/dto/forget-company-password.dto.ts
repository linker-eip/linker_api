import { ApiProperty } from "@nestjs/swagger";

export class ForgetCompanyPasswordDto {
    @ApiProperty()
    email: string;
}