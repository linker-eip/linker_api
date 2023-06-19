import { Test, TestingModule } from '@nestjs/testing';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { SendMailDto } from './dto/send-mail.dto';

describe('MailController', () => {
  let controller: MailController;
  let mailService: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
      providers: [
        {
          provide: MailService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MailController>(MailController);
    mailService = module.get<MailService>(MailService);
  });

  describe('sendMail', () => {
    it('should call MailService sendMail method with the provided data', async () => {
      const sendMailDto: SendMailDto = {
        to: 'test@example.com',
        subject: 'Test Subject',
        text: 'Test Message',
      };

      await controller.sendMail(sendMailDto);

      expect(mailService.sendMail).toHaveBeenCalledWith(sendMailDto);
    });
  });
});
