import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SessionsService } from 'src/sessions/sessions.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private sessionsService: SessionsService,
        @Inject('JWT_REFRESH_CONFIG')
        private refreshConfig: { 
        secret: string; 
        expiresIn: string | number 
        },
    ) {}

    private async generateRefreshToken(payload: any): Promise<string> {
        return this.jwtService.signAsync(payload, {
          secret: this.refreshConfig.secret,
          expiresIn: this.refreshConfig.expiresIn,
        } as any);
      }
      
    
    async signIn(
        username: string, 
        pass: string,
        req: any
    ): Promise<{ access_token: string, refresh_token: string }> {
        const user = await this.usersService.findOne(username)
        if(!user) {
            throw new UnauthorizedException("User not found");
        }

        const isMatch = await bcrypt.compare(pass, user.custPw)
        if (!isMatch) {
            throw new UnauthorizedException("Invalid credential");
        }

        //payload: dữ liệu được "đóng gói" vào trong token
        const payload = { 
            sub: user.id, 
            username: user.custId, 
            role: user.role //cần thiết khi phía frontend
        }

        const refreshToken = await this.generateRefreshToken(payload);
    
        // Lưu session vào database
        const session = await this.sessionsService.create(
        user,
        refreshToken,
        req.headers['user-agent'],
        req.ip
        );


        return {
            access_token: await this.jwtService.signAsync(payload),
            refresh_token: refreshToken
        }
    }  
    
    //lấy accessToken mới khi accessToken cũ hết hạn
    async refreshAccessToken(refreshToken: string){
        try{
            //Kiểm tra refresh token có tồn tại trong db
            const session = await this.sessionsService.findByToken(refreshToken)
            if(!session){
                throw new UnauthorizedException("Invalid refresh token");
            }

            //Kiểm tra refresh token hết hạn chưa => xóa session
            if(session.expireAt < new Date()){
                await this.sessionsService.remove(session)
                throw new UnauthorizedException("Refresh token expired");
            }

            //lấy thông tin user từ session
            const user = session.user;
            
            //Tạo payload mới
            const payload = { 
                sub: user.id, 
                username: user.custId, 
                role: user.role 
            }

            //Tạo accessToken mới
            const newAccessToken = await this.jwtService.signAsync(payload);
            return {
                access_token: newAccessToken,
                refreshToken: refreshToken
            }

        }catch(error){
            console.error("Refresh token error: ", error)
            throw new UnauthorizedException("Invalid refresh token");
        }
    }

}
