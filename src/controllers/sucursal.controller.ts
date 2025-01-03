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
import { CreateListaPreciosDTO } from 'src/DTOs/listaPrecios.dto';
import { CreateSucursalDTO } from 'src/DTOs/sucursal.dto';
import { ListaPrecios } from 'src/entities/listaPrecios.entity';
import { Sucursal } from 'src/entities/sucursal.entity';
import { ListaPreciosServices } from 'src/services/listaPrecios.service';
import { SucursalServices } from 'src/services/sucursal.service';

@Controller('sucursal')
export class SucursalController {
  constructor(private readonly sucursalService: SucursalServices) {}

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
  ): Promise<{ data: Sucursal[]; total: number }> {
    return await this.sucursalService.findSucursalWithQuery(query);
  }

  @Get(':id')
  async getSucursal(@Param('id') id: number): Promise<Sucursal> {
    const sucursal = await this.sucursalService.findOne(id);
    if (!sucursal) {
      throw new HttpException(
        'La lista de precios no ha sido encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return sucursal;
  }

  @Get('all')
  async findAll(): Promise<Sucursal[]> {
    return await this.sucursalService.findAllActivos();
  }
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createSucursal(@Body() data: CreateSucursalDTO): Promise<Sucursal> {
    return await this.sucursalService.createSucursal(data);
  }

  @Put('update-by-id/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateSucursal(
    @Param('id') id: number,
    @Body() data: Partial<CreateSucursalDTO>,
  ): Promise<Partial<Sucursal>> {
    return await this.sucursalService.updateSucursal(id, data);
  }
  @Patch(':id')
  cambiarEstado(
    @Param('id') id: number,
    @Query('estado') estado: number,
  ): Promise<Sucursal> {
    return this.sucursalService.cambiarEstado(id, estado);
  }
}
