import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuario.entity';
import { Vendedor } from 'src/entities/vendedor.entity';
import { Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';
import { CreateVendedorDTO } from 'src/DTOs/vendedor.dto';

@Injectable()
export class VendedorServices {
  private readonly estadoService: EstadoService;
  private readonly queryService: QueryService<Vendedor>;
  constructor(
    @InjectRepository(Vendedor)
    private vendedorRepository: Repository<Vendedor>,
  ) {
    this.estadoService = new EstadoService(this.vendedorRepository);
    this.queryService = new QueryService(this.vendedorRepository);
  }

  findAllActivos(): Promise<Vendedor[]> {
    return this.estadoService.findAllActivos({
      where: { usuario: { estado: 1 } },
    });
  }

  async findVendedorWithQuery(
    query: QueryDTO,
  ): Promise<{ data: Vendedor[]; total: number }> {
    const validOrderFields = ['NOMBRE', 'APELLIDO'];
    return this.queryService.findWithQuery(query, validOrderFields, {
      relations: ['usuario'],
      relationFilters: {
        usuario: { estado: 1 },
      },
    });
  }

  findOne(id: number): Promise<Vendedor | null> {
    return this.vendedorRepository.findOneBy({ id });
  }

  async createVendedor(data: CreateVendedorDTO): Promise<Vendedor> {
    const newVendedor = this.vendedorRepository.create(data);
    return this.vendedorRepository.save(newVendedor);
  }

  async cambiarEstado(id: number, estado: number): Promise<Vendedor> {
    const result = await this.vendedorRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });
    if (!result) {
      throw new NotFoundException('No se encontró el vendedor');
    }

    if (result.usuario.estado === 1) {
      throw new HttpException(
        `No se puede inactivar el vendedor.`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.estadoService.cambiarEstado('id', id, estado);
  }
}
