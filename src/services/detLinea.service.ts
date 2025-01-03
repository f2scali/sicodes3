import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetLineas } from 'src/entities/detLinea.entity';
import { Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';
import { CreateDetLineaDTO } from 'src/DTOs/detLinea.dto';
import { Sublinea } from 'src/entities/subLinea.entity';

@Injectable()
export class DetLineaServices {
  private readonly estadoService: EstadoService;
  private readonly queryService: QueryService<DetLineas>;
  constructor(
    @InjectRepository(DetLineas)
    private detLineaRepository: Repository<DetLineas>,

    @InjectRepository(Sublinea)
    private sublineaRepository: Repository<Sublinea>,
  ) {
    this.estadoService = new EstadoService(this.detLineaRepository);
    this.queryService = new QueryService(this.detLineaRepository);
  }

  findAllActivos(): Promise<DetLineas[]> {
    return this.estadoService.findAllActivos();
  }

  findOne(id: number): Promise<DetLineas | null> {
    return this.detLineaRepository.findOneBy({ id });
  }

  async findDetLineasWithQuery(
    query: QueryDTO,
  ): Promise<{ data: DetLineas[]; total: number }> {
    const validOrderFields = ['ID', 'DESCRIPCION', 'COSTO'];
    return this.queryService.findWithQuery(query, validOrderFields, {
      relations: ['sublinea'],
    });
  }

  async createDetLineas(data: CreateDetLineaDTO): Promise<DetLineas> {
    const newDetLineas = this.detLineaRepository.create(data);
    return this.detLineaRepository.save(newDetLineas);
  }

  async updateDetLineas(
    id: number,
    data: Partial<DetLineas>,
  ): Promise<DetLineas> {
    const detLinea = await this.detLineaRepository.findOne({
      where: { id },
      relations: ['sublinea'],
    });
    if (!detLinea) {
      throw new HttpException(
        'Detalle de sublinea no encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    if (detLinea.id_sublinea) {
      const sublinea = await this.sublineaRepository.findOne({
        where: { id: detLinea.id_sublinea },
      });

      detLinea.sublinea = sublinea;
    }
    const updateListaPrecio = this.detLineaRepository.merge(detLinea, data);
    return this.detLineaRepository.save(updateListaPrecio);
  }

  async cambiarEstado(id: number, estado: number): Promise<DetLineas> {
    return this.estadoService.cambiarEstado('id', id, estado);
  }
}
