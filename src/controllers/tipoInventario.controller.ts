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
import { CreateTipoInventarioDTO } from 'src/DTOs/tipoInventario.dto';
import { TipoInventario } from 'src/entities/tipoInventario.entity';
import { TipoInventarioServices } from 'src/services/tipoInventario.service';

@Controller('tipoInventario')
export class TipoInventarioController {
  constructor(private readonly tipoInventarioService: TipoInventarioServices) {}

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
  ): Promise<{ data: TipoInventario[]; total: number }> {
    return await this.tipoInventarioService.findTipoInventarioWithQuery(query);
  }

  @Get(':id')
  async getTipoInventarios(@Param('id') id: number): Promise<TipoInventario> {
    const tipoInventario = await this.tipoInventarioService.findOne(id);
    if (!tipoInventario) {
      throw new HttpException(
        'tipo de inventario no encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return tipoInventario;
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createTipoInventario(
    @Body() data: CreateTipoInventarioDTO,
  ): Promise<TipoInventario> {
    return await this.tipoInventarioService.createTipoInventario(data);
  }

  @Put('update-by-id/:id')
  async updateTipoInventario(
    @Param('id') id: number,
    @Body() data: Partial<TipoInventario>,
  ): Promise<TipoInventario> {
    return await this.tipoInventarioService.updateTipoInventario(id, data);
  }

  @Patch(':id')
  cambiarEstado(
    @Param('id') id: number,
    @Query('estado') estado: number,
  ): Promise<TipoInventario> {
    return this.tipoInventarioService.cambiarEstado(id, estado);
  }
}
