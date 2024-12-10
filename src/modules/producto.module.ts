import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosController } from 'src/controllers/producto.controller';
import { Producto } from 'src/entities/producto.entity';
import { ProductoServices } from 'src/services/producto.service';

@Module({
  imports: [TypeOrmModule.forFeature([Producto])],
  controllers: [ProductosController],
  providers: [ProductoServices],
})
export class ProductoModule {}
