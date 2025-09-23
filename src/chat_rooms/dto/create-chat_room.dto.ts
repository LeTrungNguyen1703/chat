import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChatRoomDto {
  @ApiProperty({ example: 'General', description: 'Name of the chat room' })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty()
  name: string;
}
