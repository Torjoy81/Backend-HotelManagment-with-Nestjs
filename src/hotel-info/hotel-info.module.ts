import { Module } from '@nestjs/common';
import { HotelInfoService } from './hotel-info.service';
import { HotelInfoResolver } from './hotel-info.resolver';
import { RoomInfoService } from 'src/room-info/room-info.service';

@Module({
  providers: [HotelInfoResolver, HotelInfoService, RoomInfoService],
})
export class HotelInfoModule {}
