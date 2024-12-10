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
import { CreateVendedorDTO } from 'src/DTOs/vendedor.dto';
import { Vendedor } from 'src/entities/vendedor.entity';
import { VendedorServices } from 'src/services/vendedor.service';

@Controller('vendedor')
export class VendedorController {
  constructor(private readonly vendedorService: VendedorServices) {}

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
  ): Promise<{ data: Vendedor[]; total: number }> {
    return await this.vendedorService.findVendedorWithQuery(query);
  }

  @Get(':id')
  async getVendedor(@Param('id') id: number): Promise<Vendedor> {
    const vendedor = await this.vendedorService.findOne(id);
    if (!vendedor) {
      throw new HttpException('Vendedor no encontrado', HttpStatus.NOT_FOUND);
    }

    return vendedor;
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createVendedor(@Body() data: CreateVendedorDTO): Promise<Vendedor> {
    return await this.vendedorService.createVendedor(data);
  }

  @Patch(':id')
  cambiarEstado(
    @Param('id') id: number,
    @Query('estado') estado: number,
  ): Promise<Vendedor> {
    return this.vendedorService.cambiarEstado(id, estado);
  }
}
