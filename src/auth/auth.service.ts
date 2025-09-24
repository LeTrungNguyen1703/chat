import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequest } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(loginRequest: LoginRequest) {
    const user = await this.handleMissingCredentials(loginRequest);


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
