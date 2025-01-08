import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LineaController } from 'src/controllers/linea.controller';
import { DetLineas } from 'src/entities/detLinea.entity';
import { DetalleListaPrecios } from 'src/entities/detListaPrecio.entity';
import { Linea } from 'src/entities/linea.entity';
import { Producto } from 'src/entities/producto.entity';
import { Sublinea } from 'src/entities/subLinea.entity';
import { TipoInventario } from 'src/entities/tipoInventario.entity';
import { LineaServices } from 'src/services/linea.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Linea,
      TipoInventario,
      Sublinea,
      DetLineas,
      Producto,
    ]),
  ],
  controllers: [LineaController],
  providers: [LineaServices],
})
export class LineaModule {}
