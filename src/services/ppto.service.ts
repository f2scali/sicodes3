import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryDTO } from 'src/DTOs/query.dto';
import { QueryService } from './query.service';
import { Ppto } from 'src/entities/ppto.entity';
import { CreatePptoDTO } from 'src/DTOs/ppto.dto';

@Injectable()
export class PptoServices {
  private readonly estadoService: EstadoService;
  private readonly queryService: QueryService<Ppto>;
  constructor(
    @InjectRepository(Ppto)
    private pptoRepository: Repository<Ppto>,
  ) {
    this.estadoService = new EstadoService(this.pptoRepository);
    this.queryService = new QueryService(this.pptoRepository);
  }

  findAllActivos(): Promise<Ppto[]> {
    return this.estadoService.findAllActivos();
  }

  async findPptosWithQuery(
    query: QueryDTO,
  ): Promise<{ data: Ppto[]; total: number }> {
    const validOrderFields = ['id_Vendedor', 'AÑO'];
    return this.queryService.findWithQuery(query, validOrderFields);
  }

  findOne(id: number): Promise<Ppto | null> {
    return this.pptoRepository.findOneBy({ id });
  }

  async createPpto(data: CreatePptoDTO): Promise<Ppto> {
    const newPpto = this.pptoRepository.create(data);
    return this.pptoRepository.save(newPpto);
  }

  async cambiarEstado(id: number, estado: number): Promise<Ppto> {
    const result = await this.pptoRepository.findOne({
      where: { id },
      relations: ['vendedor'],
    });

    if (!result) {
      throw new NotFoundException(`No se encontró el Ppto `);
    }

    if (result.vendedor.estado === 1) {
      throw new HttpException(
        `No se puede inactivar el Ppto.`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.estadoService.cambiarEstado('id', id, estado);
  }
}
