import {
  Resolver,
  Query,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { RoomInfoService } from 'src/room-info/room-info.service';
import { HotelInfoService } from './hotel-info.service';
import { Hotel } from './model/hotel-info.model';

@Resolver((of) => Hotel)
export class HotelInfoResolver {
  constructor(
    private readonly hotelInfoService: HotelInfoService,
    private readonly roomInfoService: RoomInfoService,
  ) {}

  @Query(() => Hotel)
  async hotel(@Args('id', { type: () => ID }) id: string) {
    return this.hotelInfoService.getHotelById(id);
  }
  @ResolveField()
  async rooms(@Parent() hotel: Hotel) {
    const { id } = hotel;
    const rooms = await this.roomInfoService.getRoomsWithHotel(id);

    return Object.values(rooms)[0];
  }
}
