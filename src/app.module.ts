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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    ChatRoomsModule,
    MessagesModule,
    ParticipantsModule,
    ConfigModule.forRoot({
      isGlobal: true, // 🔑 để có thể inject ở mọi module mà không cần import lại
      envFilePath: '.env', // mặc định là .env, bạn có thể bỏ dòng này nếu file ở root
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ParticipantsService, ChatRoomsService],
})
export class AppModule {}
