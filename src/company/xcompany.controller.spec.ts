import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyProfileResponseDto } from './dto/company-profile-response.dto';
import { CreateCompanyProfileDto } from './dto/create-company-profile.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyProfile } from 'src/entity/CompanyProfile.entity';
import { CompanyUser } from 'src/entity/CompanyUser.entity';

describe('CompanyController', () => {
  let controller: CompanyController;
  let companyService: CompanyService;
  let companyProfileRepository: Repository<CompanyProfile>;
  let companyUserRepository: Repository<CompanyUser>;

  const user = new CompanyUser();
  user.email = 'test@example.com';
  user.password = 'Password123!';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(CompanyProfile),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(CompanyUser),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
    companyService = module.get<CompanyService>(CompanyService);
    companyProfileRepository = module.get<Repository<CompanyProfile>>(
      getRepositoryToken(CompanyProfile),
    );
    companyUserRepository = module.get<Repository<CompanyUser>>(
      getRepositoryToken(CompanyUser),
    );
  });

  describe('getCompanyProfile', () => {
    it('should return company profile', async () => {
      const companyProfile = new CompanyProfile();

      jest
        .spyOn(companyService, 'findCompanyProfile')
        .mockResolvedValue(companyProfile);

      const req = { user: { email: 'test@example.com' } };

      const response = await controller.getCompanyProfile(req);

      expect(companyService.findCompanyProfile).toHaveBeenCalledWith(
        req.user.email,
      );
      expect(response).toEqual(companyProfile);
    });
  });

  describe('updateCompanyProfile', () => {
    it('should update the company profile and return the updated profile', async () => {
      const createProfileDto: CreateCompanyProfileDto = {
        name: 'Test Company',
        description: 'Company profile',
        email: 'test@example.com',
        phone: '1234567890',
        address: '123 Main St',
        size: 100,
        location: 'New York',
        activity: 'IT',
        speciality: 'Web Development',
        website: 'example.com',
      };

      const expectedProfile = new CompanyProfile();

      jest
        .spyOn(companyService, 'updateCompanyProfile')
        .mockResolvedValue(expectedProfile);

      const req = { user: { email: 'test@example.com' } };

      const response = await controller.updateCompanyProfile(
        req,
        createProfileDto,
      );

      expect(companyService.updateCompanyProfile).toHaveBeenCalledWith(
        createProfileDto,
        req.user,
      );
      expect(response).toEqual(expectedProfile);
    });
  });
});
