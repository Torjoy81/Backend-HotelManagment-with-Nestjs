import { Injectable } from '@nestjs/common';
import { Customer, Customer_Type } from '@prisma/client';
import { PrismaCliService } from 'src/prisma-cli/prisma-cli.service';
import { CustomerInput } from './model/customer.model';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaCliService) {}

  async getCustomerById(ID: string) {
    const result: Customer = await this.prisma.customer.findUnique({
      where: {
        id: ID,
      },
    });
    return result;
  }

  async createCustomer(customerObj: CustomerInput) {
    const user = await this.prisma.customer.create({
      data: {
        firstName: customerObj.firstName,
        lastName: customerObj.lastName,
        email: customerObj.email,
        phone: customerObj.phone,
        password: customerObj.password,
        customer_status: Customer_Type.NORMAL,
      },
    });
    return user;
  }
}
