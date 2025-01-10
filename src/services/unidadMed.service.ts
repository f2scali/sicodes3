import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UnidadMed } from 'src/entities/unidadMed.entity';
import { EntityManager, Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';
import { CreateUnidadMedDTO } from 'src/DTOs/unidadMed.dto';
import { TipoInventario } from 'src/entities/tipoInventario.entity';
import { Producto } from 'src/entities/producto.entity';

@Injectable()
export class UnidadMedServices {
  private readonly estadoService: EstadoService;
  private readonly queryService: QueryService<UnidadMed>;
  constructor(
    @InjectRepository(UnidadMed)
    private unidadMedRepository: Repository<UnidadMed>,
    @InjectRepository(TipoInventario)
    private tipoInventarioRepository: Repository<TipoInventario>,

    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,

    private readonly entityManager: EntityManager,
  ) {
    this.estadoService = new EstadoService(
      this.unidadMedRepository,
      this.entityManager,
    );
    this.queryService = new QueryService(this.unidadMedRepository);
  }

  findAllActivos(): Promise<UnidadMed[]> {
    return this.estadoService.findAllActivos();
  }

  async findUnidadMedWithQuery(
    query: QueryDTO,
  ): Promise<{ data: UnidadMed[]; total: number }> {
    const validOrderFields = ['ID', 'entity.Detalle', 'tipoInventario.detalle'];
    return this.queryService.findWithQuery(query, validOrderFields, {
      relations: ['tipoInventario'],
    });
  }

  findOne(id: number): Promise<UnidadMed | undefined> {
    return this.unidadMedRepository.findOneBy({ id });
  }

  async createUnidadMed(data: CreateUnidadMedDTO): Promise<UnidadMed> {
    const newUnidadMed = this.unidadMedRepository.create(data);
    return this.unidadMedRepository.save(newUnidadMed);
  }

  async updateUnidadMed(
    id: number,
    data: Partial<CreateUnidadMedDTO>,
  ): Promise<UnidadMed> {
    const unidadMed = await this.unidadMedRepository.findOne({
      where: { id },
      relations: ['tipoInventario'],
    });

    if (data.id_tipo_inv) {
      const tipoInventario = await this.tipoInventarioRepository.findOne({
        where: { id: data.id_tipo_inv },
      });
      if (!tipoInventario) {
        throw new NotFoundException(
          `No se encontró el inventario con id ${data.id_tipo_inv}`,
        );
      }
      unidadMed.tipoInventario = tipoInventario;
    }

    if (!unidadMed) {
      throw new NotFoundException(
        `No se encontró la unidad de medida con id ${id}`,
      );
    }

    const updatedUnidadMed = this.unidadMedRepository.merge(unidadMed, data);
    return this.unidadMedRepository.save(updatedUnidadMed);
  }
  async cambiarEstado(id: number, estado: number): Promise<UnidadMed> {
    const unidadMed = await this.unidadMedRepository.findOne({
      where: { id },
      relations: ['productos'],
    });

    if (!unidadMed) {
      throw new NotFoundException(`unidadMed with ID ${id} not found`);
    }

    unidadMed.estado = parseInt(estado as any);
    await this.unidadMedRepository.save(unidadMed);

    if (unidadMed.productos?.length) {
      for (const producto of unidadMed.productos) {
        producto.estado = parseInt(estado as any);
        await this.productoRepository.save(producto);
      }
    }

    return unidadMed;
  }
}
