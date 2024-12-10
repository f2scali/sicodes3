import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListaPreciosController } from 'src/controllers/listaPrecios.controller';
import { ListaPrecios } from 'src/entities/listaPrecios.entity';
import { ListaPreciosServices } from 'src/services/listaPrecios.service';

@Module({
  imports: [TypeOrmModule.forFeature([ListaPrecios])],
  controllers: [ListaPreciosController],
  providers: [ListaPreciosServices],
})
export class ListaPreciosModule {}
