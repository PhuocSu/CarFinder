
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector, // Thêm Reflector để đọc metadata
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Kiểm tra xem route có được đánh dấu là public không
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      
      // Nếu là public route thì cho phép truy cập
      if (isPublic) {
        return true;
      }

      // Nếu không phải public route thì kiểm tra token
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request); //lấy token từ headerheader
      if (!token) {
        throw new UnauthorizedException("Token not found");
      }
      try {
        const payload = await this.jwtService.verifyAsync(token); //AuthGuard phải dùng cùng secret với JwtModule => để token
        request['user'] = payload;
        
      } catch(error) {
        if (error.name === 'TokenExpiredError') {
          throw new UnauthorizedException({
              statusCode: 401,
              message: 'Token expired',
              code: 'TOKEN_EXPIRED'  // Thêm mã lỗi để phía frontend xử lý
          });
      }
        console.log("JWT Verification Error:", error)
        throw new UnauthorizedException("Invalid credentials");
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  