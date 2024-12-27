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
import { CreateTipoClienteDTO } from 'src/DTOs/tipoCliente.dto';
import { CreateUsuarioDTO } from 'src/DTOs/usuario.dto';
import { TipoCliente } from 'src/entities/tipoCliente.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { TipoClienteServices } from 'src/services/tipo_cliente.service';

@Controller('tipoCliente')
export class TipoClienteController {
  constructor(private readonly tipoClienteService: TipoClienteServices) {}

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
  ): Promise<{ data: TipoCliente[]; total: number }> {
    return await this.tipoClienteService.findTipoClienteWithQuery(query);
  }

  @Get('all')
  async findAll(): Promise<TipoCliente[]> {
    return await this.tipoClienteService.findAllActivos();
  }

  @Get(':id')
  async getTipoCliente(@Param('id') id: number): Promise<TipoCliente> {
    const tipoCliente = await this.tipoClienteService.findOne(id);
    if (!tipoCliente) {
      throw new HttpException(
        'El tipo de cliente no ha sido encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return tipoCliente;
  }

  @Put('update-by-id/:id')
  async updateTipoCliente(
    @Param('id') id: number,
    @Body() data: Partial<TipoCliente>,
  ): Promise<TipoCliente> {
    return await this.tipoClienteService.updateTipoCliente(id, data);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createTipoCliente(
    @Body() data: CreateTipoClienteDTO,
  ): Promise<TipoCliente> {
    return await this.tipoClienteService.createTipoCliente(data);
  }

  @Patch(':id')
  cambiarEstado(
    @Param('id') id: number,
    @Query('estado') estado: number,
  ): Promise<TipoCliente> {
    return this.tipoClienteService.cambiarEstado(id, estado);
  }
}
