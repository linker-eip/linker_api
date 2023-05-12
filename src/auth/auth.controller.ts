import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginStudentDto } from './dto/login-student.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginStudentResponseDto } from './dto/login-student-response.dto';
import { RegisterStudentDto } from './dto/register-student.dto';

@Controller('api/student')
@ApiTags('Student AUTH')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    description: 'Student register',
    summary: 'Allow student to create an account',
  })
  @ApiResponse({
    status: 200,
    description: 'Student registered',
    type: LoginStudentResponseDto,
  })
  async registerStudent(@Body() registerStudentDto: RegisterStudentDto) {
    const token = await this.authService.registerStudent(registerStudentDto);
    if (!token) {
      throw new HttpException('Invalid informations', HttpStatus.UNAUTHORIZED);
    }
    return token;
  }

  @Post('login')
  @ApiOperation({
    description: 'Student login',
    summary: 'Student login',
  })
  @ApiResponse({
    status: 200,
    description: 'Student login',
    type: LoginStudentResponseDto,
  })
  async loginStudent(@Body() loginStudentDto: LoginStudentDto) {
    const token = await this.authService.loginStudent(loginStudentDto);
    if (!token) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return token;
  }
}