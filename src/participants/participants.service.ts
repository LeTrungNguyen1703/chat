import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { PrismaService } from '../prisma/prisma.service';
import { WsException } from '@nestjs/websockets';
import { ChatRoomsService } from '../chat_rooms/chat_rooms.service';

@Injectable()
export class ParticipantsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}


  async joinChatRoom(createParticipantDto: CreateParticipantDto) {
    try {
      return this.prisma.participants.create({
        data: createParticipantDto,
      });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new WsException(`User or Chat Room not found ${error.message}`);
      }
    }
  }

  async findAll() {
    return this.prisma.participants.findMany({});
  }

  async findOne(id: number) {
    return this.prisma.participants.findUnique({where: {id}})
  }

  async remove(id: number) {
    return this.prisma.participants.delete({where: {id}})
  }

}
