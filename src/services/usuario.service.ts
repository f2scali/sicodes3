import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuario.entity';
import { Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';

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

  findOne(id: number): Promise<Usuario | null> {
    return this.usuariosRepository.findOneBy({ id });
  }

  async createUsuario(data: Partial<Usuario>): Promise<Usuario> {
    const usuarioExistente = await this.usuariosRepository.findOneBy({
      id: data.id,
    });

    if (usuarioExistente) {
      throw new HttpException(
        `El usuario ${data.id} ya está registrado.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUsuario = this.usuariosRepository.create(data);
    return this.usuariosRepository.save(newUsuario);
  }

  async cambiarEstado(id: number, estado: number): Promise<Usuario> {
    return this.estadoService.cambiarEstado('id', id, estado);
  }
}
