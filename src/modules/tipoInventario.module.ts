import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoInventarioController } from 'src/controllers/tipoInventario.controller';
import { TipoInventario } from 'src/entities/tipoInventario.entity';
import { TipoInventarioServices } from 'src/services/tipoInventario.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoInventario])],
  controllers: [TipoInventarioController],
  providers: [TipoInventarioServices],
})
export class TipoInventarioModule {}
