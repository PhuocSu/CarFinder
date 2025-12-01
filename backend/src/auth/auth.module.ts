import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({ 
      //NestJS docs sai => sử dụng registerAsync thay vì register + useFactory
      global: true,
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '60s' }, //accessToken kéo dài 60s
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,
    {
      provide: APP_GUARD, //tự động liên kết AuthGuard với mọi endpoints (Global auth guard)
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Global roles guard
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
