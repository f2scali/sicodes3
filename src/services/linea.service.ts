import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Linea } from 'src/entities/linea.entity';
import { Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';
import { CreateLineaDTO } from 'src/DTOs/linea.dto';
import { TipoInventario } from 'src/entities/tipoInventario.entity';

@Injectable()
export class LineaServices {
  private readonly estadoService: EstadoService;
  private readonly queryService: QueryService<Linea>;
  constructor(
    @InjectRepository(Linea)
    private lineaRepository: Repository<Linea>,
    @InjectRepository(TipoInventario)
    private tipoInventarioRepository: Repository<TipoInventario>,
  ) {
    this.estadoService = new EstadoService(this.lineaRepository);
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
    return this.estadoService.cambiarEstado('id', id, estado);
  }
}
