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

  @Get('all')
  async findAll(): Promise<Producto[]> {
    return await this.productoService.findAllActive();
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
    @Param('ID_Producto') id_item: string,
    id_ext_item: string,
  ): Promise<Producto> {
    const producto = await this.productoService.findByProductoId(
      id_item,
      id_ext_item,
    );
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

  @Put('update-by-id/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateProducto(
    @Param('id') id: number,
    @Body() data: Partial<CreateProductoDTO>,
  ): Promise<Partial<Producto>> {
    return await this.productoService.updateProducto(id, data);
  }

  @Patch(':ID_Producto')
  cambiarEstado(
    @Param('ID_Producto') ID_Producto: number,
    @Query('estado') estado: number,
  ): Promise<Producto> {
    return this.productoService.cambiarEstado(ID_Producto, estado);
  }
}
