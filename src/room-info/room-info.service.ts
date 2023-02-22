import { Injectable } from '@nestjs/common';
import { identity } from 'rxjs';
import { PrismaCliService } from 'src/prisma-cli/prisma-cli.service';

@Injectable()
export class RoomInfoService {
  constructor(private prisma: PrismaCliService) {}

  async getRoomById(ID: string) {
    const result = await this.prisma.room.findUnique({
      where: {
        id: ID,
      },
    });
    return result;
  }

  async getRoomsWithHotel(ID: string) {
    const result = await this.prisma.hotel.findUnique({
      where: {
        id: ID,
      },
      select: {
        rooms: true,
      },
    });

    return result;
  }
}
