import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UserIdAndChatRoomIdDto {
  @IsInt({ message: 'user_id must be an integer' })
  @IsNotEmpty({ message: 'user_id is required' })
  @ApiProperty({ example: 1, description: 'ID of the user' })
  @Type(() => Number)
  user_id: number;
  @IsInt({ message: 'chat_room_id must be an integer' })
  @IsNotEmpty({ message: 'chat_room_id is required' })
  @ApiProperty({ example: 1, description: 'ID of the chat room' })
  @Type(() => Number)
  chat_room_id: number;
}


export class UserIdAndMessageIdDto {
  @IsInt({ message: 'user_id must be an integer' })
  @IsNotEmpty({ message: 'user_id is required' })
  @ApiProperty({ example: 1, description: 'ID of the user' })
  @Type(() => Number)
  user_id: number;
  @IsInt({ message: 'message_id must be an integer' })
  @IsNotEmpty({ message: 'message_id is required' })
  @ApiProperty({ example: 1, description: 'ID of the message' })
  @Type(() => Number)
  message_id: number;
}