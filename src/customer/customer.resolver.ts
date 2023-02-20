import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Customer } from '@prisma/client';
import { CustomerService } from './customer.service';
import { CustomerEntity, CustomerInput } from './model/customer.model';

@Resolver('Customer')
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query((returns) => CustomerEntity)
  async customer(@Args('id', { type: () => ID }) id: string) {
    return this.customerService.getCustomerById(id);
  }

  @Mutation(() => CustomerEntity)
  createCustomer(@Args('customer') customer: CustomerInput) {
    return this.customerService.createCustomer(customer);
  }
}
