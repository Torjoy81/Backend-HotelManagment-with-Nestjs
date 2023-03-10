import { Injectable } from '@nestjs/common';
import { Customer, Customer_Type } from '@prisma/client';
import { PrismaCliService } from 'src/prisma-cli/prisma-cli.service';
import * as argon from 'argon2';
import { CustomerInput } from './model/customer.model';
import { createWriteStream } from 'fs';
import { join } from 'path';

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
    const passHash = await argon.hash(customerObj.password, {
      memoryCost: 2 ** 16,
      hashLength: 50,
      timeCost: 20,
      parallelism: 5,
    });

    let imagePath = null;

    if (customerObj.image !== null) {
      const { createReadStream, filename } = await customerObj.image;

      createReadStream()
        .pipe(
          createWriteStream(join(process.cwd(), `./src/images/${filename}`)),
        )
        .on('finish', () => {
          imagePath = join(process.cwd(), `./src/images/${filename}`);
        })
        .on('error', (e) => console.log('Something is worng ' + e));
    }

    const user = await this.prisma.customer.create({
      data: {
        firstName: customerObj.firstName,
        lastName: customerObj.lastName,
        email: customerObj.email,
        phone: customerObj.phone,
        Hashedpassword: passHash,
        customer_status: Customer_Type.NORMAL,
        image: imagePath,
      },
    });

    return user;
  }

  async updateCustomer(Id: string, key: string, value: string) {
    const user = await this.prisma.customer.update({
      where: {
        id: Id,
      },
      data: {
        [key]: value,
      },
    });

    return user;
  }

  async customerEmailAuth(Email: string): Promise<Customer> | undefined {
    return this.prisma.customer.findUnique({
      where: {
        email: Email,
      },
    });
  }
}
