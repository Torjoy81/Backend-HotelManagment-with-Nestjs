import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HotelInfoModule } from './hotel_info/hotel_info.module';

@Module({
  imports: [AuthModule, UsersModule, HotelInfoModule],
})
export class AppModule {}
