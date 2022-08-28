import { CreateUserDto } from '../../modules/user/dto/create-user.dto';
import { UserService } from '../../modules/user/user.service';
import { Injectable, Logger } from '@nestjs/common';
import { UtilService } from '../../common/utils/util.service';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(
    private userService: UserService,
    private utilService: UtilService,
  ) {}

  async validateUser(email: string, password: string): Promise<any | null> {
    this.logger.debug('validateUser');
    const user = await this.userService.read(email);
    const passwordHash = this.utilService.getHash(password);
    if (user && user.passwordHash === passwordHash) {
      delete user.passwordHash;
      return user;
    }
    return null;
  }

  async registration(data: CreateUserDto): Promise<void> {
    this.logger.debug('registration');
    // maybe there will be some processing
    await this.userService.create(data);
  }
}
