import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        username: { type: 'string', example: 'john_doe' },
        email: { type: 'string', example: 'ngu9hyenadnk@gmail.com' },
        createAt: { type: 'string', example: 'now' },
        messages: {
          type: 'array',
          items: { type: 'integer' },
          example: [1, 2, 3],
        },
        participants: {
          type: 'array',
          items: { type: 'integer' },
          example: [1, 2, 3],
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        username: { type: 'string', example: 'john_doe' },
        email: { type: 'string', example: 'ngu9hyenadnk@gmail.com' },
        createAt: { type: 'string', example: '2025-01-01T00:00:00Z' },
        messages: {
          type: 'array',
          items: { type: 'integer' },
          example: [1, 2, 3],
        },
        participants: {
          type: 'array',
          items: { type: 'integer' },
          example: [1, 2, 3],
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
