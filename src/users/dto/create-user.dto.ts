import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username is required' })
  @ApiProperty({ example: 'john_doe', description: 'The unique username of the user' })
  username: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email address' })
  @ApiProperty({ example: 'john@example.com', description: 'The email address of the user' })
  email: string;

  @IsString({ message: 'Password hash must be a string' })
  @IsNotEmpty({ message: 'Password hash is required' })
  @ApiProperty({ example: 'hashed_password', description: 'The hashed password of the user' })
  password_hash: string;

}
