import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
  //Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { UpdateUserDto } from '../common/dto/update-user.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { Request } from 'express';
import { TokenInterface } from 'src/common/interface/tokeninterface';
import { CurrentUser } from 'src/common/decorators/current-user-decorator';
import { User } from './entities/user.entity';
import { AdminGuard } from 'src/common/guard/admin.guard';

declare global {
  namespace Express {
    interface Request {
      user?: TokenInterface | null;
    }
  }
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AdminGuard)
  @Get('all')
  findAllUsers() {
    return this.userService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }

  @UseGuards(AuthGuard)
  @Get('/profile')
  async userProfile(@CurrentUser() user: TokenInterface) {
    const res = await this.userService.me(user?.id);
    return res;
  }
}
