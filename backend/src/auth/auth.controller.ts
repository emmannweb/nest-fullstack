import { SignoutService } from './signout/signout.service';
import { SigninService } from './signin/signin.service';
import { SignupService } from './signup/signup.service';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { LoginUserDto } from 'src/common/dto/login-dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signupService: SignupService,
    private readonly signinService: SigninService,
    private readonly signoutService: SignoutService,
  ) {}

  @Post('signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.signupService.create(createUserDto);
  }

  @Post('signin')
  loginUser(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.signinService.login(loginUserDto, res);
  }

  @Get('signout')
  loginOutUser(@Res({ passthrough: true }) res: Response) {
    return this.signoutService.logOut(res);
  }
}
