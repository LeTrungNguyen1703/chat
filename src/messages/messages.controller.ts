import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtPayload } from '../auth/interfaces/jwtPayload';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a new message' })
  @ApiResponse({
    status: 201,
    description: 'The message has been successfully created.',
    schema: {
      properties: {
        id: { type: 'number', example: 1 },
        content: { type: 'string', example: 'Hello, world!' },
        user_id: { type: 'number', example: 1 },
        chat_room_id: { type: 'number', example: 1 },
        created_at: {
          type: 'string',
          format: 'date-time',
          example: '2023-10-01T12:34:56Z',
        },
      },
    },
  })
  create(
    @Body() createMessageDto: CreateMessageDto,
    @Req() req: Request & { user: JwtPayload },
  ) {
    return this.messagesService.create(createMessageDto, req.user.sub);
  }

  @Get('/chat-room/:chat_room_id')
  @ApiParam({ name: 'chat_room_id', example: 1, type: Number })
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Get all messages in a chat room for the authenticated user',
  })
  @UseGuards(AuthGuard)
  findAll(
    @Req() req: Request & { user: JwtPayload },
    @Param('chat_room_id', ParseIntPipe) chat_room_id: number,
  ) {
    return this.messagesService.findAll({
      user_id: req.user.sub,
      chat_room_id,
    });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Message ID',
    type: Number,
  })
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get a specific message by ID' })
  @UseGuards(AuthGuard)
  findOne(
    @Req() req: Request & { user: JwtPayload },
    @Param('id', ParseIntPipe) message_id: number,
  ) {
    return this.messagesService.findOne({
      user_id: req.user.sub,
      message_id,
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete a message by ID' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Message ID to delete',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'The message has been successfully deleted.',
    schema: {
      properties: {
        message: {
          type: 'string',
          example: 'Message with ID 1 deleted successfully',
        },
      },
    },
  })
  remove(
    @Req() req: Request & { user: JwtPayload },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.messagesService.remove({
      user_id: req.user.sub,
      message_id: id,
    });
  }
}
