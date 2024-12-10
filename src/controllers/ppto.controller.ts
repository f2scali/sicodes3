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
import { CreatePptoDTO } from 'src/DTOs/ppto.dto';
import { Ppto } from 'src/entities/ppto.entity';
import { PptoServices } from 'src/services/ppto.service';

@Controller('ppto')
export class PptoController {
  constructor(private readonly pptoService: PptoServices) {}

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
  ): Promise<{ data: Ppto[]; total: number }> {
    return await this.pptoService.findPptosWithQuery(query);
  }

  @Get(':id')
  async getPpto(@Param('id') id: number): Promise<Ppto> {
    const ppto = await this.pptoService.findOne(id);
    if (!ppto) {
      throw new HttpException('Ppto no encontrado', HttpStatus.NOT_FOUND);
    }

    return ppto;
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createPpto(@Body() data: CreatePptoDTO): Promise<Ppto> {
    return await this.pptoService.createPpto(data);
  }

  @Patch(':id')
  cambiarEstado(
    @Param('id') id: number,
    @Query('estado', ParseIntPipe) estado: number,
  ): Promise<Ppto> {
    return this.pptoService.cambiarEstado(id, estado);
  }
}
