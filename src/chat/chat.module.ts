import { Global, Module } from '@nestjs/common';
import { MessagesModule } from '../messages/messages.module';
import { ChatGateway } from './chat.gateway';
import { ChatRoomsModule } from '../chat_rooms/chat_rooms.module';
import { ParticipantsModule } from '../participants/participants.module';

@Module({
  providers:[ChatGateway],
  imports: [MessagesModule, ParticipantsModule],
  exports: [ChatGateway],
})
export class ChatModule {}
