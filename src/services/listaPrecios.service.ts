import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaPrecios } from 'src/entities/listaPrecios.entity';
import { Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';

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
    const validOrderFields = ['DETALLE'];
    return this.queryService.findWithQuery(query, validOrderFields);
  }

  findOne(ID_LISTA: number): Promise<ListaPrecios | null> {
    return this.listaPreciosRepository.findOneBy({ ID_LISTA });
  }

  async createListaPrecios(data: Partial<ListaPrecios>): Promise<ListaPrecios> {
    const listaPreciosExistente = await this.listaPreciosRepository.findOneBy({
      DETALLE: data.DETALLE,
    });

    if (listaPreciosExistente) {
      throw new HttpException(
        `El usuario ${data.DETALLE} ya está registrado.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newListaPrecios = this.listaPreciosRepository.create(data);
    return this.listaPreciosRepository.save(newListaPrecios);
  }

  async cambiarEstado(ID_LISTA: number, estado: number): Promise<ListaPrecios> {
    return this.estadoService.cambiarEstado('ID_LISTA', ID_LISTA, estado);
  }
}
