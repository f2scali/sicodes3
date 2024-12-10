import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoCliente } from 'src/entities/tipoCliente.entity';
import { Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';

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

  findOne(ID: number): Promise<TipoCliente | null> {
    return this.tipoClienteRepository.findOneBy({ ID });
  }

  async createTipoCliente(data: Partial<TipoCliente>): Promise<TipoCliente> {
    const tipoClienteExistente = await this.tipoClienteRepository.findOneBy({
      Detalle: data.Detalle,
    });

    if (tipoClienteExistente) {
      throw new HttpException(
        `El usuario ${data.Detalle} ya está registrado.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newTipoCliente = this.tipoClienteRepository.create(data);
    return this.tipoClienteRepository.save(newTipoCliente);
  }

  async cambiarEstado(ID: number, estado: number): Promise<TipoCliente> {
    return this.estadoService.cambiarEstado('ID', ID, estado);
  }
}
