import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/entities/producto.entity';
import { Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';
import { CreateProductoDTO } from 'src/DTOs/producto.dto';

@Injectable()
export class ProductoServices {
  private readonly estadoService: EstadoService;
  private readonly queryService: QueryService<Producto>;
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
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

  async cambiarEstado(id: number, estado: number): Promise<Producto> {
    return this.estadoService.cambiarEstado('id', id, estado);
  }
}
