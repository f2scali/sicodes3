import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Linea } from 'src/entities/linea.entity';
import { TipoInventario } from 'src/entities/tipoInventario.entity';
import { Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';

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

  findOne(ID: number): Promise<TipoInventario | null> {
    return this.tipoInventarioRepository.findOneBy({ ID });
  }

  async createTipoInventario(
    data: Partial<TipoInventario>,
  ): Promise<TipoInventario> {
    const tipoInventarioExistente =
      await this.tipoInventarioRepository.findOneBy({
        Detalle: data.Detalle,
      });

    if (tipoInventarioExistente) {
      throw new HttpException(
        `El tipo de inventario ${data.Detalle} ya está registrada.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newTipoInventario = this.tipoInventarioRepository.create(data);
    return this.tipoInventarioRepository.save(newTipoInventario);
  }

  async cambiarEstado(ID: number, estado: number): Promise<TipoInventario> {
    return this.estadoService.cambiarEstado('ID', ID, estado);
  }
}
