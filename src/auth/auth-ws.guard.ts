import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthGuardWebSocket implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient<any>();

    const token = this.extractToken(client);
    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    try {
      const payload = await this.verifyToken(token);
      this.attachUserToClient(client, payload);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Missing credentials');
    }
  }

  /**
   * Extract JWT token from various Socket.IO locations
   */
  private extractToken(client: any): string | undefined {
    const handshake = client?.handshake;
    if (!handshake) return undefined;

    // Try authorization header first
    const tokenFromHeader = this.extractTokenFromAuthHeader(handshake);
    if (tokenFromHeader) return tokenFromHeader;

    // Fallback to auth/query payload
    return this.extractTokenFromAuthPayload(handshake);
  }

  /**
   * Extract token from Authorization header: "Bearer <token>"
   */
  private extractTokenFromAuthHeader(handshake: any): string | undefined {
    const authHeader =
      handshake?.headers?.authorization || handshake?.auth?.authorization;

    if (!authHeader || typeof authHeader !== 'string') {
      return undefined;
    }

    const parts = authHeader.split(' ');

    // Standard Bearer format
    if (parts.length === 2 && parts[0] === 'Bearer') {
      return parts[1];
    }

    // Direct token (fallback)
    return authHeader;
  }

  /**
   * Extract token from Socket.IO auth/query payload
   */
  private extractTokenFromAuthPayload(handshake: any): string | undefined {
    const authToken = handshake?.auth?.token || handshake?.query?.token;
    return authToken && typeof authToken === 'string' ? authToken : undefined;
  }

  /**
   * Verify JWT token
   */
  private async verifyToken(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });
  }

  /**
   * Attach user payload to client in multiple locations for compatibility
   */
  private attachUserToClient(client: any, payload: any): void {
    // Socket.IO v4+: preferred location
    if (client.data !== undefined) {
      client.data.user = payload;
    }

    // Fallback locations for compatibility
    if (client.handshake) {
      client.handshake.user = payload;
    }

    // Generic fallback
    client.user = payload;
  }
}
