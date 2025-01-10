import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { Criterio } from 'src/entities/criterio.entity';
import { QueryDTO } from 'src/DTOs/query.dto';
import { QueryService } from './query.service';
import { CreateCriterioDTO } from 'src/DTOs/criterio.dto';
import { TipoInventario } from 'src/entities/tipoInventario.entity';
import { Producto } from 'src/entities/producto.entity';

@Injectable()
export class CriterioServices {
  private readonly estadoService: EstadoService;
  private readonly queryService: QueryService<Criterio>;

  constructor(
    @InjectRepository(Criterio)
    private criterioRepository: Repository<Criterio>,
    @InjectRepository(TipoInventario)
    private tipoInventarioRepository: Repository<TipoInventario>,

    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
    private readonly entityManager: EntityManager,
  ) {
    this.estadoService = new EstadoService(
      this.criterioRepository,
      this.entityManager,
    );
    this.queryService = new QueryService(this.criterioRepository);
  }

  findAllActivos(): Promise<Criterio[]> {
    return this.estadoService.findAllActivos();
  }

  async findCriterioWithQuery(
    query: QueryDTO,
  ): Promise<{ data: Criterio[]; total: number }> {
    const validOrderFields = ['entity.Detalle', 'tipoInventario.detalle'];
    return this.queryService.findWithQuery(query, validOrderFields, {
      relations: ['tipoInventario'],
    });
  }

  findOne(id: number): Promise<Criterio | null> {
    return this.criterioRepository.findOneBy({ id });
  }

  async createCriterio(data: CreateCriterioDTO): Promise<Criterio> {
    const newCriterio = this.criterioRepository.create(data);
    return this.criterioRepository.save(newCriterio);
  }

  async updateCriterio(
    id: number,
    data: Partial<CreateCriterioDTO>,
  ): Promise<Criterio> {
    const criterio = await this.criterioRepository.findOne({
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
      criterio.tipoInventario = tipoInventario;
    }

    if (!criterio) {
      throw new NotFoundException(`No se encontró el cliente con id ${id}`);
    }

    const updatedCriterio = this.criterioRepository.merge(criterio, data);
    return this.criterioRepository.save(updatedCriterio);
  }
  async cambiarEstado(id: number, estado: number): Promise<Criterio> {
    const criterio = await this.criterioRepository.findOne({
      where: { id },
      relations: ['productos'],
    });

    if (!criterio) {
      throw new NotFoundException(`No se encontró el criterio con id ${id}`);
    }

    criterio.estado = parseInt(estado as any);
    await this.criterioRepository.save(criterio);

    if (criterio.productos?.length) {
      for (const producto of criterio.productos) {
        producto.estado = parseInt(estado as any);
        await this.productoRepository.save(producto);
      }
    }

    return criterio;
  }
}
