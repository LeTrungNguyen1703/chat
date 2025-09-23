import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ParticipantsModule } from './participants/participants.module';
import { MessagesModule } from './messages/messages.module';
import { ChatRoomsModule } from './chat_rooms/chat_rooms.module';
import { ChatRoomsService } from './chat_rooms/chat_rooms.service';
import { ParticipantsService } from './participants/participants.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, ChatRoomsModule, MessagesModule, ParticipantsModule],
  controllers: [AppController],
  providers: [AppService, ParticipantsService, ChatRoomsService],
})
export class AppModule {}
