import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosController } from 'src/controllers/producto.controller';
import { Producto } from 'src/entities/producto.entity';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ProductoServices } from 'src/services/producto.service';

@Module({
  imports: [TypeOrmModule.forFeature([Producto])],
  controllers: [ProductosController],
  providers: [ProductoServices, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class ProductoModule {}
