import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCompanyProfileDto } from './dto/create-company-profile.dto';

@Controller('api/company')
@UseGuards(AuthGuard('jwt'))
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('profile')
  async getCompanyProfile(@Req() req) {
    return this.companyService.findCompanyProfile(req.user.email);
  }

  @Put('profile')
  async updateCompanyProfile(
    @Req() req,
    @Body() CreateCompanyProfile: CreateCompanyProfileDto,
  ) {
    console.log(CreateCompanyProfile);
    return this.companyService.updateCompanyProfile(CreateCompanyProfile, req.user.email);
  }
}
