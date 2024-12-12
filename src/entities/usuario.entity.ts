import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Roles } from './roles.entity';

@Entity('tbl_Usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  codUsuario: string;

  @Column({ unique: true })
  usuario: string;

  @Column()
  contraseña: string;

  @Column()
  id_rol: number;
  @Column({ default: 1 })
  estado: number;

  @ManyToOne(() => Roles, (roles) => roles.id)
  @JoinColumn({ name: 'id_rol' })
  rol: Roles;
}
