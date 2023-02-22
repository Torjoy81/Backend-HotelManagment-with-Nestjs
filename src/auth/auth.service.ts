import { Injectable } from '@nestjs/common';
import { CustomerService } from 'src/customer/customer.service';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { Customer } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: CustomerService,
    private readonly jwtService: JwtService,
    private cofig: ConfigService,
  ) {}
  async validateCustomer(email: string, password: string) {
    const user = await this.userService.customerEmailAuth(email);
    if (!user) {
      return null;
    }
    const passwordValid = await argon.verify(user.Hashedpassword, password);

    return passwordValid ? user : null;
  }

  login(user: Customer): { access_token: string } {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.cofig.get('JWT_SECRET'),
        expiresIn: '15m',
      }),
    };
  }

  async verfiyToken(token: string): Promise<Customer> {
    const decoded = this.jwtService.verify(token, {
      secret: this.cofig.get('JWT_SECRET'),
    });
    const user = await this.userService.customerEmailAuth(decoded.email);
    if (!user) {
      return null;
    }
    return user;
  }
}
