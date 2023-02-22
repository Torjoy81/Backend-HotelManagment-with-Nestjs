import { Injectable } from '@nestjs/common';
import { PrismaCliService } from 'src/prisma-cli/prisma-cli.service';

@Injectable()
export class HotelInfoService {
  constructor(private prisma: PrismaCliService) {}
  async getHotelById(ID: string) {
    const result = await this.prisma.hotel.findUnique({
      where: {
        id: ID,
      },
    });
    return result;
  }

   
}
