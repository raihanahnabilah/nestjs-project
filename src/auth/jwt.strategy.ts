import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { JwtPayload } from "jsonwebtoken";
import { ExtractJwt, Strategy } from "passport-jwt"; // strategy comes from passport-jwt
import { User } from "src/auth/user.entity";
import { UsersRepository } from "src/auth/users.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor (
        @Inject(UsersRepository)
        private readonly userRepository: UsersRepository,
        private configService: ConfigService,
        ){
            super({
                secretOrKey: configService.get('JWT_SECRET'),
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // this is the bearer token
            });
        }
    
        async validate(payload: JwtPayload): Promise<User> {
            const { username } = payload;
            const user: User = await this.userRepository.findOne({ where: { username: username }});

            if (!user) {
                throw new UnauthorizedException();
            }

            return user;
        }
}
