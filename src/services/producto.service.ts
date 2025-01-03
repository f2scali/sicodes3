import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/entities/producto.entity';
import { Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';
import { CreateProductoDTO } from 'src/DTOs/producto.dto';
import { TipoInventario } from 'src/entities/tipoInventario.entity';
import { Linea } from 'src/entities/linea.entity';
import { UnidadMed } from 'src/entities/unidadMed.entity';
import { Criterio } from 'src/entities/criterio.entity';

@Injectable()
export class ProductoServices {
  private readonly estadoService: EstadoService;
  private readonly queryService: QueryService<Producto>;
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,

    @InjectRepository(TipoInventario)
    private tipoInventarioRepository: Repository<TipoInventario>,

    @InjectRepository(Linea)
    private lineaRepository: Repository<Linea>,

    @InjectRepository(UnidadMed)
    private unidadMedRepository: Repository<UnidadMed>,

    @InjectRepository(Criterio)
    private criterioRepository: Repository<Criterio>,
  ) {
    this.estadoService = new EstadoService(this.productoRepository);
    this.queryService = new QueryService(this.productoRepository);
  }

  findAllActive(): Promise<Producto[]> {
    return this.estadoService.findAllActivos();
  }

  async findProductosWithQuery(
    query: QueryDTO,
  ): Promise<{ data: Producto[]; total: number }> {
    const validOrderFields = [
      'id_item',
      'id_ext_item',
      'descripcion',
      'id_referencia',
      'linea.detalle',
      'criterio.Detalle',
      'unidadMed.Detalle',
      'tipoInventario.detalle',
    ];
    return this.queryService.findWithQuery(query, validOrderFields, {
      relations: ['linea', 'criterio', 'unidadMed', 'tipoInventario'],
    });
  }
  findOne(id: number): Promise<Producto | null> {
    return this.productoRepository.findOneBy({ id });
  }

  findByProductoId(id_item: string, id_ext_item: string): Promise<Producto> {
    return this.productoRepository.findOne({
      where: {
        id_item,
        id_ext_item,
      },
    });
  }

  async createProducto(data: CreateProductoDTO): Promise<Producto> {
    const newProducto = this.productoRepository.create(data);
    return this.productoRepository.save(newProducto);
  }

  async updateProducto(
    id: number,
    data: Partial<CreateProductoDTO>,
  ): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: ['tipoInventario', 'linea', 'unidadMed', 'criterio'],
    });

    if (data.id_inventario) {
      const tipoInventario = await this.tipoInventarioRepository.findOne({
        where: { id: data.id_inventario },
      });
      if (!tipoInventario) {
        throw new NotFoundException(`No se encontró el tipo de inventario`);
      }
      producto.tipoInventario = tipoInventario;
    }

    if (data.id_linea) {
      const linea = await this.lineaRepository.findOne({
        where: { id: data.id_linea },
      });
      if (!linea) {
        throw new NotFoundException(`No se encontró la linea`);
      }
      producto.linea = linea;
    }

    if (data.unimed_inv_1) {
      const unidadMed = await this.unidadMedRepository.findOne({
        where: { id: data.unimed_inv_1 },
      });
      if (!unidadMed) {
        throw new NotFoundException(`No se encontró la unidad de medida`);
      }
      producto.unidadMed = unidadMed;
    }
    if (!producto) {
      throw new NotFoundException(`No se encontró el producto`);
    }

    const updatedProducto = this.productoRepository.merge(producto, data);
    return this.productoRepository.save(updatedProducto);
  }
  async cambiarEstado(id: number, estado: number): Promise<Producto> {
    return this.estadoService.cambiarEstado('id', id, estado);
  }
}
