import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HotelInfoModule } from './hotel_info/hotel_info.module';
import { PrismaCliService } from './prisma-cli/prisma-cli.service';
import { PrismaCliModule } from './prisma-cli/prisma-cli.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { RoomInfoModule } from './room-info/room-info.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    AuthModule,
    HotelInfoModule,
    PrismaCliModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema/schema.gql'),
      sortSchema: true,
    }),
    RoomInfoModule,
    CustomerModule,
  ],
  providers: [PrismaCliService],
})
export class AppModule {}
