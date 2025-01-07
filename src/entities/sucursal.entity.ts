import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cliente } from './cliente.entity';

@Entity('tbl_Sucursal')
export class Sucursal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  codSucursal: string;

  @Column()
  id_Cliente: number;

  @Column()
  Detalle: string;

  @Column()
  Direccion: string;

  @Column({ nullable: true })
  Telefono: string;

  @Column({ default: 1 })
  estado: number;

  // Relación con la tabla tbl_Clientes
  @ManyToOne(() => Cliente, (cliente) => cliente.id)
  @JoinColumn({ name: 'id_Cliente' })
  cliente: Cliente;
}
