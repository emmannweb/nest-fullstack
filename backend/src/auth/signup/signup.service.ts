import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SignupService {
  private readonly logger = new Logger(SignupService.name);
  constructor(private readonly userService: UserService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      //check if user already exist in DB
      const isUser = await this.userService.findByEmail(createUserDto.email);
      if (isUser) {
        throw new BadRequestException('Email already exist');
      }
      const hashPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = await this.userService.create({
        ...createUserDto,
        password: hashPassword,
      });
      const result = await user.save();
      return result;
    } catch (error) {
      this.logger.warn(error);
      throw error;
    }
  }
}
