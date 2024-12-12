import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sublinea } from 'src/entities/subLinea.entity';
import { Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';
import { CreateSubLineaDTO } from 'src/DTOs/subLinea.dto';

@Injectable()
export class SubLineaServices {
  private readonly estadoService: EstadoService;
  private readonly queryService: QueryService<Sublinea>;
  constructor(
    @InjectRepository(Sublinea)
    private subLineaRepository: Repository<Sublinea>,
  ) {
    this.estadoService = new EstadoService(this.subLineaRepository);
    this.queryService = new QueryService(this.subLineaRepository);
  }

  findAllActivos(): Promise<Sublinea[]> {
    return this.estadoService.findAllActivos();
  }

  async findSublineaWithQuery(
    query: QueryDTO,
  ): Promise<{ data: Sublinea[]; total: number }> {
    const validOrderFields = ['id', 'detalle'];
    return this.queryService.findWithQuery(query, validOrderFields);
  }

  findOne(id: number): Promise<Sublinea | null> {
    return this.subLineaRepository.findOneBy({ id });
  }

  async createSublinea(data: CreateSubLineaDTO): Promise<Sublinea> {
    const newSublinea = this.subLineaRepository.create(data);
    return this.subLineaRepository.save(newSublinea);
  }

  async cambiarEstado(id: number, estado: number): Promise<Sublinea> {
    return this.estadoService.cambiarEstado('id', id, estado);
  }
}
