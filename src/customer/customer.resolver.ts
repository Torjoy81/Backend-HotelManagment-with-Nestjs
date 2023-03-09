import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { CustomerEntity, CustomerInput } from './model/customer.model';
import { createWriteStream } from 'fs';

@Resolver((of) => CustomerEntity)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => CustomerEntity)
  async customer(@Args('id', { type: () => ID }) id: string) {
    return this.customerService.getCustomerById(id);
  }

  @Mutation(() => CustomerEntity)
  async createCustomer(@Args('customer') customer: CustomerInput) {
    const { createReadStream, filename } = await customer.image;

    console.log(customer.image);

    // return new Promise(async (resolve, reject) =>
    //   createReadStream().pipe(
    //     createWriteStream(join(process.cwd(), `./src/upload/${filename}`))
    //       .on('finish', () => resolve(true))
    //       .on('error', () => reject(false)),
    //   ),
    // );
    const cu1 = await this.customerService.createCustomer(customer);
    console.log(cu1);
    return {
      id: cu1.id,
    };
  }

  @Mutation(() => CustomerEntity)
  async updateCustomer(
    @Args('id', { type: () => ID }) id: string,
    @Args('key') key: string,
    @Args('value') value: string,
  ) {
    return this.customerService.updateCustomer(id, key, value);
  }
}
