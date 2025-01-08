import { Repository } from 'typeorm';

export class QueryService<T> {
  constructor(private readonly repository: Repository<T>) {}

  async findWithQuery(
    query: {
      page?: number;
      limit?: number;
      search?: string;
      orderBy?: string;
      orderDirection?: 'ASC' | 'DESC';
    },
    searchableFields: string[] = [],
    options?: {
      relations?: string[];
      relationFilters?: { [relation: string]: { [field: string]: any } };
    },
  ): Promise<{ data: T[]; total: number; totalPages: number }> {
    const { page = 1, limit = 10, search, orderBy, orderDirection } = query;
    const { relations = [], relationFilters = {} } = options || {};
    const skip = (page - 1) * limit;

    // Crear el QueryBuilder con alias 'entity'
    const queryBuilder = this.repository.createQueryBuilder('entity');

    // Validar el campo de orden
    const orderField = searchableFields.includes(orderBy || '')
      ? orderBy
      : 'id';

    const validOrderDirections: ('ASC' | 'DESC')[] = ['ASC', 'DESC'];
    const direction = validOrderDirections.includes(
      orderDirection?.toUpperCase() as 'ASC' | 'DESC',
    )
      ? orderDirection?.toUpperCase()
      : 'ASC';

    // Filtrar por estado activo (por ejemplo)
    queryBuilder.andWhere('entity.estado = :estado', { estado: 1 });

    // Manejar búsqueda (search) con relaciones
    if (search) {
      const searchConditions = searchableFields.map((field) => {
        if (field.includes('.')) {
          const [relation, column] = field.split('.');
          return `${relation}.${column} LIKE :search`;
        }
        // Campo local
        return `entity.${field} LIKE :search`;
      });

      queryBuilder.andWhere(`(${searchConditions.join(' OR ')})`, {
        search: `%${search}%`,
      });
    }

    // Incluir relaciones
    relations.forEach((relation) => {
      queryBuilder.leftJoinAndSelect(`entity.${relation}`, relation);
    });

    // Aplicar filtros para relaciones
    Object.entries(relationFilters).forEach(([relation, filters]) => {
      Object.entries(filters).forEach(([field, value]) => {
        queryBuilder.andWhere(`${relation}.${field} = :${relation}_${field}`, {
          [`${relation}_${field}`]: value,
        });
      });
    });

    // Ordenar por el campo correspondiente
    if (orderField.includes('.')) {
      // Campo en una relación
      const [relation, column] = orderField.split('.');
      queryBuilder.orderBy(
        `${relation}.${column}`,
        direction as 'ASC' | 'DESC',
      );
    } else {
      // Campo local
      queryBuilder.orderBy(`entity.${orderField}`, direction as 'ASC' | 'DESC');
    }

    // Paginación
    queryBuilder.skip(skip).take(limit);

    // Obtener datos y total
    const [data, total] = await queryBuilder.getManyAndCount();
    const totalPages = Math.ceil(total / limit);

    return { data, total, totalPages };
  }
}
