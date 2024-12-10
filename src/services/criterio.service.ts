import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { Criterio } from 'src/entities/criterio.entity';
import { QueryDTO } from 'src/DTOs/query.dto';
import { QueryService } from './query.service';

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

  findOne(ID: string): Promise<Criterio | null> {
    return this.criterioRepository.findOneBy({ ID });
  }

  async createCriterio(data: Partial<Criterio>): Promise<Criterio> {
    const CriterioExistente = await this.criterioRepository.findOneBy({
      Detalle: data.Detalle,
    });

    if (CriterioExistente) {
      throw new HttpException(
        `El Criterio ${data.Detalle} ya está registrado.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newCriterio = this.criterioRepository.create(data);
    return this.criterioRepository.save(newCriterio);
  }

  async cambiarEstado(ID: number, estado: number): Promise<Criterio> {
    return this.estadoService.cambiarEstado('ID', ID, estado);
  }
}
