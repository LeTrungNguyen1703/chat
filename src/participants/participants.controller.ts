import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtPayload } from '../auth/interfaces/jwtPayload';
import { ChatGateway } from '../chat/chat.gateway';

@Controller('participants')
export class ParticipantsController {
  constructor(
    private readonly participantsService: ParticipantsService,
    private readonly chatGateWay: ChatGateway,
  ) {}

  @Post('/:chatRoomId/join')
  @UseGuards(AuthGuard)
  async create(
    @Req() req: Request & { user: JwtPayload },
    @Param('chatRoomId', ParseIntPipe) chatRoomId: number,
  ) {
    const participant = await this.participantsService.joinChatRoom({
      user_id: req.user.sub,
      chat_room_id: chatRoomId,
    });

    this.chatGateWay.broadCastToRoom(`chatRoom-${chatRoomId}`, 'userJoined', {
      message: `User ${req.user.username} has joined the chat`,
      participant,
    });

    return participant;
  }

  @Get()
  findAll() {
    return this.participantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participantsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participantsService.remove(+id);
  }
}
