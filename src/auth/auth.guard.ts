import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

interface AuthRequest extends Request {
  orgId: string;
  userId: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
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
