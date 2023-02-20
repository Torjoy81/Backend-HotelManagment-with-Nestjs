import { Module } from '@nestjs/common';
import { RoomInfoService } from './room-info.service';
import { RoomInfoResolver } from './room-info.resolver';

@Module({
  providers: [RoomInfoResolver, RoomInfoService]
})
export class RoomInfoModule {}
