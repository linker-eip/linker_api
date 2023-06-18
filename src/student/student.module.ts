import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentUser } from './entity/StudentUser.entity';
import { StudentProfile } from './entity/StudentProfile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentUser, StudentProfile])],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
