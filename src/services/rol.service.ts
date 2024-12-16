import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/entities/roles.entity';
import { Ruta } from 'src/entities/rutas.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Roles)
    private rolRepository: Repository<Roles>,
  ) {}

  async findRutasByRol(id: number): Promise<Ruta[]> {
    const rol = await this.rolRepository.findOne({
      where: { id },
      relations: ['rutas', 'rutas.subrutas'],
    });

    if (!rol) throw new NotFoundException('Rol no encontrado');
    if (rol.rutas.length === 0) {
      return [];
    }

    return rol.rutas;
  }
}
