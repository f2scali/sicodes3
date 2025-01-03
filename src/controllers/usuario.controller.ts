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
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUsuarioDTO } from 'src/DTOs/usuario.dto';
import { Ruta } from 'src/entities/rutas.entity';
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

  @Get('all')
  async findAll(): Promise<Usuario[]> {
    return await this.usuariosService.findAllActivos();
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

  @Put('update-by-id/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateUsuario(
    @Param('id') id: number,
    @Body() data: Partial<CreateUsuarioDTO>,
  ): Promise<Partial<CreateUsuarioDTO>> {
    return await this.usuariosService.updateUsuario(id, data);
  }

  @Patch(':id')
  cambiarEstado(
    @Param('id') id: number,
    @Query('estado') estado: number,
  ): Promise<Usuario> {
    return this.usuariosService.cambiarEstado(id, estado);
  }
}
