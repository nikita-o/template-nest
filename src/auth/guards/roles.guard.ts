import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ERole } from '../../common/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger: Logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles: ERole[] = this.reflector.getAllAndOverride<ERole[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    // тут в user есть еще user!
    const { user } = context.switchToHttp().getRequest();
    const access: boolean = requiredRoles.includes(user.role);
    this.logger.verbose(`access: ${access}`);
    return access;
  }
}
