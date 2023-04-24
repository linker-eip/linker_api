import { Controller } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentUser } from 'src/entity/StudentUser.entity';
import { Get } from '@nestjs/common';

@Controller('api/student')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}
}
