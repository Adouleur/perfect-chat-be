import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserService } from './users';
import { CreateUserDetails, FindUserParams } from '../utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../utils/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from '../utils/helpers';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async createUser(userDetails: CreateUserDetails) {
    const existingUser = await this.userRepository.findOne({
      email: userDetails.email,
    });

    if (existingUser)
      throw new HttpException('User Already Exists', HttpStatus.CONFLICT);

    const password = await hashPassword(userDetails.password);
    const newUser = this.userRepository.create({
      ...userDetails,
      password,
    });

    return this.userRepository.save(newUser);
  }
  async findUser(findUserParams: FindUserParams) {
    const findedUser = await this.userRepository.findOne(findUserParams);
    console.log(findedUser);
    return findedUser;
  }
}
