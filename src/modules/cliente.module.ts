import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesController } from 'src/controllers/clientes.controller';
import { Cliente } from 'src/entities/cliente.entity';
import { ClientesServices } from 'src/services/cliente.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  controllers: [ClientesController],
  providers: [ClientesServices],
})
export class ClienteModule {}
