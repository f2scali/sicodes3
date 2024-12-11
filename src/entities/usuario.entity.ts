import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Roles } from './roles.entity';

@Entity('tbl_Usuarios')
export class Usuario {
  @PrimaryColumn()
  id: number;

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
