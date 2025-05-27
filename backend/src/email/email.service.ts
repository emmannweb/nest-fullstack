import { Injectable, Logger } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}

  private readonly logger = new Logger(EmailService.name);

  @OnEvent('order.created')
  sendMail(createEmailDto: CreateEmailDto) {
    this.logger.log('Sending email...', createEmailDto);

    const message = `Hi, we are processing your order. <br/> Total: $${createEmailDto?.total}, <br/> Date: ${createEmailDto?.date?.toString().substring(0, 10)}`;

    this.mailService.sendMail({
      from: 'Loja de roupas <lojaderoupa@gmail.com>',
      to: 'anitatest@gmail.com', //createEmailDto.email if there was email field
      subject: `Processamento de pedido`,
      html: message, // adding "createEmailDto" for products in the message here via template, etc
    });
  }
}
