import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsDefined, MinLength, Matches } from "class-validator";

export class RegisterCompanyDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    @MinLength(8)
    @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: 'Too weak password',
      })
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    phoneNumber: string;
}