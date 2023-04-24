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

@Controller('api/student')
@ApiTags('Student AUTH')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
    const student = await this.authService.loginStudent(loginStudentDto);
    if (!student) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return student;
  }
}