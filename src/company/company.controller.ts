import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCompanyProfileDto } from './dto/create-company-profile.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompanyProfileResponseDto } from './dto/company-profile-response.dto';
import { ForgetCompanyPasswordDto} from './dto/forget-company-password.dto';
import { ResetCompanyPasswordDto } from './dto/reset-company-password.dto';

@Controller('api/company')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('profile')
  @ApiOperation({
    description: 'Get company profile',
    summary: 'Get company profile',
  })
  @ApiResponse({
    status: 200,
    description: 'Get company profile',
    type: CompanyProfileResponseDto,
  })
  async getCompanyProfile(@Req() req) {
    return this.companyService.findCompanyProfile(req.user.email);
  }

  @Put('profile')
  @ApiOperation({
    description: 'Update company profile',
    summary: 'Update company profile',
  })
  @ApiResponse({
    status: 200,
    description: 'Update company profile',
    type: CompanyProfileResponseDto,
  })
  async updateCompanyProfile(
    @Req() req,
    @Body() CreateCompanyProfile: CreateCompanyProfileDto,
  ) {
    return this.companyService.updateCompanyProfile(
      CreateCompanyProfile,
      req.user.email,
    );
  }

  @Post('forgot-password')
  @ApiOperation({
    description: 'Forgot password',
    summary: 'Forgot password',
  })
  @ApiResponse({
    status: 200,
    description: 'Forgot password',
  })
  async forgotPassword(@Req() req, @Body() body: ForgetCompanyPasswordDto) {
    return this.companyService.generateResetPassword(body);
  }

  @Post('reset-password')
  @ApiOperation({
    description: 'Reset password',
    summary: 'Reset password',
  })
  @ApiResponse({
    status: 200,
    description: 'Reset password',
    type: CompanyProfileResponseDto,
  })
  async resetPassword(@Req() req, @Body() body: ResetCompanyPasswordDto) {
    return this.companyService.resetPassword(body);
  }
}
