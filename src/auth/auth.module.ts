import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { StudentModule } from 'src/student/student.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [StudentModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService]
})
export class AuthModule {}
