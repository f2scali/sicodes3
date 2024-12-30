import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadMedController } from 'src/controllers/unidadMed.controller';
import { TipoInventario } from 'src/entities/tipoInventario.entity';
import { UnidadMed } from 'src/entities/unidadMed.entity';
import { UnidadMedServices } from 'src/services/unidadMed.service';

@Module({
  imports: [TypeOrmModule.forFeature([UnidadMed, TipoInventario])],
  controllers: [UnidadMedController],
  providers: [UnidadMedServices],
})
export class UnidadMedModule {}
