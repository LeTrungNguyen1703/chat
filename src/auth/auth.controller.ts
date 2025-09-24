import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginRequest } from './dto/create-auth.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginRequest })
  @ApiResponse({
    status: 200, description: 'Successful login returns JWT token.', schema: {
      properties: {
        access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....' },
        payload: { type: 'object', example: { sub: 1, username: 'john_doe' }
        }
      }
    }})
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid credentials.' })
  @Post('login')
  signIn(@Body() loginRequest: LoginRequest) {
    return this.authService.signIn(loginRequest);
  }
}
