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
import { CreateListaPreciosDTO } from 'src/DTOs/listaPrecios.dto';
import { ListaPrecios } from 'src/entities/listaPrecios.entity';
import { ListaPreciosServices } from 'src/services/listaPrecios.service';

@Controller('listaPrecios')
export class ListaPreciosController {
  constructor(private readonly listaPreciosService: ListaPreciosServices) {}

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
  ): Promise<{ data: ListaPrecios[]; total: number }> {
    return await this.listaPreciosService.findListaPreciosWithQuery(query);
  }

  @Get('all')
  async findAll(): Promise<ListaPrecios[]> {
    return await this.listaPreciosService.findAllActivos();
  }
  @Get(':id')
  async getListaPrecios(@Param('id') id: number): Promise<ListaPrecios> {
    const listaPrecios = await this.listaPreciosService.findOne(id);
    if (!listaPrecios) {
      throw new HttpException(
        'La lista de precios no ha sido encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return listaPrecios;
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createListaPrecios(
    @Body() data: CreateListaPreciosDTO,
  ): Promise<ListaPrecios> {
    return await this.listaPreciosService.createListaPrecios(data);
  }

  @Patch(':ID_LISTA')
  cambiarEstado(
    @Param('ID_LISTA') ID_LISTA: number,
    @Query('estado') estado: number,
  ): Promise<ListaPrecios> {
    return this.listaPreciosService.cambiarEstado(ID_LISTA, estado);
  }
}
