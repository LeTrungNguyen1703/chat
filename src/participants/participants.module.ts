import { Module } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';
import { ChatRoomsModule } from '../chat_rooms/chat_rooms.module';
import { ChatGateway } from '../chat/chat.gateway';

@Module({
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
  imports: [ChatGateway]
})
export class ParticipantsModule {}
