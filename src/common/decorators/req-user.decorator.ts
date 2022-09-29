import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from '../../auth/interface/user-payload.interface';

export const ReqUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): UserPayload => {
    return context.switchToHttp().getRequest().user;
  },
);
