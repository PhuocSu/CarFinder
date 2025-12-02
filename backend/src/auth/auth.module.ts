import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { SessionsModule } from 'src/sessions/sessions.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    SessionsModule, // add session to get refreshToken
    //NestJS docs sai => sử dụng registerAsync thay vì register + useFactory
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { 
          expiresIn: config.get<string>('JWT_ACCESS_EXPIRES') 
        },
      } as any),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,
    {
      provide: 'JWT_REFRESH_CONFIG',
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: config.get<string>('JWT_REFRESH_EXPIRES'),
      }),
      inject: [ConfigService],
    },
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
