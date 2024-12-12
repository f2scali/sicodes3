import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('tbl_Vendedor')
export class Vendedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  codVendedor: string;

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
  @JoinColumn({ name: 'codVendedor' })
  usuario: Usuario; // Relación 1:1 con Usuario
}
