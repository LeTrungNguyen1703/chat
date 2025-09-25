import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateParticipantDto {

  @IsInt({message: "user_id must be an integer"})
  @IsNotEmpty({message: "user_id is required"})
  @ApiProperty({ example: 1, description: 'ID of the user that joining the room' })
  user_id : number;

  @IsInt({message: "chat_room_id must be an integer"})
  @IsNotEmpty({message: "chat_room_id is required"})
  @ApiProperty({ example: 1, description: 'ID of the the room that user joining' })
  chat_room_id : number;
}
