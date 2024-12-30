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
import { CreateLineaDTO } from 'src/DTOs/linea.dto';
import { Linea } from 'src/entities/linea.entity';
import { LineaServices } from 'src/services/linea.service';

@Controller('linea')
export class LineaController {
  constructor(private readonly lineaService: LineaServices) {}

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
  ): Promise<{ data: Linea[]; total: number }> {
    return await this.lineaService.findLineaWithQuery(query);
  }

  @Get('all')
  async findAll(): Promise<Linea[]> {
    return await this.lineaService.findAllActivos();
  }
  @Get(':id')
  async getLineas(@Param('id') id: number): Promise<Linea> {
    const linea = await this.lineaService.findOne(id);
    if (!linea) {
      throw new HttpException('linea no encontrado', HttpStatus.NOT_FOUND);
    }

    return linea;
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createLinea(@Body() data: CreateLineaDTO): Promise<Linea> {
    return await this.lineaService.createLinea(data);
  }

  @Put('update-by-id/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateLinea(
    @Param('id') id: number,
    @Body() data: Partial<CreateLineaDTO>,
  ): Promise<Partial<Linea>> {
    return await this.lineaService.updateLinea(id, data);
  }
  @Patch(':id')
  cambiarEstado(
    @Param('id') id: number,
    @Query('estado') estado: number,
  ): Promise<Linea> {
    return this.lineaService.cambiarEstado(id, estado);
  }
}
