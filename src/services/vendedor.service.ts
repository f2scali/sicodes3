import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuario.entity';
import { Vendedor } from 'src/entities/vendedor.entity';
import { EntityManager, Repository } from 'typeorm';
import { EstadoService } from './estado.service';
import { QueryService } from './query.service';
import { QueryDTO } from 'src/DTOs/query.dto';
import { CreateVendedorDTO } from 'src/DTOs/vendedor.dto';
import { Cliente } from 'src/entities/cliente.entity';

@Injectable()
export class VendedorServices {
  private readonly estadoService: EstadoService;
  private readonly queryService: QueryService<Vendedor>;
  constructor(
    @InjectRepository(Vendedor)
    private readonly vendedorRepository: Repository<Vendedor>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    private readonly entityManager: EntityManager,
  ) {
    this.estadoService = new EstadoService(
      this.vendedorRepository,
      this.entityManager,
    );
    this.queryService = new QueryService(this.vendedorRepository);
  }

  findAllActivos(): Promise<Vendedor[]> {
    return this.estadoService.findAllActivos();
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
    const usuario = await this.usuarioRepository.findOne({
      where: { id: data.idUsuario },
    });

    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.BAD_REQUEST);
    }

    if (usuario.id_rol !== 2) {
      throw new HttpException(
        'Solo los usuarios con rol 2 pueden ser vendedores',
        HttpStatus.FORBIDDEN,
      );
    }
    const newVendedor = this.vendedorRepository.create(data);
    return this.vendedorRepository.save(newVendedor);
  }

  async updateVendedor(
    id: number,
    data: Partial<CreateVendedorDTO>,
  ): Promise<Vendedor> {
    const vendedor = await this.vendedorRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });

    if (data.idUsuario) {
      const usuario = await this.usuarioRepository.findOne({
        where: { id: data.idUsuario },
      });
      if (!usuario) {
        throw new NotFoundException(
          `No se encontró el usuario con id ${data.idUsuario}`,
        );
      }
      vendedor.usuario = usuario;
    }

    if (!vendedor) {
      throw new NotFoundException(`No se encontró el vendedor con id ${id}`);
    }

    const updatedVendedor = this.vendedorRepository.merge(vendedor, data);
    return this.vendedorRepository.save(updatedVendedor);
  }

  async cambiarEstado(id: number, estado: number): Promise<Vendedor> {
    const vendedor = await this.vendedorRepository.findOne({
      where: { id },
      relations: ['usuario', 'clientes'],
    });
    if (!vendedor) {
      throw new NotFoundException('No se encontró el vendedor');
    }
    vendedor.estado = parseInt(estado as any);
    await this.vendedorRepository.save(vendedor);

    if (vendedor.clientes?.length) {
      for (const cliente of vendedor.clientes) {
        cliente.estado = parseInt(estado as any);
        await this.clienteRepository.save(cliente);
      }
    }

    return vendedor;
  }
}
