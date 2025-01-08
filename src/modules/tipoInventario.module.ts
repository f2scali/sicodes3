import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoInventarioController } from 'src/controllers/tipoInventario.controller';
import { Criterio } from 'src/entities/criterio.entity';
import { DetLineas } from 'src/entities/detLinea.entity';
import { Linea } from 'src/entities/linea.entity';
import { Producto } from 'src/entities/producto.entity';
import { Sublinea } from 'src/entities/subLinea.entity';
import { TipoInventario } from 'src/entities/tipoInventario.entity';
import { UnidadMed } from 'src/entities/unidadMed.entity';
import { TipoInventarioServices } from 'src/services/tipoInventario.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TipoInventario,
      Linea,
      Sublinea,
      DetLineas,
      Criterio,
      UnidadMed,
      Producto,
    ]),
  ],
  controllers: [TipoInventarioController],
  providers: [TipoInventarioServices],
})
export class TipoInventarioModule {}
