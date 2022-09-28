import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PayloadUser } from '../../auth/interface/payload-user.interface';

export const ReqUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): PayloadUser => {
    return context.switchToHttp().getRequest().user;
  },
);
