import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '../user/users.repository';
import { AuthCredentialsDto } from './auth.dto';

@Injectable() // allows services to be injected to other parts of the application
export class AuthService {
  constructor(
    @Inject(UsersRepository)
    private readonly userRepository: UsersRepository,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }
}
