import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Stream } from 'stream';

@ArgsType()
export class GetCustomerArgs {
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

export class CustomerEmailAuth {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}
