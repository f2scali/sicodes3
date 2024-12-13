import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from './roles.entity';
import { Ruta } from './rutas.entity';

@Entity('tbl_menus')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column()
  icono: string;

  @Column()
  id_ruta: number;

  @ManyToOne(() => Ruta, (ruta) => ruta.id)
  @JoinColumn({ name: 'id_ruta' })
  ruta: Ruta;

  @ManyToMany(() => Roles, (rol) => rol.menus)
  roles: Roles[];
}
