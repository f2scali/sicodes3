import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetListaPrecioController } from 'src/controllers/detListaPrecios.controller';
import { DetalleListaPrecios } from 'src/entities/detListaPrecio.entity';
import { ListaPrecios } from 'src/entities/listaPrecios.entity';
import { Producto } from 'src/entities/producto.entity';
import { DetListaPrecioServices } from 'src/services/detListaPrecios.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetalleListaPrecios, Producto, ListaPrecios]),
  ],
  controllers: [DetListaPrecioController],
  providers: [DetListaPrecioServices],
})
export class DetListaPrecioModule {}
