import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
