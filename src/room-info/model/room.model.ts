import {
  Field,
  ObjectType,
  ID,
  Int,
  Float,
  registerEnumType,
} from '@nestjs/graphql';
import { Room_Facilities as ROOMSERVICE } from '@prisma/client';
import { Hotel } from 'src/hotel-info/model/hotel-info.model';

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
