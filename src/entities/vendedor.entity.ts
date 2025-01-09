import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { Cliente } from './cliente.entity';

@Entity('tbl_Vendedor')
export class Vendedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  idUsuario: number;

  @Column({ length: 100 })
  NOMBRE: string;

  @Column({ length: 100 })
  APELLIDO: string;

  @Column({ length: 100, nullable: true })
  Correo: string;

  @Column()
  Telefono: string;

  @Column({ default: 1 })
  estado: number;
  @OneToOne(() => Usuario, (usuario) => usuario.id)
  @JoinColumn({ name: 'idUsuario' })
  usuario: Usuario; // Relación 1:1 con Usuario

  @OneToMany(() => Cliente, (cliente) => cliente.vendedor)
  clientes: Cliente[];
}
