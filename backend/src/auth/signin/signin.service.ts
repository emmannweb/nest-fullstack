import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenInterface } from 'src/common/interface/tokeninterface';
import { LoginUserDto } from 'src/common/dto/login-dto';

@Injectable()
export class SigninService {
  private readonly logger = new Logger(SigninService.name);
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginUserDto, res: Response) {
    try {
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new BadRequestException('Invalid credentials!');
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new BadRequestException('Invalid credentials!');
      }

      const tokenPayload: TokenInterface = {
        id: user._id?.toString(),
        role: user?.role,
      };
      const token = this.jwtService.sign(tokenPayload);
      res
        .status(HttpStatus.OK)
        .cookie('token', token, {
          maxAge: parseInt(this.configService.getOrThrow('JWT_SECRET_EXP_MS')),
          httpOnly: true,
          secure: this.configService.get('NODE_ENV') === 'production',
        })
        .json({
          success: true,
          role: user.role,
        });
    } catch (error) {
      this.logger.warn(error?.response.message || error);
      throw new UnauthorizedException('Invalid credentials!');
    }
  }
}
