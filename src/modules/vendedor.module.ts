import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendedorController } from 'src/controllers/vendedor.controller';
import { Vendedor } from 'src/entities/vendedor.entity';
import { VendedorServices } from 'src/services/vendedor.service';
import { UsuarioModule } from './usuario.module';
import { Cliente } from 'src/entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vendedor, Cliente]), UsuarioModule],
  controllers: [VendedorController],
  providers: [VendedorServices],
})
export class VendedorModule {}
