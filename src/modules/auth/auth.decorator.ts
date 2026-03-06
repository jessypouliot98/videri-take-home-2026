import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';

interface AuthRequest extends Request {
  orgId: string;
  userId: string;
}

export const OrgId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<AuthRequest>();
    if (!('orgId' in request)) {
      throw new Error('orgId not found in request. Check auth guard');
    }
    return request.orgId;
  },
);

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<AuthRequest>();
    if (!('userId' in request)) {
      throw new Error('userId not found in request. Check auth guard');
    }
    return request.userId;
  },
);

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
