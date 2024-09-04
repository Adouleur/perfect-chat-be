import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Services } from '../../../utils/constants';
import { User } from '../../../utils/typeorm/entities/User';
import { IUserService } from '../../../users/users';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.AUTH) private readonly userService: IUserService,
  ) {
    super();
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  serializeUser(user: User, done: Function) {
    done(null, user);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  async deserializeUser(user: User, done: Function) {
    const userDb = await this.userService.findUser({ id: user.id });
    return userDb ? done(null, userDb) : done(null, null);
  }
}
