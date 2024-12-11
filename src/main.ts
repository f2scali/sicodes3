import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { SucursalModule } from './modules/sucursal.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(SucursalModule), { fallbackOnErrors: true });
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
