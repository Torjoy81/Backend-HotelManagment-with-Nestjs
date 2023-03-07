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
import { RolesGuard } from 'src/auth/gqlauth.guard';
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
  @UseGuards(RolesGuard)
  async room(
    @Args('id', { type: () => ID }) id: string,
    @Context('auth') auth: any,
  ) {
    console.log('Context' + auth);

    return this.roomInfoService.getRoomById(id);
  }

  @ResolveField()
  async hotel_info(@Parent() room: Room) {
    const { hotel_id } = room;
    return this.hotelInfoService.getHotelById(hotel_id);
  }
}
