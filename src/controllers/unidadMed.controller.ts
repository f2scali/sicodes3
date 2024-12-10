import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUnidadMedDTO } from 'src/DTOs/unidadMed.dto';
import { UnidadMed } from 'src/entities/unidadMed.entity';
import { UnidadMedServices } from 'src/services/unidadMed.service';

@Controller('unidadMed')
export class UnidadMedController {
  constructor(private readonly unidadMedService: UnidadMedServices) {}

  @Get()
  async findAllActivos(
    @Query()
    query: {
      page?: number;
      limit?: number;
      search?: string;
      orderBy?: string;
      orderDirection?: 'ASC' | 'DESC';
    },
  ): Promise<{ data: UnidadMed[]; total: number }> {
    return await this.unidadMedService.findUnidadMedWithQuery(query);
  }

  @Get(':id')
  async getUnidadMed(@Param('id') id: string): Promise<UnidadMed> {
    const unidadMed = await this.unidadMedService.findOne(id);
    if (!unidadMed) {
      throw new HttpException(
        'La lista de precios no ha sido encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return unidadMed;
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createUnidadMed(@Body() data: CreateUnidadMedDTO): Promise<UnidadMed> {
    return await this.unidadMedService.createUnidadMed(data);
  }

  @Patch(':id')
  cambiarEstado(
    @Param('id') id: number,
    @Query('estado') estado: number,
  ): Promise<UnidadMed> {
    return this.unidadMedService.cambiarEstado(id, estado);
  }
}
