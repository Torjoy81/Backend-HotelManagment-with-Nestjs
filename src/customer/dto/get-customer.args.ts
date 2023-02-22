import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@ArgsType()
export class getCustomerArgs {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @Field()
  @IsNotEmpty()
  firstName: String;
  @Field()
  @IsNotEmpty()
  lastName: String;
  @Field()
  @IsNotEmpty()
  phone: String;
  @Field((type) => String, { nullable: true })
  image?: String | null;
  @Field()
  @IsNotEmpty()
  password: String;
}
