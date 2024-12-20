import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UnidadMed } from 'src/entities/unidadMed.entity';
import { Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';
import { CreateUnidadMedDTO } from 'src/DTOs/unidadMed.dto';

@Injectable()
export class UnidadMedServices {
  private readonly estadoService: EstadoService;
  private readonly queryService: QueryService<UnidadMed>;
  constructor(
    @InjectRepository(UnidadMed)
    private unidadMedRepository: Repository<UnidadMed>,
  ) {
    this.estadoService = new EstadoService(this.unidadMedRepository);
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

  async cambiarEstado(ID: number, estado: number): Promise<UnidadMed> {
    return this.estadoService.cambiarEstado('ID', ID, estado);
  }
}
