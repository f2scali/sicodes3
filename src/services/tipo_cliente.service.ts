import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoCliente } from 'src/entities/tipoCliente.entity';
import { Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';
import { CreateTipoClienteDTO } from 'src/DTOs/tipoCliente.dto';

@Injectable()
export class TipoClienteServices {
  private readonly estadoService: EstadoService;
  private readonly queryService: QueryService<TipoCliente>;
  constructor(
    @InjectRepository(TipoCliente)
    private tipoClienteRepository: Repository<TipoCliente>,
  ) {
    this.estadoService = new EstadoService(this.tipoClienteRepository);
    this.queryService = new QueryService(this.tipoClienteRepository);
  }

  findAllActivos(): Promise<TipoCliente[]> {
    return this.estadoService.findAllActivos();
  }

  async findTipoClienteWithQuery(
    query: QueryDTO,
  ): Promise<{ data: TipoCliente[]; total: number }> {
    const validOrderFields = ['ID', 'Detalle'];
    return this.queryService.findWithQuery(query, validOrderFields);
  }

  findOne(id: number): Promise<TipoCliente | null> {
    return this.tipoClienteRepository.findOneBy({ id });
  }

  async createTipoCliente(data: CreateTipoClienteDTO): Promise<TipoCliente> {
    const newTipoCliente = this.tipoClienteRepository.create(data);
    return this.tipoClienteRepository.save(newTipoCliente);
  }

  async updateTipoCliente(
    id: number,
    data: Partial<TipoCliente>,
  ): Promise<TipoCliente> {
    const tipoCliente = await this.tipoClienteRepository.findOneBy({ id });

    if (!tipoCliente) {
      throw new HttpException(
        'Tipo de cliente no encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedTipoCliente = this.tipoClienteRepository.merge(
      tipoCliente,
      data,
    );
    return this.tipoClienteRepository.save(updatedTipoCliente);
  }

  async cambiarEstado(id: number, estado: number): Promise<TipoCliente> {
    return this.estadoService.cambiarEstado('id', id, estado);
  }
}
