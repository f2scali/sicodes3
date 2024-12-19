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
    const queryBuilder = this.repository.createQueryBuilder('entity');

    // 1. Validar `orderBy`
    const orderField = searchableFields.includes(orderBy || '')
      ? orderBy
      : 'id';

    // 2. Validar `orderDirection`
    const validOrderDirections: ('ASC' | 'DESC')[] = ['ASC', 'DESC'];
    const direction = validOrderDirections.includes(
      orderDirection?.toUpperCase() as 'ASC' | 'DESC',
    )
      ? orderDirection?.toUpperCase()
      : 'ASC';

    queryBuilder.andWhere('entity.estado = :estado', { estado: 1 });
    if (search) {
      const searchConditions = searchableFields.map(
        (field) => `${field} LIKE :search`,
      );

      queryBuilder.andWhere(`(${searchConditions.join(' OR ')})`, {
        search: `%${search}%`,
      });
    }

    relations.forEach((relation) => {
      queryBuilder.leftJoinAndSelect(`entity.${relation}`, relation);
    });

    // 5. Aplicar filtros en relaciones
    Object.entries(relationFilters).forEach(([relation, filters]) => {
      Object.entries(filters).forEach(([field, value]) => {
        queryBuilder.andWhere(`${relation}.${field} = :${relation}_${field}`, {
          [`${relation}_${field}`]: value,
        });
      });
    });

    queryBuilder.orderBy(`entity.${orderField}`, orderDirection);

    queryBuilder.skip(skip).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    const totalPages = Math.ceil(total / limit);
    return { data, total, totalPages };
  }
}
