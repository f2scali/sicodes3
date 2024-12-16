import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ruta } from './rutas.entity';
import { Menu } from './menu.entity';

@Entity('tbl_Roles')
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @ManyToMany(() => Ruta, (ruta) => ruta.roles)
  rutas: Ruta[];

  @ManyToMany(() => Menu, (menu) => menu.roles)
  @JoinTable()
  menus: Menu[];
}
