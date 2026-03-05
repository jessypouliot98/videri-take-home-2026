import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './auth.decorator.js';

interface AuthRequest extends Request {
  orgId: string;
  userId: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthRequest>();
    const orgId = request.headers['x-org-id'] as string;
    const userId = request.headers['x-user-id'] as string;

    if (!orgId || !userId) {
      throw new UnauthorizedException('Missing X-Org-Id or X-User-Id headers');
    }

    // Attach to request for later use
    request.orgId = orgId;
    request.userId = userId;

    return true;
  }
}
