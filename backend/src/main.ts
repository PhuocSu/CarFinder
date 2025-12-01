import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Thêm helmet middleware để bảo mật HTTP headers
  
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
      scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
      frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
    },
  },
}));


  //đăng ký để sử dụng DTO
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Tự động loại bỏ các trường không được định nghĩa trong DTO
    transform: true, // Tự động chuyển đổi kiểu dữ liệu
    forbidNonWhitelisted: true, // Từ chối request nếu có trường không được định nghĩa
  }));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
