import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class EstadoService {
  constructor(private readonly repository: Repository<any>) {}

  async findAllActivos(options: FindManyOptions<any> = {}): Promise<any[]> {
    return this.repository.find({ where: { estado: 1 }, ...options });
  }

  async cambiarEstado(
    columna: string,
    valor: any,
    estado: number,
  ): Promise<any> {
    const entity = await this.repository.findOne({
      where: { [columna]: valor },
    });
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${valor} not found`);
    }
    entity.estado = estado;

    return this.repository.save(entity);
  }
}
