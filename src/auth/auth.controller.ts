import { Body, Controller, Post } from '@nestjs/common';
import { CustomerEmailAuth } from 'src/customer/dto/get-customer.args';
import { AuthService } from './auth.service';

type Register = {
  name: string;
  email: string;
  password: string;
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signup(@Body() dto: CustomerEmailAuth) {
    console.log(dto);

    const user = await this.authService.validateCustomer(
      dto.email,
      dto.password,
    );
    return this.authService.login(user);
  }
}
