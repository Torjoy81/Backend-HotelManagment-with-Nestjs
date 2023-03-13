import {
  Field,
  ObjectType,
  ID,
  Int,
  Float,
  registerEnumType,
  InputType,
} from '@nestjs/graphql';
import { Room_Facilities as ROOMSERVICE } from '@prisma/client';
import { Hotel } from 'src/hotel-info/model/hotel-info.model';
import { IsOptional } from 'class-validator';

registerEnumType(ROOMSERVICE, {
  name: 'ROOMSERVICE',
});

@ObjectType()
export class Room {
  @Field((type) => ID)
  id: string;
  @Field()
  room_type: string;
  @Field((type) => Int)
  room_number: number;
  @Field()
  description: string;
  @Field((type) => [String], { nullable: true })
  imageUrl: string[];
  @Field((type) => Float)
  pricePerDay: number;
  @Field((type) => [ROOMSERVICE])
  room_service: ROOMSERVICE[];
  @Field((type) => ID)
  hotel_id: string;
  @Field((type) => Hotel)
  hotel_info: Hotel;
}

@InputType()
export class Room_updateInput {
  @Field()
  @IsOptional()
  room_type: string;
  @Field((type) => Int)
  @IsOptional()
  room_number: number;
  @Field()
  @IsOptional()
  description: string;
  @Field((type) => [String])
  @IsOptional()
  imageUrl: string[];
  @Field((type) => Float)
  @IsOptional()
  pricePerDay: number;
  @Field((type) => [ROOMSERVICE])
  @IsOptional()
  room_service: ROOMSERVICE[];
}
