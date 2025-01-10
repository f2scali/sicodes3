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
import { EntityManager, Repository } from 'typeorm';
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

    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,

    @InjectRepository(ListaPrecios)
    private listaPreciosRepository: Repository<ListaPrecios>,

    private readonly entityManager: EntityManager,
  ) {
    this.estadoService = new EstadoService(
      this.detalleListaPrecioRepository,
      this.entityManager,
    );
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

  async updateDetalleListaPrecios(
    id: number,
    data: Partial<CreateDetListaPrecioDTO>,
  ): Promise<DetalleListaPrecios> {
    const detalleListaPrecios = await this.detalleListaPrecioRepository.findOne(
      {
        where: { id },
        relations: ['producto', 'listaPrecios'],
      },
    );

    if (data.id_producto) {
      const producto = await this.productoRepository.findOne({
        where: { id: data.id_producto },
      });
      if (!producto) {
        throw new NotFoundException(
          `No se encontró el producto con id ${data.id_producto}`,
        );
      }
      detalleListaPrecios.producto = producto;
    }

    if (data.idListaPrecio) {
      const listaPrecio = await this.listaPreciosRepository.findOne({
        where: { id: data.idListaPrecio },
      });
      if (!listaPrecio) {
        throw new NotFoundException(
          `No se encontró la lista de precio con id ${data.idListaPrecio}`,
        );
      }
      detalleListaPrecios.listaPrecios = listaPrecio;
    }

    const updatedDetalleListaPrecios = this.detalleListaPrecioRepository.merge(
      detalleListaPrecios,
      data,
    );
    return this.detalleListaPrecioRepository.save(updatedDetalleListaPrecios);
  }
  async cambiarEstado(
    id: number,
    idProducto: number,
    idListaPrecio: number,
    estado: number,
  ): Promise<DetalleListaPrecios> {
    const result = await this.detalleListaPrecioRepository.findOne({
      where: {
        id,
        producto: { id: idProducto },
        listaPrecios: { id: idListaPrecio },
      },
      relations: ['producto', 'listaPrecios'],
    });

    if (!result) {
      throw new NotFoundException(
        `No se encontró registro 
        `,
      );
    }

    result.estado = parseInt(estado as any);
    await this.detalleListaPrecioRepository.save(result);

    return this.detalleListaPrecioRepository.save(result);
  }
}
