// import { Injectable, NotFoundException } from '@nestjs/common';
// import { EntityManager, FindManyOptions, Repository } from 'typeorm';

// @Injectable()
// export class EstadoService {
//   constructor(
//     private readonly repository: Repository<any>,
//     private readonly entityManager: EntityManager,
//   ) {}

//   async findAllActivos(options: FindManyOptions<any> = {}): Promise<any[]> {
//     return this.repository.find({ where: { estado: 1 }, ...options });
//   }

//   // async cambiarEstado(
//   //   columna: string,
//   //   valor: any,
//   //   estado: number,
//   //   relaciones: string[] = [],
//   // ): Promise<any> {
//   //   return await this.entityManager.transaction(async (manager) => {
//   //     const entity = await manager.findOne(this.repository.target, {
//   //       where: { [columna]: valor },
//   //       relations: relaciones,
//   //     });

//   //     if (!entity) {
//   //       throw new NotFoundException(`Entity with ID ${valor} not found`);
//   //     }

//   //     (entity as any).estado = parseInt(estado as any);

//   //     if (estado === 0 && relaciones.length > 0) {
//   //       for (const relacion of relaciones) {
//   //         const relatedEntities = entity[relacion];

//   //         if (Array.isArray(relatedEntities)) {
//   //           // Update all related entities
//   //           for (const relatedEntity of relatedEntities) {
//   //             relatedEntity.estado = estado;
//   //           }

//   //           // Save all related entities in a single operation
//   //           await manager.save(relatedEntities);
//   //         }
//   //       }
//   //     }

//   //     return await manager.save(entity);
//   //   });
//   // }

//   async cambiarEstado(
//     columna: string,
//     valor: any,
//     estado: number,
//     relaciones: string[] = [],
//   ): Promise<any> {
//     return await this.entityManager.transaction(async (manager) => {
//       // Primero actualizar la entidad principal
//       const entity = await manager.findOne(this.repository.target, {
//         where: { [columna]: valor },
//         relations: relaciones,
//       });

//       if (!entity) {
//         throw new NotFoundException(`Entity with ID ${valor} not found`);
//       }

//       entity.estado = parseInt(estado as any);
//       await manager.save(entity);

//       // Luego actualizar todas las relaciones
//       if (estado === 0 && relaciones.length > 0) {
//         for (const relacion of relaciones) {
//           // Buscar todas las entidades relacionadas
//           const relatedEntities = await manager
//             .createQueryBuilder()
//             .relation(this.repository.target, relacion)
//             .of(entity)
//             .loadMany();

//           if (Array.isArray(relatedEntities)) {
//             relatedEntities.forEach((relatedEntity) => {
//               relatedEntity.estado = estado;
//             });
//             await manager.save(relatedEntities);
//           }
//         }
//       }

//       // Recargar la entidad con todas sus relaciones actualizadas
//       return await manager.findOne(this.repository.target, {
//         where: { [columna]: valor },
//         relations: relaciones,
//       });
//     });
//   }
// }

import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, FindManyOptions, Repository } from 'typeorm';

export interface RelationUpdateConfig {
  relationName: string; // nombre de la relación (ej: 'lineas')
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

      // 3. Si el estado es 0, actualizar todas las relaciones configuradas
      if (estado === 0 && relaciones.length > 0) {
        for (const config of relaciones) {
          await manager.query(`
            UPDATE ${config.tableName} 
            SET estado = ${estado} 
            WHERE ${config.foreignKeyColumn} = ${entity.id}
          `);
        }
      }

      // 4. Recargar la entidad con sus relaciones actualizadas
      return await manager.findOne(this.repository.target, {
        where: { [columna]: valor },
        relations: relaciones.map((r) => r.relationName),
      });
    });
  } //en desuso
}
