import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyUser } from 'src/entity/CompanyUser.entity';
import { CompanyProfile } from 'src/entity/CompanyProfile.entity';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyUser, CompanyProfile]),
    MailModule,
  ],
  providers: [CompanyService],
  controllers: [CompanyController],
  exports: [CompanyService],
})
export class CompanyModule {}
