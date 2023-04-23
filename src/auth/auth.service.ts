import { Injectable } from '@nestjs/common';
import { LoginStudentDto } from './dto/login-student.dto';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly studentService: StudentService,
    ) {}

    async loginStudent(loginStudentDto : LoginStudentDto) {
        console.log(loginStudentDto);
        const student = await this.studentService.findOne(loginStudentDto.email);
        if (student && student.password === loginStudentDto.password) {
            console.log("student = ", student);
            return student;
        }
        console.log("no found");
        return null;
    }
}