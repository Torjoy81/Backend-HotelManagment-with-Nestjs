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
  async createCustomer(@Args('customer') customer: CustomerInput) {
    const cu1 = await this.customerService.createCustomer(customer);

    return cu1;
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
