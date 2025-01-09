import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListaPreciosController } from 'src/controllers/listaPrecios.controller';
import { Cliente } from 'src/entities/cliente.entity';
import { DetalleListaPrecios } from 'src/entities/detListaPrecio.entity';
import { ListaPrecios } from 'src/entities/listaPrecios.entity';
import { Producto } from 'src/entities/producto.entity';
import { ListaPreciosServices } from 'src/services/listaPrecios.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ListaPrecios, DetalleListaPrecios, Cliente]),
  ],
  controllers: [ListaPreciosController],
  providers: [ListaPreciosServices],
})
export class ListaPreciosModule {}
