import { Module } from '@nestjs/common';
import { SigninService } from './signin/signin.service';
import { SignupService } from './signup/signup.service';
import { SignoutService } from './signout/signout.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [SigninService, SignupService, SignoutService],
  controllers: [AuthController],
})
export class AuthModule {}
