import {
  Args,
  Context,
  ID,
  Info,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { HotelInfoService } from 'src/hotel-info/hotel-info.service';
import { Room, Room_updateInput } from './model/room.model';
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

  @Query(() => [Room])
  async rooms(@Info() info) {
    let keys = info.fieldNodes[0].selectionSet.selections.map(
      (item) => item.name.value,
    );

    return this.roomInfoService.getAllrooms(keys);
  }

  @Mutation(() => Boolean)
  async deleteRoom(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.roomInfoService.deleteTheRoom(id);
  }

  @Mutation(() => Room)
  update_room_info(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateRoomInfo')
    updateRoom: Room_updateInput,
  ) {
    return this.roomInfoService.updateRoomInfo(id, updateRoom);
  }
}
