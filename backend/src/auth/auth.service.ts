import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(
        username: string, 
        pass: string
    ): Promise<{ access_token: string }> {
        const user = await this.usersService.findOne(username)
        if(user?.custPw !== pass) {
            throw new UnauthorizedException();
        }

        //payload: dữ liệu được "đóng gói" vào trong token
        const payload = { sub: user.id, username: user.custId }
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

}
