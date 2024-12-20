import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleListaPrecios } from 'src/entities/detListaPrecio.entity';
import { ListaPrecios } from 'src/entities/listaPrecios.entity';
import { Producto } from 'src/entities/producto.entity';
import { Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';
import { CreateDetListaPrecioDTO } from 'src/DTOs/detListaPrecios.dto';

@Injectable()
export class DetListaPrecioServices {
  private readonly estadoService: EstadoService;
  private readonly queryService: QueryService<DetalleListaPrecios>;
  constructor(
    @InjectRepository(DetalleListaPrecios)
    private detalleListaPrecioRepository: Repository<DetalleListaPrecios>,
  ) {
    this.estadoService = new EstadoService(this.detalleListaPrecioRepository);
    this.queryService = new QueryService(this.detalleListaPrecioRepository);
  }

  findAllActivos(): Promise<DetalleListaPrecios[]> {
    return this.estadoService.findAllActivos({
      where: {
        estado: 1,
        producto: { estado: 1 },
        listaPrecios: { estado: 1 },
      },
      relations: ['producto', 'listaPrecios'],
    });
  }

  async findDetalleListaPreciosWithQuery(
    query: QueryDTO,
  ): Promise<{ data: DetalleListaPrecios[]; total: number }> {
    const validOrderFields = [
      'PRECIO',
      'producto.descripcion',
      'listaPrecios.detalle',
    ];
    return this.queryService.findWithQuery(query, validOrderFields, {
      relations: ['producto', 'listaPrecios'],
      relationFilters: {
        producto: { estado: 1 },
        listaPrecios: { estado: 1 },
      },
    });
  }
  async findByProductAndLista(
    id_producto: number,
    idListaPrecio: number,
  ): Promise<DetalleListaPrecios[]> {
    const results = await this.estadoService.findAllActivos({
      where: {
        producto: { id: id_producto, estado: 1 },
        listaPrecios: { id: idListaPrecio, estado: 1 },
        estado: 1,
      },
      relations: ['producto', 'listaPrecios'],
    });

    console.log(results.length);
    if (!results.length) {
      throw new HttpException(
        `No se encontraron registros activos.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return results;
  }

  async createDetalleListaPrecios(
    data: CreateDetListaPrecioDTO,
  ): Promise<DetalleListaPrecios> {
    const newDetalleListaPrecios =
      this.detalleListaPrecioRepository.create(data);
    return this.detalleListaPrecioRepository.save(newDetalleListaPrecios);
  }

  async cambiarEstado(
    id_item: string,
    id_ext_item: string,
    idListaPrecio: number,
    estado: number,
  ): Promise<DetalleListaPrecios> {
    const result = await this.detalleListaPrecioRepository.findOne({
      where: {
        producto: { id_item, id_ext_item },
        listaPrecios: { id: idListaPrecio },
      },
      relations: ['producto', 'listaPrecios'],
    });

    if (!result) {
      throw new NotFoundException(
        `No se encontró registro ${id_item}` + id_ext_item
          ? ` y ${id_ext_item}`
          : '',
      );
    }

    if (result.producto.estado === 1 || result.listaPrecios.estado === 1) {
      throw new HttpException(
        `No se puede inactivar porque el producto o la lista de precios están activos.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    result.estado = estado;
    return this.detalleListaPrecioRepository.save(result);
  }
}
