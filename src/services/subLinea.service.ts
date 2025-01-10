import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';
import { CreateSubLineaDTO } from 'src/DTOs/subLinea.dto';
import { Sublinea } from 'src/entities/subLinea.entity';
import { Linea } from 'src/entities/linea.entity';

@Injectable()
export class SubLineaServices {
  private readonly estadoService: EstadoService;
  private readonly queryService: QueryService<Sublinea>;
  constructor(
    @InjectRepository(Sublinea)
    private subLineaRepository: Repository<Sublinea>,

    @InjectRepository(Linea)
    private lineaRepository: Repository<Linea>,

    private readonly entityManager: EntityManager,
  ) {
    this.estadoService = new EstadoService(
      this.subLineaRepository,
      this.entityManager,
    );
    this.queryService = new QueryService(this.subLineaRepository);
  }

  findAllActivos(): Promise<Sublinea[]> {
    return this.estadoService.findAllActivos();
  }

  async findSublineaWithQuery(
    query: QueryDTO,
  ): Promise<{ data: Sublinea[]; total: number }> {
    const validOrderFields = ['id', 'detalle'];
    return this.queryService.findWithQuery(query, validOrderFields, {
      relations: ['linea'],
    });
  }

  findOne(id: number): Promise<Sublinea | null> {
    return this.subLineaRepository.findOneBy({ id });
  }

  async createSublinea(data: CreateSubLineaDTO): Promise<Sublinea> {
    const newSublinea = this.subLineaRepository.create(data);
    return this.subLineaRepository.save(newSublinea);
  }

  async updateSublinea(id: number, data: Partial<Sublinea>): Promise<Sublinea> {
    const sublinea = await this.subLineaRepository.findOneBy({ id });
    if (!sublinea) {
      throw new HttpException('Sublinea no encontrada', HttpStatus.NOT_FOUND);
    }

    if (sublinea.id_linea) {
      const linea = await this.lineaRepository.findOne({
        where: { id: sublinea.id_linea },
      });

      sublinea.linea = linea;
    }

    const updateListaPrecio = this.subLineaRepository.merge(sublinea, data);
    return this.subLineaRepository.save(updateListaPrecio);
  }
  async cambiarEstado(id: number, estado: number): Promise<Sublinea> {
    return this.estadoService.cambiarEstado('id', id, estado);
  }
}
