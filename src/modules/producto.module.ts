import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosController } from 'src/controllers/producto.controller';
import { Criterio } from 'src/entities/criterio.entity';
import { DetalleListaPrecios } from 'src/entities/detListaPrecio.entity';
import { Linea } from 'src/entities/linea.entity';
import { Producto } from 'src/entities/producto.entity';
import { TipoInventario } from 'src/entities/tipoInventario.entity';
import { UnidadMed } from 'src/entities/unidadMed.entity';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ProductoServices } from 'src/services/producto.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Producto,
      TipoInventario,
      Linea,
      UnidadMed,
      Criterio,
      DetalleListaPrecios,
    ]),
  ],
  controllers: [ProductosController],
  providers: [ProductoServices, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class ProductoModule {}
