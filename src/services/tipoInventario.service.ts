import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Linea } from 'src/entities/linea.entity';
import { TipoInventario } from 'src/entities/tipoInventario.entity';
import { EntityManager, Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';
import { CreateTipoInventarioDTO } from 'src/DTOs/tipoInventario.dto';
import { Sublinea } from 'src/entities/subLinea.entity';
import { DetLineas } from 'src/entities/detLinea.entity';
import { Criterio } from 'src/entities/criterio.entity';
import { UnidadMed } from 'src/entities/unidadMed.entity';
import { Producto } from 'src/entities/producto.entity';

@Injectable()
export class TipoInventarioServices {
  private readonly estadoService: EstadoService;
  private readonly queryService: QueryService<TipoInventario>;
  constructor(
    @InjectRepository(TipoInventario)
    private tipoInventarioRepository: Repository<TipoInventario>,
    @InjectRepository(Linea)
    private lineaRepository: Repository<Linea>,
    @InjectRepository(Sublinea)
    private sublineaRepository: Repository<Sublinea>,

    @InjectRepository(DetLineas)
    private detLineasRepository: Repository<DetLineas>,
    private readonly entityManager: EntityManager,

    @InjectRepository(Criterio)
    private criterioRepository: Repository<Criterio>,

    @InjectRepository(UnidadMed)
    private unidadMedRepository: Repository<UnidadMed>,

    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {
    this.estadoService = new EstadoService(
      this.tipoInventarioRepository,
      this.entityManager,
    );
    this.queryService = new QueryService(this.tipoInventarioRepository);
  }

  findAllActivos(): Promise<TipoInventario[]> {
    return this.estadoService.findAllActivos();
  }

  async findTipoInventarioWithQuery(
    query: QueryDTO,
  ): Promise<{ data: TipoInventario[]; total: number }> {
    const validOrderFields = ['ID', 'Detalle'];
    return this.queryService.findWithQuery(query, validOrderFields);
  }

  findOne(id: number): Promise<TipoInventario | null> {
    return this.tipoInventarioRepository.findOneBy({ id });
  }

  async createTipoInventario(
    data: CreateTipoInventarioDTO,
  ): Promise<TipoInventario> {
    const newTipoInventario = this.tipoInventarioRepository.create(data);
    return this.tipoInventarioRepository.save(newTipoInventario);
  }
  async updateTipoInventario(
    id: number,
    data: Partial<TipoInventario>,
  ): Promise<TipoInventario> {
    const tipoInventario = await this.tipoInventarioRepository.findOneBy({
      id,
    });

    if (!tipoInventario) {
      throw new HttpException(
        'Tipo de Inventario no encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedTipoInventario = this.tipoInventarioRepository.merge(
      tipoInventario,
      data,
    );
    return this.tipoInventarioRepository.save(updatedTipoInventario);
  }
  async cambiarEstado(id: number, estado: number): Promise<TipoInventario> {
    const tipoInventario = await this.tipoInventarioRepository.findOne({
      where: { id },
      relations: [
        'lineas',
        'lineas.sublineas',
        'lineas.sublineas.detLineas',
        'criterios',
        'unidadMeds',
      ],
    });

    if (!tipoInventario) {
      throw new NotFoundException(`TipoInventario with ID ${id} not found`);
    }

    tipoInventario.estado = parseInt(estado as any);
    await this.tipoInventarioRepository.save(tipoInventario);

    if (tipoInventario.lineas?.length) {
      for (const linea of tipoInventario.lineas) {
        linea.estado = parseInt(estado as any);
        await this.lineaRepository.save(linea);

        if (linea.sublineas?.length) {
          for (const sublinea of linea.sublineas) {
            sublinea.estado = parseInt(estado as any);
            await this.sublineaRepository.save(sublinea);

            if (sublinea.detLineas?.length) {
              for (const detLinea of sublinea.detLineas) {
                detLinea.estado = parseInt(estado as any);
                await this.detLineasRepository.save(detLinea);
              }
            }
          }
        }
      }
    }

    if (tipoInventario.criterios?.length) {
      for (const criterio of tipoInventario.criterios) {
        criterio.estado = parseInt(estado as any);
        await this.criterioRepository.save(criterio);
      }
    }

    if (tipoInventario.unidadMeds?.length) {
      for (const unidadMed of tipoInventario.unidadMeds) {
        unidadMed.estado = parseInt(estado as any);
        await this.unidadMedRepository.save(unidadMed);
      }
    }

    if (tipoInventario.productos?.length) {
      for (const producto of tipoInventario.productos) {
        producto.estado = parseInt(estado as any);
        await this.productoRepository.save(producto);
      }
    }
    return tipoInventario;
  }
}
