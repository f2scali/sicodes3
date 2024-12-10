import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetLineaController } from 'src/controllers/detLinea.controller';
import { DetListaPrecioController } from 'src/controllers/detListaPrecios.controller';
import { DetLineas } from 'src/entities/detLinea.entity';
import { DetalleListaPrecios } from 'src/entities/detListaPrecio.entity';
import { DetLineaServices } from 'src/services/detLinea.service';
import { DetListaPrecioServices } from 'src/services/detListaPrecios.service';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleListaPrecios])],
  controllers: [DetListaPrecioController],
  providers: [DetListaPrecioServices],
})
export class DetListaPrecioModule {}
