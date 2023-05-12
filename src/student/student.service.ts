import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentUser } from 'src/entity/StudentUser.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(StudentUser)
        private studentRepository: Repository<StudentUser>,
    ) {}

    async findAll(): Promise<StudentUser[]> {
        return this.studentRepository.find();
    }

    async findOne(email: string): Promise<StudentUser | undefined> {
        return this.studentRepository.findOne({where: {email}});
    }

    async save(student: StudentUser): Promise<StudentUser> {
        return this.studentRepository.save(student);
    }
}
