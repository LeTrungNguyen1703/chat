import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';
import { AuthGuardWebSocket } from './auth-ws.guard';




@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, AuthGuardWebSocket],
  exports: [AuthGuard, AuthGuardWebSocket],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule {}
