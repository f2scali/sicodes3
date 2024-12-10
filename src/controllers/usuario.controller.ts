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
import { CreateUsuarioDTO } from 'src/DTOs/usuario.dto';
import { Usuario } from 'src/entities/usuario.entity';
import { UsuariosServices } from 'src/services/usuario.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosServices) {}

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
  ): Promise<{ data: Usuario[]; total: number }> {
    return await this.usuariosService.findUsuarioWithQuery(query);
  }

  @Get(':id')
  async getUsuario(@Param('id') id: number): Promise<Usuario> {
    const usuario = await this.usuariosService.findOne(id);
    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    return usuario;
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createUsuario(@Body() data: CreateUsuarioDTO): Promise<Usuario> {
    return await this.usuariosService.createUsuario(data);
  }

  @Patch(':id')
  cambiarEstado(
    @Param('id') id: number,
    @Query('estado') estado: number,
  ): Promise<Usuario> {
    return this.usuariosService.cambiarEstado(id, estado);
  }
}
