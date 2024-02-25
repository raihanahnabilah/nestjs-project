import { UsersRepository } from '../user/users.repository';
import { AuthCredentialsDto } from './auth.dto';
export declare class AuthService {
    private readonly userRepository;
    constructor(userRepository: UsersRepository);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
}
