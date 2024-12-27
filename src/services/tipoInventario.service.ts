import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Linea } from 'src/entities/linea.entity';
import { TipoInventario } from 'src/entities/tipoInventario.entity';
import { Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';
import { CreateTipoInventarioDTO } from 'src/DTOs/tipoInventario.dto';

@Injectable()
export class TipoInventarioServices {
  private readonly estadoService: EstadoService;
  private readonly queryService: QueryService<TipoInventario>;
  constructor(
    @InjectRepository(TipoInventario)
    private tipoInventarioRepository: Repository<TipoInventario>,
  ) {
    this.estadoService = new EstadoService(this.tipoInventarioRepository);
    this.queryService = new QueryService(this.tipoInventarioRepository);
  }

  findAllActivos(): Promise<TipoInventario[]> {
    return this.estadoService.findAllActivos();
  }

  async findTipoInventarioWithQuery(
    query: QueryDTO,
  ): Promise<{ data: TipoInventario[]; total: number }> {
    const validOrderFields = ['ID', 'Detalle'];
    return this.queryService.findWithQuery(query, validOrderFields);
  }

  findOne(id: number): Promise<TipoInventario | null> {
    return this.tipoInventarioRepository.findOneBy({ id });
  }

  async createTipoInventario(
    data: CreateTipoInventarioDTO,
  ): Promise<TipoInventario> {
    const newTipoInventario = this.tipoInventarioRepository.create(data);
    return this.tipoInventarioRepository.save(newTipoInventario);
  }
  async updateTipoInventario(
    id: number,
    data: Partial<TipoInventario>,
  ): Promise<TipoInventario> {
    const tipoInventario = await this.tipoInventarioRepository.findOneBy({
      id,
    });

    if (!tipoInventario) {
      throw new HttpException(
        'Tipo de Inventario no encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedTipoInventario = this.tipoInventarioRepository.merge(
      tipoInventario,
      data,
    );
    return this.tipoInventarioRepository.save(updatedTipoInventario);
  }

  async cambiarEstado(ID: number, estado: number): Promise<TipoInventario> {
    return this.estadoService.cambiarEstado('ID', ID, estado);
  }
}
