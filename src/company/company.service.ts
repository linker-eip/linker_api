import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyProfile } from 'src/entity/CompanyProfile.entity';
import { CompanyUser } from 'src/entity/CompanyUser.entity';
import { Repository } from 'typeorm';
import { CreateCompanyProfileDto } from './dto/create-company-profile.dto';
import { ForgetCompanyPasswordDto } from './dto/forget-company-password.dto';
import { MailService } from 'src/mail/mail.service';
import { SendMailDto } from 'src/mail/dto/send-mail.dto';
import { ResetCompanyPasswordDto } from './dto/reset-company-password.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyUser)
    private companyRepository: Repository<CompanyUser>,
    @InjectRepository(CompanyProfile)
    private companyProfileRepository: Repository<CompanyProfile>,
    private readonly mailService: MailService,
  ) {}

  async findAll(): Promise<CompanyUser[]> {
    return this.companyRepository.find();
  }

  async save(company: CompanyUser): Promise<CompanyUser> {
    return this.companyRepository.save(company);
  }

  async findOne(email: string): Promise<CompanyUser | undefined> {
    return this.companyRepository.findOne({ where: { email } });
  }

  async findOneByPhoneNumber(
    phoneNumber: string,
  ): Promise<CompanyUser | undefined> {
    return this.companyRepository.findOne({ where: { phoneNumber } });
  }

  async CreateCompanyProfile(
    companyProfileDto: CreateCompanyProfileDto,
  ): Promise<CompanyProfile> {
    const CompanyProfileObj = new CompanyProfile();
    CompanyProfileObj.name = companyProfileDto.name;
    CompanyProfileObj.description = companyProfileDto.description;
    CompanyProfileObj.email = companyProfileDto.email;
    CompanyProfileObj.phone = companyProfileDto.phone;
    CompanyProfileObj.address = companyProfileDto.address;
    CompanyProfileObj.size = companyProfileDto.size;
    CompanyProfileObj.location = companyProfileDto.location;
    CompanyProfileObj.activity = companyProfileDto.activity;
    CompanyProfileObj.speciality = companyProfileDto.speciality;
    CompanyProfileObj.website = companyProfileDto.website;
    return this.companyProfileRepository.save(CompanyProfileObj);
  }

  async findCompanyProfile(email: string): Promise<CompanyProfile> {
    return this.companyProfileRepository.findOne({ where: { email } });
  }

  async updateCompanyProfile(
    CreateCompanyProfileDto: CreateCompanyProfileDto,
    email: string,
  ): Promise<CompanyProfile> {
    const companyProfile = await this.companyProfileRepository.findOne({
      where: { email: email },
    });
    companyProfile.name = CreateCompanyProfileDto.name;
    companyProfile.description = CreateCompanyProfileDto.description;
    companyProfile.email = CreateCompanyProfileDto.email;
    companyProfile.phone = CreateCompanyProfileDto.phone;
    companyProfile.address = CreateCompanyProfileDto.address;
    companyProfile.size = CreateCompanyProfileDto.size;
    companyProfile.location = CreateCompanyProfileDto.location;
    companyProfile.activity = CreateCompanyProfileDto.activity;
    companyProfile.speciality = CreateCompanyProfileDto.speciality;
    companyProfile.website = CreateCompanyProfileDto.website;
    return this.companyProfileRepository.save(companyProfile);
  }

  async generateResetPassword(body: ForgetCompanyPasswordDto): Promise<String> {
    const company = await this.companyRepository.findOne({
      where: { email: body.email },
    });
    const randomString = [...Array(16)]
      .map(() => Math.random().toString(36)[2])
      .join('');
    company.resetPasswordToken = randomString;
    const emailBody =
      'Voici votre clé pour réinitialiser votre mot de passe : ' + randomString;
    const emailSubject = 'Réinitialisation de mot de passe';

    const sendMailDto = new SendMailDto();
    sendMailDto.to = company.email;
    sendMailDto.subject = emailSubject;
    sendMailDto.text = emailBody;
    this.mailService.sendMail(sendMailDto);
    await this.companyRepository.save(company);
    return company.resetPasswordToken;
  }

  async resetPassword(body: ResetCompanyPasswordDto): Promise<CompanyUser> {
    const company = await this.companyRepository.findOne({
      where: { resetPasswordToken: body.token },
    });
    if (!company) {
      throw new Error('Token invalide');
    }
    company.password = body.password;
    company.resetPasswordToken = null;
    return this.companyRepository.save(company);
  }
}
