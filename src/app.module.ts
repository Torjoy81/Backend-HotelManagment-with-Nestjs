import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaCliService } from './prisma-cli/prisma-cli.service';
import { PrismaCliModule } from './prisma-cli/prisma-cli.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { RoomInfoModule } from './room-info/room-info.module';
import { CustomerModule } from './customer/customer.module';
import { HotelInfoModule } from './hotel-info/hotel-info.module';

@Module({
  imports: [
    AuthModule,
    PrismaCliModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema/schema.gql'),
      sortSchema: true,
    }),
    RoomInfoModule,
    CustomerModule,
    HotelInfoModule,
  ],
  providers: [PrismaCliService],
})
export class AppModule {}
