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
import { CreateDetLineaDTO } from 'src/DTOs/detLinea.dto';
import { DetLineas } from 'src/entities/detLinea.entity';
import { DetLineaServices } from 'src/services/detLinea.service';

@Controller('detLinea')
export class DetLineaController {
  constructor(private readonly detLineaService: DetLineaServices) {}

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
  ): Promise<{ data: DetLineas[]; total: number }> {
    return await this.detLineaService.findDetLineasWithQuery(query);
  }

  @Get(':id')
  async getDetLineas(@Param('id') id: number): Promise<DetLineas> {
    const detLineas = await this.detLineaService.findOne(id);
    if (!detLineas) {
      throw new HttpException('Det lineas no encontrado', HttpStatus.NOT_FOUND);
    }

    return detLineas;
  }

  @Get('all')
  async getAllDetLineas(): Promise<DetLineas[]> {
    return await this.detLineaService.findAllActivos();
  }
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createDetLineas(@Body() data: CreateDetLineaDTO): Promise<DetLineas> {
    return await this.detLineaService.createDetLineas(data);
  }

  @Put('update-by-id/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateDetLinea(
    @Param('id') id: number,
    @Body() data: Partial<CreateDetLineaDTO>,
  ): Promise<Partial<DetLineas>> {
    return await this.detLineaService.updateDetLineas(id, data);
  }
  @Patch(':id')
  cambiarEstado(
    @Param('id') id: number,
    @Query('estado') estado: number,
  ): Promise<DetLineas> {
    return this.detLineaService.cambiarEstado(id, estado);
  }
}
