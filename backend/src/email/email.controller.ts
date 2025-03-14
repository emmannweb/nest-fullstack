import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  mailController(@Body() createEmailDto: CreateEmailDto) {
    return this.emailService.sendMail(createEmailDto);
  }
}
