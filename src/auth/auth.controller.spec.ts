import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterStudentDto } from './dto/register-student.dto';
import { StudentService } from 'src/student/student.service';
import { JwtService } from '@nestjs/jwt';
import { CompanyService } from 'src/company/company.service';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { StudentUser } from 'src/student/entity/StudentUser.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StudentProfile } from 'src/student/entity/StudentProfile.entity';
import { CompanyUser } from 'src/entity/CompanyUser.entity';
import { CompanyProfile } from 'src/entity/CompanyProfile.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { RegisterCompanyDto } from './dto/register-company.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LoginStudentDto } from './dto/login-student.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let studentUserRepository: Repository<StudentUser>

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, StudentService, JwtService, CompanyService, MailService,
      {
        provide: getRepositoryToken(StudentUser),
        useClass: Repository,
      }, {
        provide: getRepositoryToken(StudentProfile),
        useClass: Repository
      }, {
        provide: getRepositoryToken(CompanyUser),
        useClass: Repository
      }, {
        provide: getRepositoryToken(CompanyProfile),
        useClass: Repository
      }, {
        provide: "MAILER_PROVIDER",
        useValue: "GMAIL"
      }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    studentUserRepository = module.get<Repository<StudentUser>>(getRepositoryToken(StudentUser));
  });

  describe('registerStudent', () => {
    it('should register a student and return the login response', async () => {
      const registerStudentDto: RegisterStudentDto = {
        email: 'test@example.com',
        password: 'Password123!',
        firstName: 'John',
        lastName: 'Doe',
      };

      const expectedResponse = {
        token: 'mocked_token',
      };

      jest.spyOn(authService, 'registerStudent').mockResolvedValueOnce(expectedResponse);

      const response = await controller.registerStudent(registerStudentDto);

      expect(authService.registerStudent).toHaveBeenCalledWith(registerStudentDto);
      expect(response).toEqual(expectedResponse);
    });
  });
  describe('loginStudent', () => {
    it('should login a student and return the login response', async () => {
      const registerStudentDto: RegisterStudentDto = {
        email: 'test@example.com',
        password: 'Password123!',
        firstName: 'John',
        lastName: 'Doe',
      };

      const loginStudentDto: LoginStudentDto = {
        email: 'test@example.com',
        password: 'Password123!',
      };

      const expectedResponse = {
        token: 'mocked_token',
      };

      jest.spyOn(authService, 'loginStudent').mockResolvedValueOnce(expectedResponse);

      const response = await controller.loginStudent(loginStudentDto);

      expect(authService.loginStudent).toHaveBeenCalledWith(loginStudentDto);
      expect(response).toEqual(response);
    });
  });
  describe('registerStudentFail', () => {
    it('should throw an error if registration fails', async () => {
      const registerStudentDto: RegisterStudentDto = {
        email: 'test@example.com',
        password: 'abc',
        firstName: 'John',
        lastName: 'Doe',
      };

      jest.spyOn(authService, 'registerStudent').mockRejectedValue(new Error('Registration failed'));

      await expect(controller.registerStudent(registerStudentDto)).rejects.toThrow();
    });
  });
  describe('registerCompany', () => {
    it('should register a company and return the login response', async () => {
      const registerCompanyDto: RegisterCompanyDto = {
        email: 'test@example.com',
        password: 'Password123!',
        name: 'Company Name',
        phoneNumber: '0612345678',
      };

      const expectedResponse = {
        token: 'mocked_token',
      };

      jest.spyOn(authService, 'registerCompany').mockResolvedValueOnce(expectedResponse);

      const response = await controller.registerCompany(registerCompanyDto);

      expect(authService.registerCompany).toHaveBeenCalledWith(registerCompanyDto);
      expect(response).toEqual(expectedResponse);
    });
  });
  describe('registerCompanyFail', () => {
    it('should throw an error if registration fails', async () => {
      const registerCompanyDto: RegisterCompanyDto = {
        email: 'test@example.com',
        password: 'abc',
        name: 'John',
        phoneNumber: '012345678'
      };

      jest.spyOn(authService, 'registerCompany').mockRejectedValue(new Error('Registration failed'));

      await expect(controller.registerCompany(registerCompanyDto)).rejects.toThrow();
    });
  });
  describe('resetPasswordStudent', () => {
    it('should allow a student to change password', async () => {
      const resetPassword: ResetPasswordDto = {
        token: 'xxx-xxx-xxx-xxx-xxx-xxx',
        password: 'Password123!'
      };

      const expectedResponse = {
        message: 'mocked_message',
      };

      jest.spyOn(authService, 'resetStudentPassword').mockResolvedValueOnce(expectedResponse);

      const response = await controller.resetPasswordStudent(resetPassword);

      expect(authService.resetStudentPassword).toHaveBeenCalledWith(resetPassword);
      expect(response).toEqual(expectedResponse);
    });
  });
  describe('resetPasswordCompany', () => {
    it('should allow a company to change password', async () => {
      const resetPassword: ResetPasswordDto = {
        token: 'xxx-xxx-xxx-xxx-xxx-xxx',
        password: 'Password123!'
      };
  
      const expectedResponse = {
        message: 'mocked_message',
      };
  
      jest.spyOn(authService, 'resetCompanyPassword').mockResolvedValueOnce(expectedResponse);
  
      const response = await controller.resetPassword(resetPassword);
  
      expect(authService.resetCompanyPassword).toHaveBeenCalledWith(resetPassword);
      expect(response).toEqual(expectedResponse);
    });
  });
});
