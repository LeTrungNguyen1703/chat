import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @IsInt({ message: 'chat_room_id must be an integer' })
  @IsNotEmpty({ message: 'chat_room_id is required' })
  @ApiProperty({
    example: 1,
    description: 'ID of the chat room where the message is sent',
  })
  chat_room_id: number;

  @IsString({ message: 'content must be a string' })
  @IsNotEmpty({ message: 'content is required' })
  @ApiProperty({
    example: 'Hello, how are you?',
    description: 'Content of the message',
  })
  content: string;
}
