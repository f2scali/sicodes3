import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesController } from 'src/controllers/clientes.controller';
import { Cliente } from 'src/entities/cliente.entity';
import { ListaPrecios } from 'src/entities/listaPrecios.entity';
import { TipoCliente } from 'src/entities/tipoCliente.entity';
import { Vendedor } from 'src/entities/vendedor.entity';
import { ClientesServices } from 'src/services/cliente.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente, Vendedor, TipoCliente, ListaPrecios]),
  ],
  controllers: [ClientesController],
  providers: [ClientesServices],
})
export class ClienteModule {}
