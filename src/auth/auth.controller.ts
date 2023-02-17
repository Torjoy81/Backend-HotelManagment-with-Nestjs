import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

type Register = {
  name: string;
  email: string;
  password: string;
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: Register) {
    console.log(dto);

    return { ...dto };
  }
}
