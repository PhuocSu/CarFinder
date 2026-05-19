import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqModule } from './faq/faq.module';
import { EventModule } from './event/event.module';
import { NoticeModule } from './notice/notice.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { SessionsModule } from './sessions/sessions.module';
import { CarModule } from './car/car.module';
import { SubModelModule } from './sub-model/sub-model.module';
import { ModelModule } from './model/model.module';
import { FavoriteCarModule } from './favorite-car/favorite-car.module';
import { CompareCarModule } from './compare-car/compare-car.module';
import { RecentlyViewedCarModule } from './recently-viewed-car/recently-viewed-car.module';
import { CloudinaryModule } from './others/cloudinary/cloudinary.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RecentlySearchHistoryController } from './recently-search-history/recently-search-history.controller';
import { RecentlySearchHistoryService } from './recently-search-history/recently-search-history.service';
import { RecentlySearchHistoryModule } from './recently-search-history/recently-search-history.module';
import { PurchaseContractModule } from './purchase-contract/purchase-contract.module';
import { ContractStatusHistoryModule } from './contract-status-history/contract-status-history.module';
import { MomoModule } from './momo/momo.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Dùng ở mọi module
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),

    ScheduleModule.forRoot(),

    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10000,
        },
      ],
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

    EventModule,

    NoticeModule,

    UsersModule,

    AuthModule,

    SessionsModule,

    CarModule,

    SubModelModule,

    ModelModule,

    FavoriteCarModule,

    CompareCarModule,

    RecentlyViewedCarModule,

    CloudinaryModule,

    RecentlySearchHistoryModule,

    PurchaseContractModule,

    ContractStatusHistoryModule,

    MomoModule,

    PaymentsModule,

    // cần nên khai báo trong RootAsync 
    // => tránh interceptor chạy đầu tiên trước khi đọc dữ liệu trong.env.development

  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
