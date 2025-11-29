import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqModule } from './faq/faq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Dùng ở mọi module
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: config.get('NODE_ENV') === 'development', // Chỉ bật khi NODE_ENV=development
      }),
    }),

    FaqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
