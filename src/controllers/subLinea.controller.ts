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
import { CreateSubLineaDTO } from 'src/DTOs/subLinea.dto';
import { Sublinea } from 'src/entities/subLinea.entity';
import { SubLineaServices } from 'src/services/subLinea.service';

@Controller('sublinea')
export class SubLineaController {
  constructor(private readonly subLineaService: SubLineaServices) {}

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
  ): Promise<{ data: Sublinea[]; total: number }> {
    return await this.subLineaService.findSublineaWithQuery(query);
  }

  @Get('all')
  async findAll(): Promise<Sublinea[]> {
    return await this.subLineaService.findAllActivos();
  }

  @Get(':id')
  async getSubLineas(@Param('id') id: number): Promise<Sublinea> {
    const subLinea = await this.subLineaService.findOne(id);
    if (!subLinea) {
      throw new HttpException('Sublinea no encontrada', HttpStatus.NOT_FOUND);
    }

    return subLinea;
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createSublinea(@Body() data: CreateSubLineaDTO): Promise<Sublinea> {
    return await this.subLineaService.createSublinea(data);
  }

  @Put('update-by-id/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateSublinea(
    @Param('id') id: number,
    @Body() data: Partial<Sublinea>,
  ): Promise<Sublinea> {
    return await this.subLineaService.updateSublinea(id, data);
  }
  @Patch(':id')
  cambiarEstado(
    @Param('id') id: number,
    @Query('estado') estado: number,
  ): Promise<Sublinea> {
    return this.subLineaService.cambiarEstado(id, estado);
  }
}
