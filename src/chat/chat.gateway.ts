import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateMessageDto } from '../messages/dto/create-message.dto';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuardWebSocket } from '../auth/auth-ws.guard';
import { MessagesService } from '../messages/messages.service';
import { CreateChatRoomDto } from '../chat_rooms/dto/create-chat_room.dto';
import { Socket } from 'socket.io';
import { ChatRoomsService } from '../chat_rooms/chat_rooms.service';
import { JwtPayload } from '../auth/interfaces/jwtPayload';
import { ParticipantsService } from '../participants/participants.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly participants: ParticipantsService,
  ) {}

  @WebSocketServer()
  server: Server;

  @UseGuards(AuthGuardWebSocket)
  async handleConnection(client: Socket) {
    const user: JwtPayload = client.data?.user;
    const roomUserJoined = await this.checkAndJoinRoom(user.sub);
    roomUserJoined.forEach((room) => {
      client.join(room.chat_room_id.toString());
      this.server.to(room.chat_room_id.toString()).emit('userConnected', {
        messages: `${user.username} connected to room ${room.chat_room_id}`,
      });
    });
  }

  @UseGuards(AuthGuardWebSocket)
  async handleDisconnect(client: Socket) {
    const user: JwtPayload = client.data?.user;
    const roomUserJoined = await this.checkAndJoinRoom(user.sub);
    roomUserJoined.forEach((room) => {
      this.server.to(room.chat_room_id.toString()).emit('userDisconnected', {
        messages: `${user.username} disconnected from room ${room.chat_room_id}`,
      });
    });
  }

  @UseGuards(AuthGuardWebSocket)
  @SubscribeMessage('newMessage')
  async handleMessage(client: any, payload: CreateMessageDto) {
    const user = client.data?.user;
    const user_id = user?.sub;

    const mes = await this.messagesService.create(payload, user_id);

    this.broadCastToRoom(mes.chat_room_id.toString(), 'messageCreated', mes);
  }

  broadCastToRoom(roomName: string, event: string, data: any) {
    this.server.to(roomName).emit(event, data);
  }

  private async checkAndJoinRoom(sub: number) {
    const rooms = await this.participants.findChatRoomsByUserId(sub);
    if (rooms === undefined || rooms.length === 0) {
      throw new WsException('User is not a participant in any chat room');
    }
    return rooms;
  }
}
