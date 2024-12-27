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
import { CreateClienteDTO } from 'src/DTOs/cliente.dto';
import { Vendedor } from 'src/entities/vendedor.entity';
import { TipoCliente } from 'src/entities/tipoCliente.entity';
import { ListaPrecios } from 'src/entities/listaPrecios.entity';

@Injectable()
export class ClientesServices {
  private readonly estadoService: EstadoService;
  private readonly queryService: QueryService<Cliente>;
  constructor(
    @InjectRepository(Cliente)
    private clientesRepository: Repository<Cliente>,
    @InjectRepository(Vendedor)
    private readonly vendedorRepository: Repository<Vendedor>,
    @InjectRepository(TipoCliente)
    private readonly tipoClienteRepository: Repository<TipoCliente>,
    @InjectRepository(ListaPrecios)
    private readonly listaPreciosRepository: Repository<ListaPrecios>,
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
    const validOrderFields = [
      'Descripcion',
      'NIT',
      'tipoCliente.detalle',
      'listaPrecios.detalle',
      'vendedor.nombre',
    ];
    return this.queryService.findWithQuery(query, validOrderFields, {
      relations: ['vendedor', 'listaPrecios', 'tipoCliente'],
    });
  }

  findOne(id: number): Promise<Cliente | null> {
    return this.clientesRepository.findOneBy({ id });
  }

  async createCliente(data: CreateClienteDTO): Promise<Cliente> {
    const newCliente = this.clientesRepository.create(data);
    return this.clientesRepository.save(newCliente);
  }

  async updateCliente(
    id: number,
    data: Partial<CreateClienteDTO>,
  ): Promise<Cliente> {
    const cliente = await this.clientesRepository.findOne({
      where: { id },
      relations: ['vendedor', 'listaPrecios', 'tipoCliente'],
    });

    if (data.id_Vendedor) {
      const vendedor = await this.vendedorRepository.findOne({
        where: { id: data.id_Vendedor },
      });
      if (!vendedor) {
        throw new NotFoundException(
          `No se encontró el vendedor con id ${data.id_Vendedor}`,
        );
      }
      cliente.vendedor = vendedor;
    }

    if (data.id_Tipo_Cliente) {
      const tipoCliente = await this.tipoClienteRepository.findOne({
        where: { id: data.id_Tipo_Cliente },
      });
      if (!tipoCliente) {
        throw new NotFoundException(
          `No se encontró el tipo de cliente con id ${data.id_Tipo_Cliente}`,
        );
      }
      cliente.tipoCliente = tipoCliente;
    }

    if (data.id_Lista_Precio) {
      const listaPrecios = await this.listaPreciosRepository.findOne({
        where: { id: data.id_Lista_Precio },
      });
      if (!listaPrecios) {
        throw new NotFoundException(
          `No se encontró la lista de precios con id ${data.id_Lista_Precio}`,
        );
      }
      cliente.listaPrecios = listaPrecios;
    }
    if (!cliente) {
      throw new NotFoundException(`No se encontró el cliente con id ${id}`);
    }

    const updatedCliente = this.clientesRepository.merge(cliente, data);
    return this.clientesRepository.save(updatedCliente);
  }

  async cambiarEstado(id: number, estado: number): Promise<Cliente> {
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
