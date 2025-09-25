import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserChatCompoIdDto {
  @IsInt({ message: 'userId must be an integer' })
  @IsNotEmpty({ message: 'userId should not be empty' })
  @ApiProperty({ example: 1, description: 'ID of the user' })
  userId: number;

  @IsInt({ message: 'chatRoomId must be an integer' })
  @IsNotEmpty({ message: 'chatRoomId should not be empty' })
  @ApiProperty({ example: 1, description: 'ID of the chat room' })
  chatRoomId: number;
}
