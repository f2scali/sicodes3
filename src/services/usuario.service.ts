import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuario.entity';
import { Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDTO } from 'src/DTOs/usuario.dto';
import { Ruta } from 'src/entities/rutas.entity';

@Injectable()
export class UsuariosServices {
  private readonly estadoService: EstadoService;
  private readonly queryService: QueryService<Usuario>;
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {
    this.estadoService = new EstadoService(this.usuariosRepository);
    this.queryService = new QueryService(this.usuariosRepository);
  }

  findAllActivos(): Promise<Usuario[]> {
    return this.estadoService.findAllActivos();
  }

  async findUsuarioWithQuery(
    query: QueryDTO,
  ): Promise<{ data: Usuario[]; total: number }> {
    const validOrderFields = ['id', 'usuario'];
    return this.queryService.findWithQuery(query, validOrderFields);
  }

  findOne(id: number): Promise<Usuario | undefined> {
    return this.usuariosRepository.findOneBy({ id });
  }

  findByUsername(usuario: string): Promise<Usuario | undefined> {
    return this.usuariosRepository.findOneBy({ usuario });
  }
  async createUsuario(data: CreateUsuarioDTO): Promise<Usuario> {
    if (data.contraseña) {
      const saltRounds = 10;
      data.contraseña = await bcrypt.hash(data.contraseña, saltRounds);
    }
    const newUsuario = this.usuariosRepository.create(data);
    return this.usuariosRepository.save(newUsuario);
  }

  async cambiarEstado(id: number, estado: number): Promise<Usuario> {
    return this.estadoService.cambiarEstado('id', id, estado);
  }
}
