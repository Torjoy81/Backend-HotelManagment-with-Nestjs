import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { CustomerEntity, CustomerInput } from './model/customer.model';

@Resolver((of) => CustomerEntity)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => CustomerEntity)
  async customer(@Args('id', { type: () => ID }) id: string) {
    return this.customerService.getCustomerById(id);
  }

  @Mutation(() => CustomerEntity)
  createCustomer(@Args('customer') customer: CustomerInput) {
    return this.customerService.createCustomer(customer);
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
