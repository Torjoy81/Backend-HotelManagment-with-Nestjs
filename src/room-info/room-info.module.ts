import { Module } from '@nestjs/common';
import { RoomInfoService } from './room-info.service';
import { RoomInfoResolver } from './room-info.resolver';
import { HotelInfoService } from 'src/hotel-info/hotel-info.service';

@Module({
  providers: [RoomInfoResolver, RoomInfoService, HotelInfoService],
})
export class RoomInfoModule {}
