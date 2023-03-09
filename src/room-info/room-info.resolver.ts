import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { HotelInfoService } from 'src/hotel-info/hotel-info.service';
import { Room } from './model/room.model';
import { RoomInfoService } from './room-info.service';

@Resolver((of) => Room)
export class RoomInfoResolver {
  constructor(
    private readonly roomInfoService: RoomInfoService,
    private readonly hotelInfoService: HotelInfoService,
  ) {}
  @Query(() => Room)
  async room(@Args('id', { type: () => ID }) id: string) {
    return this.roomInfoService.getRoomById(id);
  }

  @ResolveField()
  async hotel_info(@Parent() room: Room) {
    const { hotel_id } = room;
    return this.hotelInfoService.getHotelById(hotel_id);
  }
}
