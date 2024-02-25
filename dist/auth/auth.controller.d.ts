import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
}
