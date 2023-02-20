import { Global, Module } from '@nestjs/common';
import { PrismaCliService } from './prisma-cli.service';

@Global()
@Module({
  providers: [PrismaCliService],
  exports: [PrismaCliService],
})
export class PrismaCliModule {}
