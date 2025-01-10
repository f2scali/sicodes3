import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaPrecios } from 'src/entities/listaPrecios.entity';
import { EntityManager, Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';
import { CreateListaPreciosDTO } from 'src/DTOs/listaPrecios.dto';
import { DetalleListaPrecios } from 'src/entities/detListaPrecio.entity';
import { Producto } from 'src/entities/producto.entity';
import { Cliente } from 'src/entities/cliente.entity';

@Injectable()
export class ListaPreciosServices {
  private readonly estadoService: EstadoService;
  private readonly queryService: QueryService<ListaPrecios>;
  constructor(
    @InjectRepository(ListaPrecios)
    private listaPreciosRepository: Repository<ListaPrecios>,

    @InjectRepository(DetalleListaPrecios)
    private readonly detListaPrecioRepository: Repository<DetalleListaPrecios>,

    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    private readonly entityManager: EntityManager,
  ) {
    this.estadoService = new EstadoService(
      this.listaPreciosRepository,
      this.entityManager,
    );
    this.queryService = new QueryService(this.listaPreciosRepository);
  }

  findAllActivos(): Promise<ListaPrecios[]> {
    return this.estadoService.findAllActivos();
  }

  async findListaPreciosWithQuery(
    query: QueryDTO,
  ): Promise<{ data: ListaPrecios[]; total: number }> {
    const validOrderFields = ['DETALLE', 'codLista'];
    return this.queryService.findWithQuery(query, validOrderFields);
  }

  findOne(id: number): Promise<ListaPrecios | null> {
    return this.listaPreciosRepository.findOneBy({ id });
  }

  async createListaPrecios(data: CreateListaPreciosDTO): Promise<ListaPrecios> {
    const newListaPrecios = this.listaPreciosRepository.create(data);
    return this.listaPreciosRepository.save(newListaPrecios);
  }

  async updateListaPrecios(
    id: number,
    data: Partial<ListaPrecios>,
  ): Promise<ListaPrecios> {
    const listaPrecios = await this.listaPreciosRepository.findOneBy({ id });
    if (!listaPrecios) {
      throw new HttpException(
        'Lista de precios no encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    if (data.codLista) {
      const existing = await this.listaPreciosRepository.findOneBy({
        codLista: data.codLista,
      });

      if (existing && existing.id !== id) {
        throw new HttpException(
          'El código ya está en uso',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    const updateListaPrecio = this.listaPreciosRepository.merge(
      listaPrecios,
      data,
    );
    return this.listaPreciosRepository.save(updateListaPrecio);
  }

  async cambiarEstado(id: number, estado: number): Promise<ListaPrecios> {
    const lista = await this.listaPreciosRepository.findOne({
      where: { id },
      relations: ['listasDePrecio', 'clientes'],
    });

    if (!lista) {
      throw new NotFoundException(`linea with ID ${id} not found`);
    }

    lista.estado = parseInt(estado as any);
    await this.listaPreciosRepository.save(lista);

    if (lista.listasDePrecio?.length) {
      for (const detListaPrecio of lista.listasDePrecio) {
        detListaPrecio.estado = parseInt(estado as any);
        await this.detListaPrecioRepository.save(detListaPrecio);
      }
    }

    if (lista.clientes?.length) {
      for (const cliente of lista.clientes) {
        cliente.estado = parseInt(estado as any);
        await this.clienteRepository.save(cliente);
      }
    }

    return lista;
  }
}
