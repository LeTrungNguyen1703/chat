import { Module } from '@nestjs/common';
import { ChatRoomsService } from './chat_rooms.service';
import { ChatRoomsController } from './chat_rooms.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ChatRoomsController],
  providers: [ChatRoomsService],
  exports: [ChatRoomsService],
})
export class ChatRoomsModule {}
