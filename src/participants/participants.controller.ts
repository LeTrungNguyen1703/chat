import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { AuthGuard } from '../auth/auth.guard';
import { JwtPayload } from '../auth/interfaces/jwtPayload';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post('/:chatRoomId/join')
  @UseGuards(AuthGuard)
  async create(
    @Req() req: Request & { user: JwtPayload },
    @Param('chatRoomId', ParseIntPipe) chatRoomId: number,
  ) {
    return await this.participantsService.joinChatRoom({
      user_id: req.user.sub,
      chat_room_id: chatRoomId,
    });
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
