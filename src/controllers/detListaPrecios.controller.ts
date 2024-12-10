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
    @Query('idLista') idLista: number,
  ): Promise<DetalleListaPrecios[]> {
    if (idProducto && idLista) {
      return await this.detListaPrecioService.findByProductAndLista(
        idProducto,
        idLista,
      );
    }
    return await this.detListaPrecioService.findAllActivos();
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
    @Param('ID_Producto') ID_Producto: number,
    @Param('id_Lista_Precios') id_Lista_Precios: number,
    @Query('estado', ParseIntPipe) estado: number,
  ): Promise<DetalleListaPrecios> {
    return this.detListaPrecioService.cambiarEstado(
      ID_Producto,
      id_Lista_Precios,
      estado,
    );
  }
}
