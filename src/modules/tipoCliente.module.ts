import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoClienteController } from 'src/controllers/tipo_cliente.controller';
import { Cliente } from 'src/entities/cliente.entity';
import { TipoCliente } from 'src/entities/tipoCliente.entity';
import { TipoClienteServices } from 'src/services/tipo_cliente.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoCliente, Cliente])],
  controllers: [TipoClienteController],
  providers: [TipoClienteServices],
})
export class TipoClienteModule {}
