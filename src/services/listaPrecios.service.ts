import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaPrecios } from 'src/entities/listaPrecios.entity';
import { Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';
import { CreateListaPreciosDTO } from 'src/DTOs/listaPrecios.dto';

@Injectable()
export class ListaPreciosServices {
  private readonly estadoService: EstadoService;
  private readonly queryService: QueryService<ListaPrecios>;
  constructor(
    @InjectRepository(ListaPrecios)
    private listaPreciosRepository: Repository<ListaPrecios>,
  ) {
    this.estadoService = new EstadoService(this.listaPreciosRepository);
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

  async cambiarEstado(id: number, estado: number): Promise<ListaPrecios> {
    return this.estadoService.cambiarEstado('id', id, estado);
  }
}
