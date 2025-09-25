import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateMessageDto } from '../messages/dto/create-message.dto';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuardWebSocket } from '../auth/auth-ws.guard';
import { MessagesService } from '../messages/messages.service';
import { CreateChatRoomDto } from '../chat_rooms/dto/create-chat_room.dto';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly messagesService: MessagesService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log('Client connected', client.id);
    this.server.emit('userConnected', {
      messages: `Welcome to the chat`,
    });
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected', client.id);
    this.server.emit('userDisconnected', {
      messages: `User disconnected`,
    });
  }

  broadCastToRoom(roomName: string, event: string, data: any) {
    this.server.to(roomName).emit(event, data);
  }

  @UseGuards(AuthGuardWebSocket)
  @SubscribeMessage('newMessage')
  async handleMessage(client: any, payload: CreateMessageDto) {
    const user = client.data?.user || client.handshake?.user;
    const user_id = user?.sub;

    const mes = await this.messagesService.create(payload, user_id);
    const roomId = `chatRoom-${mes.chat_room_id}`;

    this.broadCastToRoom(roomId, 'messageCreated', mes);
  }
}
