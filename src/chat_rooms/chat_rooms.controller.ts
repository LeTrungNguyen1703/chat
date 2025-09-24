import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatRoomsService } from './chat_rooms.service';
import { CreateChatRoomDto } from './dto/create-chat_room.dto';
import { UpdateChatRoomDto } from './dto/update-chat_room.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Chat Rooms')
@Controller('chat-rooms')
export class ChatRoomsController {
  constructor(private readonly chatRoomsService: ChatRoomsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a chat room' })
  @ApiBody({ type: CreateChatRoomDto })
  @ApiResponse({ status: 201, description: 'The chat room has been created.', schema: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      name: { type: 'string', example: 'General' },
      messages: { type: 'array', example: 'A message of chat' },
      participants: { type: 'array', example: 'A participant of chat' },
      createdAt: { type: 'string', format: 'date-time', example: '2023-01-01T00:00:00.000Z' },
      updatedAt: { type: 'string', format: 'date-time', example: '2023-01-01T00:00:00.000Z' },
    },
    } })
  create(@Body() createChatRoomDto: CreateChatRoomDto) {
    return this.chatRoomsService.create(createChatRoomDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all chat rooms' })
  @ApiResponse({ status: 200, description: 'List of chat rooms.' })
  findAll() {
    return this.chatRoomsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a chat room by id' })
  @ApiResponse({ status: 200, description: 'Chat room details.' })
  findOne(@Param('id') id: string) {
    return this.chatRoomsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a chat room' })
  @ApiResponse({ status: 200, description: 'Updated chat room.' })
  update(@Param('id') id: string, @Body() updateChatRoomDto: UpdateChatRoomDto) {
    return this.chatRoomsService.update(+id, updateChatRoomDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a chat room' })
  @ApiResponse({ status: 200, description: 'Deleted chat room.' })
  remove(@Param('id') id: string) {
    return this.chatRoomsService.remove(+id);
  }
}
