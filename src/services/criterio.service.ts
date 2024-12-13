import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { Criterio } from 'src/entities/criterio.entity';
import { QueryDTO } from 'src/DTOs/query.dto';
import { QueryService } from './query.service';
import { CreateCriterioDTO } from 'src/DTOs/criterio.dto';

@Injectable()
export class CriterioServices {
  private readonly estadoService: EstadoService;
  private readonly queryService: QueryService<Criterio>;

  constructor(
    @InjectRepository(Criterio)
    private criterioRepository: Repository<Criterio>,
  ) {
    this.estadoService = new EstadoService(this.criterioRepository);
    this.queryService = new QueryService(this.criterioRepository);
  }

  findAllActivos(): Promise<Criterio[]> {
    return this.estadoService.findAllActivos();
  }

  async findCriterioWithQuery(
    query: QueryDTO,
  ): Promise<{ data: Criterio[]; total: number }> {
    const validOrderFields = ['Detalle'];
    return this.queryService.findWithQuery(query, validOrderFields);
  }

  findOne(id: number): Promise<Criterio | null> {
    return this.criterioRepository.findOneBy({ id });
  }

  async createCriterio(data: CreateCriterioDTO): Promise<Criterio> {
    const newCriterio = this.criterioRepository.create(data);
    return this.criterioRepository.save(newCriterio);
  }

  async cambiarEstado(id: number, estado: number): Promise<Criterio> {
    return this.estadoService.cambiarEstado('id', id, estado);
  }
}
