import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { doubleCsrf } from 'csrf-csrf';

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

//CSRF  => lấy token từ cookie + thêm interceptor cho axios



  //đăng ký để sử dụng DTO
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Tự động loại bỏ các trường không được định nghĩa trong DTO
    transform: true, // Tự động chuyển đổi kiểu dữ liệu
    forbidNonWhitelisted: true, // Từ chối request nếu có trường không được định nghĩa
  }));

  app.enableCors({
    origin: "http://localhost:3001", // cho phép truy câpj từ frontend
    credentials: true, // cho phép gửi cookies qua Cors
  }); //sau add them cors

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
