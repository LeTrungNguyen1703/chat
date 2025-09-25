import { Injectable } from '@nestjs/common';
import { CreateChatRoomDto } from './dto/create-chat_room.dto';
import { UpdateChatRoomDto } from './dto/update-chat_room.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserChatCompoIdDto } from '../chat/dto/compotion-key.dto';

@Injectable()
export class ChatRoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createChatRoomDto: CreateChatRoomDto) {
    return this.prisma.chat_rooms.create({
      data: createChatRoomDto,
    });
  }

  async findAll() {
    return this.prisma.chat_rooms.findMany();
  }

  async findOne(id: number) {
    return this.prisma.chat_rooms.findUnique({ where: { id } });
  }

  async update(id: number, updateChatRoomDto: UpdateChatRoomDto) {
    const result = await this.prisma.chat_rooms.updateMany({
      where: { id },
      data: updateChatRoomDto,
    });
    if (result.count === 0) {
      throw new Error(`Chat room with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    return this.prisma.chat_rooms.delete({ where: { id } });
  }

}
