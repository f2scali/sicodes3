import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/entities/producto.entity';
import { Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';

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
    const validOrderFields = ['ID', 'DESCRIPCION', 'COSTO'];
    return this.queryService.findWithQuery(query, validOrderFields);
  }
  findOne(ID: number): Promise<Producto | null> {
    return this.productoRepository.findOneBy({ ID });
  }

  findByProductoId(ID_Producto: string): Promise<Producto> {
    return this.productoRepository.findOneBy({ ID_Producto });
  }

  async createProducto(data: Partial<Producto>): Promise<Producto> {
    const { ID_ITEM, ID_EXT_ITM } = data;
    const productoExistente = await this.productoRepository.findOne({
      where: {
        ID_ITEM,
        ID_EXT_ITM: ID_EXT_ITM || null,
      },
    });

    if (productoExistente) {
      throw new HttpException(
        `El producto ya está registrado.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newProducto = this.productoRepository.create(data);
    return this.productoRepository.save(newProducto);
  }

  async cambiarEstado(ID: number, estado: number): Promise<Producto> {
    return this.estadoService.cambiarEstado('ID', ID, estado);
  }
}
