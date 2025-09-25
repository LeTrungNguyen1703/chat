import { Module } from '@nestjs/common';
import { MessagesModule } from '../messages/messages.module';
import { ChatGateway } from './chat.gateway';
import { ChatRoomsModule } from '../chat_rooms/chat_rooms.module';

@Module({
  providers:[ChatGateway],
  imports: [MessagesModule, ChatRoomsModule],
  exports: [ChatGateway],
})
export class ChatModule {}
