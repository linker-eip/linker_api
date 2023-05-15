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
import { LoginCompanyDto } from './dto/login-company.dto';
import { LoginCompanyResponseDto } from './dto/login-company-response.dto';
import { RegisterCompanyResponseDto } from './dto/register-company-response.dto';
import { RegisterCompanyDto } from './dto/register-company.dto';

@Controller('api/auth')
@ApiTags('AUTH')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('student/register')
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
    const res = await this.authService.registerStudent(registerStudentDto);
    if (!res.token) {
      throw new HttpException('Invalid informations', HttpStatus.UNAUTHORIZED);
    }
    return res;
  }

  @Post('company/register')
  @ApiOperation({
    description: 'Company register',
    summary: 'Allow a company to create an account',
  })
  @ApiResponse({
    status: 200,
    description: 'Company registered',
    type: RegisterCompanyResponseDto,
  })
  async registerCompany(@Body() registerCompanyDto: RegisterCompanyDto) {
    const res = await this.authService.registerCompany(registerCompanyDto);
    if (!res.token) {
      throw new HttpException('Invalid informations', HttpStatus.UNAUTHORIZED);
    }
    return res;
  }

  @Post('student/login')
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

  @Post('company/login')
  @ApiOperation({
    description: 'Company login',
    summary: 'Company login',
  })
  @ApiResponse({
    status: 200,
    description: 'Company login',
    type: LoginCompanyResponseDto,
  })
  async loginCompany(@Body() loginCompanyDto: LoginCompanyDto) {
    const token = await this.authService.loginCompany(loginCompanyDto);
    if (!token) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return token;
  }
  
}