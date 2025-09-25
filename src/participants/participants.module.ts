import { Module } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';
import { ChatRoomsModule } from '../chat_rooms/chat_rooms.module';
import { ChatGateway } from '../chat/chat.gateway';
import { ChatModule } from '../chat/chat.module';

@Module({
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
  exports: [ParticipantsService],
})
export class ParticipantsModule {}
