import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

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
        if(!user) {
            throw new UnauthorizedException("User not found");
        }

        const isMatch = await bcrypt.compare(pass, user.custPw)
        if (!isMatch) {
            throw new UnauthorizedException("Invalid credential");
        }

        //payload: dữ liệu được "đóng gói" vào trong token
        const payload = { sub: user.id, username: user.custId }
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }        
}
