import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAuthService } from './auth';
import { ValidateUserCredentials } from '../../utils/types';
import { IUserService } from '../../users/users';
import { Services } from '../../utils/constants';
import { compareHashedAndRawPassword } from '../../utils/helpers';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}
  async validateUser(userCredentials: ValidateUserCredentials) {
    const user = await this.userService.findUser({
      email: userCredentials.email,
    });

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return compareHashedAndRawPassword(userCredentials.password, user.password);
  }
}
