import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentProfileResponseDto } from './dto/student-profile-response.dto';
import { StudentProfile } from './entity/StudentProfile.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentUser } from './entity/StudentUser.entity';
import { CreateStudentProfileDto } from './dto/create-student-profile.dto';

describe('StudentController', () => {
  let controller: StudentController;
  let studentService: StudentService;

  const user = new StudentUser();
  user.email = 'test@example.com';
  user.password = 'Password123!'


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [StudentService, {
        provide: getRepositoryToken(StudentProfile),
        useClass: Repository
      },{
        provide: getRepositoryToken(StudentUser),
        useClass: Repository
      }],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    studentService = module.get<StudentService>(StudentService);

  });

  describe('getStudentProfile', () => {
    it('should return student profile', async () => {
      const studentProfile = new StudentProfile()

      jest.spyOn(studentService, 'findStudentProfile').mockResolvedValue(studentProfile);

      const req = { email: 'john@example.com' };

      const response = await controller.getStudentProfile(req);

      expect(studentService.findStudentProfile).toHaveBeenCalledWith(req.email);
      expect(response).toEqual(studentProfile);
    });

    it('should throw error when student profile is not found', async () => {
      jest.spyOn(studentService, 'findStudentProfile').mockRejectedValue(new Error('Could not find student profile'));

      const req = { email: 'john@example.com' };

      await expect(controller.getStudentProfile(req)).rejects.toThrowError('Could not find student profile');
      expect(studentService.findStudentProfile).toHaveBeenCalledWith(req.email);
    });
  });

  describe('updateStudentProfile', () => {
    it('should update the student profile and return the updated profile', async () => {
      const createProfileDto: CreateStudentProfileDto = {
        name: 'John Doe',
        description: 'Student profile',
        email: 'test@example.com',
        phone: '1234567890',
        location: 'New York',
        studies: 'Computer Science',
        skills: 'JavaScript, TypeScript',
        website: 'example.com',
      };

      const expectedProfile = new StudentProfile
      ()

      jest.spyOn(studentService, 'updateStudentProfile').mockResolvedValue(expectedProfile);

      const req = { email: 'test@example.com' };

      const response = await controller.updateStudentProfile(req, createProfileDto);

      expect(studentService.updateStudentProfile).toHaveBeenCalledWith(createProfileDto, req);
      expect(response).toEqual(expectedProfile);
    });

    it('should throw an error if student profile is not found', async () => {
      const createProfileDto: CreateStudentProfileDto = {
        name: 'John Doe',
        description: 'Student profile',
        email: 'test@example.com',
        phone: '1234567890',
        location: 'New York',
        studies: 'Computer Science',
        skills: 'JavaScript, TypeScript',
        website: 'example.com',
      };

      jest.spyOn(studentService, 'updateStudentProfile').mockRejectedValue(new Error('Could not find student profile'));

      const req = { email: 'test@example.com' };

      await expect(controller.updateStudentProfile(req, createProfileDto)).rejects.toThrowError(
        'Could not find student profile',
      );

      expect(studentService.updateStudentProfile).toHaveBeenCalledWith(createProfileDto, req);
    });
  });
});
