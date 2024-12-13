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
import { CreateClienteDTO } from 'src/DTOs/cliente.dto';
import { Cliente } from 'src/entities/cliente.entity';
import { ClientesServices } from 'src/services/cliente.service';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesServices) {}

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
  ): Promise<{ data: Cliente[]; total: number }> {
    return await this.clientesService.findClientesWithQuery(query);
  }

  @Get(':id')
  async getCliente(@Param('id') id: number): Promise<Cliente> {
    const cliente = await this.clientesService.findOne(id);
    if (!cliente) {
      throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
    }

    return cliente;
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createCliente(@Body() data: CreateClienteDTO): Promise<Cliente> {
    return await this.clientesService.createCliente(data);
  }

  @Patch(':id')
  cambiarEstado(
    @Param('id') id: number,
    @Query('estado', ParseIntPipe) estado: number,
  ): Promise<Cliente> {
    return this.clientesService.cambiarEstado(id, estado);
  }
}
