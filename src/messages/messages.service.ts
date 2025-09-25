import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from '../prisma/prisma.service';
import {
  UserIdAndChatRoomIdDto,
  UserIdAndMessageIdDto,
} from './dto/compotion-key.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMessageDto: CreateMessageDto, user_id: number) {
    return this.prisma.messages.create({
      data: { ...createMessageDto, user_id },
    });
  }

  async findAll(dto: UserIdAndChatRoomIdDto) {
    const { user_id, chat_room_id } = dto;
    return this.prisma.messages.findMany({
      where: { user_id, chat_room_id },
    });
  }

  async findOne(dto: UserIdAndMessageIdDto) {
    const { user_id, message_id } = dto;

    const message = await this.prisma.messages.findUnique({
      where: { id: message_id },
    });

    if (!message) {
      throw new NotFoundException(`Message with ID ${message_id} not found`);
    }

    if (message.user_id !== user_id) {
      throw new UnauthorizedException('You do not have access to this message');
    }

    return message;
  }

  async remove(dto: UserIdAndMessageIdDto) {
    const { user_id, message_id } = dto;
    const message = await this.prisma.messages.findUnique({
      where: { id: message_id },
    });

    if (!message) {
      throw new NotFoundException(`Message with ID ${message_id} not found`);
    }

    if (message.user_id !== user_id) {
      throw new UnauthorizedException(
        'You do not have access to delete this message',
      );
    }

    const result = await this.prisma.messages.deleteMany({
      where: { id: message_id },
    });

    if (result.count === 0) {
      throw new NotFoundException(`Message with ID ${message_id} not found`);
    }

    return { message: `Message with ID ${message_id} deleted successfully` };
  }
}
