import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, FindManyOptions, Repository } from 'typeorm';

export interface RelationUpdateConfig {
  relationName: string;
  tableName: string; // nombre de la tabla en la base de datos (ej: 'tbl_Linea')
  foreignKeyColumn: string; // nombre de la columna FK (ej: 'id_tipo_inv')
}

@Injectable()
export class EstadoService {
  constructor(
    private readonly repository: Repository<any>,
    private readonly entityManager: EntityManager,
  ) {}

  async findAllActivos(options: FindManyOptions<any> = {}): Promise<any[]> {
    return this.repository.find({ where: { estado: 1 }, ...options });
  }

  async cambiarEstado(
    columna: string,
    valor: any,
    estado: number,
    relaciones: RelationUpdateConfig[] = [],
  ): Promise<any> {
    return await this.entityManager.transaction(async (manager) => {
      // 1. Encontrar la entidad principal
      const entity = await manager.findOne(this.repository.target, {
        where: { [columna]: valor },
        relations: relaciones.map((r) => r.relationName),
      });

      if (!entity) {
        throw new NotFoundException(`Entity with ID ${valor} not found`);
      }

      // 2. Actualizar estado de la entidad principal
      entity.estado = parseInt(estado as any);
      await manager.save(entity);
    });
  } //en desuso
}
