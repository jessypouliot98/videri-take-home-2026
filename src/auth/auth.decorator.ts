import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface AuthRequest extends Request {
  orgId: string;
  userId: string;
}

export const OrgId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<AuthRequest>();
    return request.orgId;
  },
);

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<AuthRequest>();
    return request.userId;
  },
);
