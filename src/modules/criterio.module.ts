import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CriterioController } from 'src/controllers/criterio.controller';
import { Criterio } from 'src/entities/criterio.entity';
import { TipoInventario } from 'src/entities/tipoInventario.entity';
import { CriterioServices } from 'src/services/criterio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Criterio, TipoInventario])],
  controllers: [CriterioController],
  providers: [CriterioServices],
})
export class CriterioModule {}
