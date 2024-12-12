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
    @Query('idProducto') idProducto: number,
    @Query('idLista') idLista: string,
  ): Promise<DetalleListaPrecios[]> {
    if (idProducto && idLista) {
      return await this.detListaPrecioService.findByProductAndLista(
        idProducto,
        idLista,
      );
    }
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
    @Param('ID_Producto') ID_Producto: string,
    @Param('id_Lista_Precios') id_Lista_Precios: string,
    @Query('estado', ParseIntPipe) estado: number,
  ): Promise<DetalleListaPrecios> {
    return this.detListaPrecioService.cambiarEstado(
      ID_Producto,
      id_Lista_Precios,
      estado,
    );
  }
}
