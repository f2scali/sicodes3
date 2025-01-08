import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadMedController } from 'src/controllers/unidadMed.controller';
import { Producto } from 'src/entities/producto.entity';
import { TipoInventario } from 'src/entities/tipoInventario.entity';
import { UnidadMed } from 'src/entities/unidadMed.entity';
import { UnidadMedServices } from 'src/services/unidadMed.service';

@Module({
  imports: [TypeOrmModule.forFeature([UnidadMed, TipoInventario, Producto])],
  controllers: [UnidadMedController],
  providers: [UnidadMedServices],
})
export class UnidadMedModule {}
