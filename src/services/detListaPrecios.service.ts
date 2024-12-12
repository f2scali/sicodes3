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
    const validOrderFields = ['PRECIO'];
    return this.queryService.findWithQuery(query, validOrderFields);
  }
  async findByProductAndLista(
    ID_Producto: number,
    id_Lista_Precios: string,
  ): Promise<DetalleListaPrecios[]> {
    const results = await this.estadoService.findAllActivos({
      where: {
        ID_Producto,
        id_Lista_Precios,
        estado: 1,
        producto: { estado: 1 },
        listaPrecios: { estado: 1 },
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
    data: Partial<DetalleListaPrecios>,
  ): Promise<DetalleListaPrecios> {
    const { ID_Producto, id_Lista_Precios } = data;

    // Verificar si el registro ya existe
    const detalleListaPreciosExistente =
      await this.detalleListaPrecioRepository.findOne({
        where: { ID_Producto, id_Lista_Precios },
      });

    if (detalleListaPreciosExistente) {
      throw new HttpException(
        `El registro con ID_Producto '${ID_Producto}' y id_Lista_Precios '${id_Lista_Precios}' ya existe.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Verificar la existencia del Producto relacionado
    const productoExistente =
      await this.detalleListaPrecioRepository.manager.findOne(Producto, {
        where: { ID_Producto },
      });

    if (!productoExistente) {
      throw new HttpException(
        `No se encontró un producto con ID '${ID_Producto}'.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Verificar la existencia de la Lista de Precios relacionada
    const listaPreciosExistente =
      await this.detalleListaPrecioRepository.manager.findOne(ListaPrecios, {
        where: { ID_LISTA: id_Lista_Precios },
      });

    if (!listaPreciosExistente) {
      throw new HttpException(
        `No se encontró una lista de precios con ID '${id_Lista_Precios}'.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Crear el nuevo registro
    const newDetalleListaPrecios =
      this.detalleListaPrecioRepository.create(data);
    return this.detalleListaPrecioRepository.save(newDetalleListaPrecios);
  }

  async cambiarEstado(
    ID_Producto: string,
    id_Lista_Precios: string,
    estado: number,
  ): Promise<DetalleListaPrecios> {
    const result = await this.detalleListaPrecioRepository.findOne({
      where: { ID_Producto, id_Lista_Precios },
      relations: ['producto', 'listaPrecios'],
    });
    if (!result) {
      throw new NotFoundException(
        `No se encontró un registro con ID_Producto ${ID_Producto} y id_Lista_Precios ${id_Lista_Precios}.`,
      );
    }

    // if (result.producto.estado === 1 || result.listaPrecios.estado === 1) {
    //   throw new HttpException(
    //     `No se puede inactivar porque el producto o la lista de precios están activos.`,
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    result.estado = estado;
    return this.detalleListaPrecioRepository.save(result);
  }
}
