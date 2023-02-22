import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';
import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  Length,
  Matches,
  MaxLength,
  MinLength,
  ValidationArguments,
} from 'class-validator';

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
  @Field((type) => String, { nullable: true })
  @IsOptional()
  image?: string | null;
  @Field()
  @IsNotEmpty()
  password: string;
}
