import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Linea } from 'src/entities/linea.entity';
import { EntityManager, Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';
import { CreateLineaDTO } from 'src/DTOs/linea.dto';
import { DetLineas } from 'src/entities/detLinea.entity';
import { Sublinea } from 'src/entities/subLinea.entity';
import { TipoInventario } from 'src/entities/tipoInventario.entity';
import { Producto } from 'src/entities/producto.entity';
import { DetalleListaPrecios } from 'src/entities/detListaPrecio.entity';

@Injectable()
export class LineaServices {
  private readonly estadoService: EstadoService;
  private readonly queryService: QueryService<Linea>;
  constructor(
    @InjectRepository(Linea)
    private lineaRepository: Repository<Linea>,
    @InjectRepository(TipoInventario)
    private tipoInventarioRepository: Repository<TipoInventario>,
    @InjectRepository(Sublinea)
    private sublineaRepository: Repository<Sublinea>,

    @InjectRepository(DetLineas)
    private readonly detLineasRepository: Repository<DetLineas>,

    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,

    private readonly entityManager: EntityManager,
  ) {
    this.estadoService = new EstadoService(
      this.lineaRepository,
      this.entityManager,
    );
    this.queryService = new QueryService(this.lineaRepository);
  }

  findAllActivos(): Promise<Linea[]> {
    return this.estadoService.findAllActivos();
  }

  async findLineaWithQuery(
    query: QueryDTO,
  ): Promise<{ data: Linea[]; total: number }> {
    const validOrderFields = [
      'entity.codLinea',
      'entity.detalle',
      'tipoInventario.detalle',
    ];
    return this.queryService.findWithQuery(query, validOrderFields, {
      relations: ['tipoInventario'],
    });
  }

  findOne(id: number): Promise<Linea | null> {
    return this.lineaRepository.findOneBy({ id });
  }

  async createLinea(data: CreateLineaDTO): Promise<Linea> {
    const newLinea = this.lineaRepository.create(data);
    return this.lineaRepository.save(newLinea);
  }

  async updateLinea(id: number, data: Partial<CreateLineaDTO>): Promise<Linea> {
    const linea = await this.lineaRepository.findOne({
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
      linea.tipoInventario = tipoInventario;
    }

    if (!linea) {
      throw new NotFoundException(`No se encontró el cliente con id ${id}`);
    }

    const updatedLinea = this.lineaRepository.merge(linea, data);
    return this.lineaRepository.save(updatedLinea);
  }

  async cambiarEstado(id: number, estado: number): Promise<Linea> {
    const linea = await this.lineaRepository.findOne({
      where: { id },
      relations: [
        'sublineas',
        'sublineas.detLineas',
        'productos',
        'detListaPrecios',
      ],
    });

    if (!linea) {
      throw new NotFoundException(`linea with ID ${id} not found`);
    }

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

    if (linea.productos?.length) {
      for (const producto of linea.productos) {
        producto.estado = parseInt(estado as any);
        await this.productoRepository.save(producto);
      }
    }

    return linea;
  }
}
