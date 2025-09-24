import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequest } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async signIn(loginRequest: LoginRequest) {
    const user = await this.handleMissingCredentials(loginRequest);

    const payload = {sub: user.id, username: user.username}
    return {
      access_token: await this.jwtService.signAsync(payload)
    }

  }

  private async handleMissingCredentials(loginRequest: LoginRequest) {
    const { username, password } = loginRequest;
    const user = await this.usersService.findOneByUsername(username);
    if (!bcrypt.compareSync(password, user.password_hash)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
