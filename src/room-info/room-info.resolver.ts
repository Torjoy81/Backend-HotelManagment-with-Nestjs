import { Query, Resolver } from '@nestjs/graphql';
import { RoomInfoService } from './room-info.service';

@Resolver('RoomInfo')
export class RoomInfoResolver {
  // constructor(private readonly roomInfoService: RoomInfoService) {}
  @Query(() => String)
  hello() {
    return 'hello';
  }
}
