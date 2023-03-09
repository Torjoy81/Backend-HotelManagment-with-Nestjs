import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
  MaxLength,
  MinLength,
  ValidationArguments,
} from 'class-validator';
import { FileUpload } from '../dto/get-customer.args';

@ObjectType()
export class CustomerEntity {
  @Field((type) => ID)
  id: string;
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

@InputType()
export class CustomerInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @Field()
  @IsNotEmpty()
  @IsAlpha()
  @MinLength(3, {
    message: (args: ValidationArguments) => {
      if (args.value.length === 1) {
        return 'Too short, minimum length is 1 character';
      } else {
        return (
          'Too short, minimum length is ' + args.constraints[0] + ' characters'
        );
      }
    },
  })
  @MaxLength(30, {
    message: 'Name is too long',
  })
  firstName: string;
  @Field()
  @IsNotEmpty()
  @IsAlpha()
  @Length(3, 10)
  lastName: string;
  @Field()
  @IsNotEmpty()
  @Length(11, 13, {
    message: (args: ValidationArguments) => {
      if (args.value.length === 1) {
        return 'Too short, minimum length is 1 character';
      } else {
        return (
          'Too short, minimum length is ' + args.constraints[0] + ' characters'
        );
      }
    },
  })
  @Matches(/^(\+49|0)+[\d]{10}/g, {
    message: 'please start with +49 or 01',
  })
  phone: string;
  @Field((type) => GraphQLUpload, { nullable: true })
  @IsOptional()
  image?: Promise<FileUpload>;
  @Field()
  @IsNotEmpty()
  password: string;
}
