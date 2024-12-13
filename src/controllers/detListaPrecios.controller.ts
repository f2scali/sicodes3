import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateDetListaPrecioDTO } from 'src/DTOs/detListaPrecios.dto';
import { DetalleListaPrecios } from 'src/entities/detListaPrecio.entity';
import { DetListaPrecioServices } from 'src/services/detListaPrecios.service';

@Controller('detalle-lista-precios')
export class DetListaPrecioController {
  constructor(private readonly detListaPrecioService: DetListaPrecioServices) {}

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
  ): Promise<{ data: DetalleListaPrecios[]; total: number }> {
    return await this.detListaPrecioService.findDetalleListaPreciosWithQuery(
      query,
    );
  }

  @Get('/byIds/:idProducto/:idLista')
  async findByProductAndLista(
    @Param('idProducto', ParseIntPipe) idProducto: number,
    @Param('idLista', ParseIntPipe) idLista: number,
  ): Promise<DetalleListaPrecios[]> {
    if (idProducto && idLista) {
      return await this.detListaPrecioService.findByProductAndLista(
        idProducto,
        idLista,
      );
    }

    throw new HttpException(
      'Se necesita el id del producto y de la lista de precios',
      HttpStatus.BAD_REQUEST,
    );
  }
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createDetListaPrecios(
    @Body() data: CreateDetListaPrecioDTO,
  ): Promise<DetalleListaPrecios> {
    return await this.detListaPrecioService.createDetalleListaPrecios(data);
  }

  @Patch(':ID_Producto/:id_Lista_Precios')
  cambiarEstado(
    @Query('id_item') id_item: string,
    @Query('id_ext_item') id_ext_item: string,
    @Param('id_Lista_Precios') id_Lista_Precios: number,
    @Query('estado', ParseIntPipe) estado: number,
  ): Promise<DetalleListaPrecios> {
    return this.detListaPrecioService.cambiarEstado(
      id_item,
      id_ext_item,
      id_Lista_Precios,
      estado,
    );
  }
}
