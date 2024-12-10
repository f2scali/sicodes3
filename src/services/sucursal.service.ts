import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sucursal } from 'src/entities/sucursal.entity';
import { Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';

@Injectable()
export class SucursalServices {
  private readonly estadoService: EstadoService;
  private readonly queryService: QueryService<Sucursal>;
  constructor(
    @InjectRepository(Sucursal)
    private sucursalRepository: Repository<Sucursal>,
  ) {
    this.estadoService = new EstadoService(this.sucursalRepository);
    this.queryService = new QueryService(this.sucursalRepository);
  }

  findAllActivos(): Promise<Sucursal[]> {
    return this.estadoService.findAllActivos();
  }

  async findSucursalWithQuery(
    query: QueryDTO,
  ): Promise<{ data: Sucursal[]; total: number }> {
    const validOrderFields = ['ID', 'Descripcion', 'Telefono', 'Direccion'];
    return this.queryService.findWithQuery(query, validOrderFields);
  }

  findOne(ID: number): Promise<Sucursal | null> {
    return this.sucursalRepository.findOneBy({ ID });
  }

  async createSucursal(data: Partial<Sucursal>): Promise<Sucursal> {
    const newSucursal = this.sucursalRepository.create(data);
    return this.sucursalRepository.save(newSucursal);
  }

  async cambiarEstado(ID: number, estado: number): Promise<Sucursal> {
    return this.estadoService.cambiarEstado('ID', ID, estado);
  }
}
