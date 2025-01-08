import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuario.entity';
import { EntityManager, Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDTO } from 'src/DTOs/usuario.dto';
import { Roles } from 'src/entities/roles.entity';

@Injectable()
export class UsuariosServices {
  private readonly estadoService: EstadoService;
  private readonly queryService: QueryService<Usuario>;
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,

    private readonly entityManager: EntityManager,
  ) {
    this.estadoService = new EstadoService(
      this.usuariosRepository,
      this.entityManager,
    );
    this.queryService = new QueryService(this.usuariosRepository);
  }

  findAllActivos(): Promise<Usuario[]> {
    return this.estadoService.findAllActivos();
  }

  async findUsuarioWithQuery(
    query: QueryDTO,
  ): Promise<{ data: Usuario[]; total: number }> {
    const validOrderFields = ['id', 'usuario', 'rol.descripcion'];
    return this.queryService.findWithQuery(query, validOrderFields, {
      relations: ['rol'],
    });
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

  async updateUsuario(
    id: number,
    data: Partial<CreateUsuarioDTO>,
  ): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOne({
      where: { id },
      relations: ['rol'],
    });

    if (data.id_rol) {
      const rol = await this.rolesRepository.findOne({
        where: { id: data.id_rol },
        select: ['id', 'descripcion'],
      });
      if (!rol) {
        throw new NotFoundException(
          `No se encontró el rol con id ${data.id_rol}`,
        );
      }
      usuario.rol = rol;
    }

    if (data.contraseña) {
      const saltRounds = 10;
      data.contraseña = await bcrypt.hash(data.contraseña, saltRounds);
    }
    if (!usuario) {
      throw new NotFoundException(`No se encontró el usuario con id ${id}`);
    }

    const updatedUsuario = this.usuariosRepository.merge(usuario, data);
    return this.usuariosRepository.save(updatedUsuario);
  }
  async cambiarEstado(id: number, estado: number): Promise<Usuario> {
    return this.estadoService.cambiarEstado('id', id, estado);
  }
}
