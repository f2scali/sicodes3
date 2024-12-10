import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/entities/cliente.entity';
import { Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryDTO } from 'src/DTOs/query.dto';
import { QueryService } from './query.service';

@Injectable()
export class ClientesServices {
  private readonly estadoService: EstadoService;
  private readonly queryService: QueryService<Cliente>;
  constructor(
    @InjectRepository(Cliente)
    private clientesRepository: Repository<Cliente>,
  ) {
    this.estadoService = new EstadoService(this.clientesRepository);
    this.queryService = new QueryService(this.clientesRepository);
  }

  findAllActivos(): Promise<Cliente[]> {
    return this.estadoService.findAllActivos();
  }

  async findClientesWithQuery(
    query: QueryDTO,
  ): Promise<{ data: Cliente[]; total: number }> {
    const validOrderFields = ['Descripcion', 'NIT'];
    return this.queryService.findWithQuery(query, validOrderFields);
  }

  findOne(id: string): Promise<Cliente | null> {
    return this.clientesRepository.findOneBy({ id });
  }

  async createCliente(data: Partial<Cliente>): Promise<Cliente> {
    const clienteExistente = await this.clientesRepository.findOneBy({
      id: data.id,
    });

    if (clienteExistente) {
      throw new HttpException(
        `El cliente ${data.id} ya está registrado.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newCliente = this.clientesRepository.create(data);
    return this.clientesRepository.save(newCliente);
  }

  async cambiarEstado(id: string, estado: number): Promise<Cliente> {
    const result = await this.clientesRepository.findOne({
      where: { id },
      relations: ['vendedor', 'listaPrecios', 'tipoCliente'],
    });

    if (!result) {
      throw new NotFoundException(`No se encontró el cliente `);
    }

    if (
      result.listaPrecios.estado === 1 ||
      result.vendedor.estado === 1 ||
      result.tipoCliente.estado === 1
    ) {
      throw new HttpException(
        `No se puede inactivar el cliente.`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.estadoService.cambiarEstado('id', id, estado);
  }
}
