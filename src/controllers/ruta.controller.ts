import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRutaDTO } from 'src/DTOs/ruta.dto';
import { CreateSubRutaDTO } from 'src/DTOs/subruta.dto';
import { Ruta } from 'src/entities/rutas.entity';
import { Subruta } from 'src/entities/subRutas.entity';
import { RutaService } from 'src/services/ruta.service';

@Controller('rutas')
export class RutasController {
  constructor(private readonly rutasService: RutaService) {}

  @Post()
  async createRuta(@Body() data: CreateRutaDTO): Promise<Ruta> {
    return await this.rutasService.createRuta(data);
  }

  @Post('subruta')
  async createSubRuta(@Body() data: CreateSubRutaDTO): Promise<Subruta> {
    return await this.rutasService.createSubRuta(data);
  }
}
