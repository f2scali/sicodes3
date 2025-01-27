import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCriterioDTO } from 'src/DTOs/criterio.dto';
import { CreateDetLineaDTO } from 'src/DTOs/detLinea.dto';
import { Criterio } from 'src/entities/criterio.entity';
import { DetLineas } from 'src/entities/detLinea.entity';
import { CriterioServices } from 'src/services/criterio.service';
import { DetLineaServices } from 'src/services/detLinea.service';

@Controller('criterio')
export class CriterioController {
  constructor(private readonly criterioService: CriterioServices) {}

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
  ): Promise<{ data: Criterio[]; total: number }> {
    return await this.criterioService.findCriterioWithQuery(query);
  }

  @Get('all')
  async findAll(): Promise<Criterio[]> {
    return await this.criterioService.findAllActivos();
  }
  @Get(':id')
  async getCriterio(@Param('id') id: number): Promise<Criterio> {
    const Criterio = await this.criterioService.findOne(id);
    if (!Criterio) {
      throw new HttpException('Det lineas no encontrado', HttpStatus.NOT_FOUND);
    }

    return Criterio;
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createCriterio(@Body() data: CreateCriterioDTO): Promise<Criterio> {
    return await this.criterioService.createCriterio(data);
  }

  @Put('update-by-id/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateLinea(
    @Param('id') id: number,
    @Body() data: Partial<CreateCriterioDTO>,
  ): Promise<Partial<Criterio>> {
    return await this.criterioService.updateCriterio(id, data);
  }

  @Patch(':id')
  cambiarEstado(
    @Param('id') id: number,
    @Query('estado') estado: number,
  ): Promise<Criterio> {
    return this.criterioService.cambiarEstado(id, estado);
  }
}
