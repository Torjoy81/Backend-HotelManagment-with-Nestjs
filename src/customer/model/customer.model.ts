import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';

@ObjectType()
export class CustomerEntity {
  @Field((type) => ID)
  id: string;
  @Field()
  email: string;
  @Field()
  firstName: String;
  @Field()
  lastName: String;
  @Field()
  phone: String;
  @Field((type) => String, { nullable: true })
  image?: String | null;
  @Field()
  password: String;
}

@InputType()
export class CustomerInput {
  @Field((type) => ID, { nullable: true })
  id: string | null;
  @Field()
  email: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  phone: string;
  @Field((type) => String, { nullable: true })
  image?: string | null;
  @Field()
  password: string;
}
