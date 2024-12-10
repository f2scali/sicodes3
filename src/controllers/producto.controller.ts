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
import { CreateProductoDTO } from 'src/DTOs/producto.dto';
import { Producto } from 'src/entities/producto.entity';
import { ProductoServices } from 'src/services/producto.service';

@Controller('producto')
export class ProductosController {
  constructor(private readonly productoService: ProductoServices) {}

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
  ): Promise<{ data: Producto[]; total: number }> {
    return await this.productoService.findProductosWithQuery(query);
  }

  @Get(':id')
  async getProducto(@Param('id') id: number): Promise<Producto> {
    const producto = await this.productoService.findOne(id);
    if (!producto) {
      throw new HttpException(
        'El producto no ha sido encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return producto;
  }

  @Get('byId/:ID_Producto')
  async getProductoById(
    @Param('ID_Producto') ID_Producto: string,
  ): Promise<Producto> {
    const producto = await this.productoService.findByProductoId(ID_Producto);
    if (!producto) {
      throw new HttpException(
        'El producto no ha sido encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return producto;
  }
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createProducto(@Body() data: CreateProductoDTO): Promise<Producto> {
    return await this.productoService.createProducto(data);
  }

  @Patch(':ID_Producto')
  cambiarEstado(
    @Param('ID_Producto') ID_Producto: number,
    @Query('estado') estado: number,
  ): Promise<Producto> {
    return this.productoService.cambiarEstado(ID_Producto, estado);
  }
}
