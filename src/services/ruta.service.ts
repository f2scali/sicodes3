import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRutaDTO } from 'src/DTOs/ruta.dto';
import { CreateSubRutaDTO } from 'src/DTOs/subruta.dto';
import { Roles } from 'src/entities/roles.entity';
import { Ruta } from 'src/entities/rutas.entity';
import { Subruta } from 'src/entities/subRutas.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class RutaService {
  constructor(
    @InjectRepository(Ruta)
    private rutasRepository: Repository<Ruta>,
    @InjectRepository(Roles)
    private rolRepository: Repository<Roles>,
    @InjectRepository(Subruta)
    private subrutasRepository: Repository<Subruta>,
  ) {}

  async createRuta(data: CreateRutaDTO): Promise<Ruta> {
    const { descripcion, path, rolesIds, subrutas } = data;

    const roles = await this.rolRepository.find({
      where: { id: In(rolesIds) },
    });
    if (!roles.length) {
      throw new NotFoundException(`No se encontraron los roles.`);
    }

    const nuevaRuta = this.rutasRepository.create({
      descripcion,
      path,
      roles,
    });

    const rutaGuardada = await this.rutasRepository.save(nuevaRuta);

    if (subrutas && subrutas.length > 0) {
      const subrutasGuardadas = subrutas.map((subruta) =>
        this.subrutasRepository.create({
          descripcion: subruta.descripcion,
          path: subruta.path,
          rutaPadre: rutaGuardada,
        }),
      );

      await this.subrutasRepository.save(subrutasGuardadas);
    }

    return rutaGuardada;
  }

  async createSubRuta(data: Partial<CreateSubRutaDTO>): Promise<Subruta> {
    const { descripcion, path, rutaPadreId } = data;

    const rutaPadre = await this.rutasRepository.findOne({
      where: { id: rutaPadreId },
    });

    if (!rutaPadre) {
      throw new NotFoundException(`Ruta con ID ${rutaPadreId} no encontrada`);
    }

    const subruta = this.subrutasRepository.create({
      descripcion,
      path,
      rutaPadre,
    });

    return this.subrutasRepository.save(subruta);
  }
}
