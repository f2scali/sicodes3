import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Linea } from 'src/entities/linea.entity';
import { Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';

@Injectable()
export class LineaServices {
  private readonly estadoService: EstadoService;
  private readonly queryService: QueryService<Linea>;
  constructor(
    @InjectRepository(Linea)
    private lineaRepository: Repository<Linea>,
  ) {
    this.estadoService = new EstadoService(this.lineaRepository);
    this.queryService = new QueryService(this.lineaRepository);
  }

  findAllActivos(): Promise<Linea[]> {
    return this.estadoService.findAllActivos();
  }

  async findLineaWithQuery(
    query: QueryDTO,
  ): Promise<{ data: Linea[]; total: number }> {
    const validOrderFields = ['id', 'detalle'];
    return this.queryService.findWithQuery(query, validOrderFields);
  }

  findOne(id: string): Promise<Linea | null> {
    return this.lineaRepository.findOneBy({ id });
  }

  async createLinea(data: Partial<Linea>): Promise<Linea> {
    const lineaExistente = await this.lineaRepository.findOneBy({
      detalle: data.detalle,
    });

    if (lineaExistente) {
      throw new HttpException(
        `La linea ${data.detalle} ya está registrada.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newLinea = this.lineaRepository.create(data);
    return this.lineaRepository.save(newLinea);
  }

  async cambiarEstado(id: number, estado: number): Promise<Linea> {
    return this.estadoService.cambiarEstado('id', id, estado);
  }
}
