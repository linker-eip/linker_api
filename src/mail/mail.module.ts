import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Module({
  providers: [
    {
      provide: 'MAILER_PROVIDER',
      useFactory: async () => {
        const nodemailer = require('nodemailer');
        return nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
          },
        });
      },
    },
    MailService,
  ],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
