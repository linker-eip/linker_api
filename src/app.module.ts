import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './passport/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),
            TypeOrmModule.forRoot(dataSourceOptions),
            JwtModule.register({
              secret: process.env.JWT_SECRET,
              signOptions: { expiresIn: '1d' }
            }),
            ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
