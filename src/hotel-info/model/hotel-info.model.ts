import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql';
import {
  Hotel_Star as HOTELSTATUS,
  Hotel_Service as HOTELSERVICE,
} from '@prisma/client';
import { Room } from 'src/room-info/model/room.model';

registerEnumType(HOTELSTATUS, {
  name: 'HotelStatus',
});

registerEnumType(HOTELSERVICE, {
  name: 'HOTELSERVICE',
});

@ObjectType()
export class Hotel {
  @Field((type) => ID)
  id: string;
  @Field()
  hotel_name: string;
  @Field()
  address: string;
  @Field({ nullable: true })
  imageUrl: string | null;
  @Field((type) => HOTELSTATUS)
  HotelStatus: HOTELSTATUS;
  @Field((type) => [Room])
  rooms: Room[];
  @Field((type) => [HOTELSERVICE])
  hotel_facilities: HOTELSERVICE[];
}
