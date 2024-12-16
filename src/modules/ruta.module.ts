import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RutasController } from 'src/controllers/ruta.controller';
import { Ruta } from 'src/entities/rutas.entity';
import { RolService } from 'src/services/rol.service';
import { RutaService } from 'src/services/ruta.service';
import { RolModule } from './rol.module';
import { Subruta } from 'src/entities/subRutas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ruta, Subruta]), RolModule],
  controllers: [RutasController],
  providers: [RutaService],
})
export class RutaModule {}
