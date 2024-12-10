import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UnidadMed } from 'src/entities/unidadMed.entity';
import { Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';

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
    const validOrderFields = ['ID', 'Detalle'];
    return this.queryService.findWithQuery(query, validOrderFields);
  }

  findOne(ID: string): Promise<UnidadMed | null> {
    return this.unidadMedRepository.findOneBy({ ID });
  }

  async createUnidadMed(data: Partial<UnidadMed>): Promise<UnidadMed> {
    const unidadMedExistente = await this.unidadMedRepository.findOneBy({
      Detalle: data.Detalle,
    });

    if (unidadMedExistente) {
      throw new HttpException(
        `La unidad de med ${data.Detalle} ya está registrado.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUnidadMed = this.unidadMedRepository.create(data);
    return this.unidadMedRepository.save(newUnidadMed);
  }

  async cambiarEstado(ID: number, estado: number): Promise<UnidadMed> {
    return this.estadoService.cambiarEstado('ID', ID, estado);
  }
}
