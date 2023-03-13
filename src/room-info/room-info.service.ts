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

  async getAllrooms(keys: string[]) {
    const obj = {};

    keys.forEach((value) => {
      obj[value] = true;
    });
    const result = await this.prisma.room.findMany({
      select: obj,
    });
    return result;
  }

  deleteTheRoom(ID: string): boolean {
    const deleteRoom = this.prisma.room.delete({
      where: {
        id: ID,
      },
    });
    if (deleteRoom) {
      console.log(deleteRoom);
      return true;
    } else {
      return false;
    }
  }

  async updateRoomInfo(ID, Obj_room_update) {
    const room = this.prisma.room.updateMany({
      where: {
        id: ID,
      },
      data: Obj_room_update,
    });
    return room;
  }
}
