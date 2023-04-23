import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginStudentDto } from './dto/login-student.dto';

@Controller('api/student')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('login')
    async loginStudent(@Body()loginStudentDto : LoginStudentDto) {
        return await this.authService.loginStudent(loginStudentDto);
    }
}