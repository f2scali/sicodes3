import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from './roles.entity';
import { Subruta } from './subRutas.entity';

@Entity('tbl_Rutas')
export class Ruta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column()
  path: string;

  @OneToMany(() => Subruta, (subruta) => subruta.rutaPadre)
  subrutas: Subruta[];

  @ManyToMany(() => Roles, (rol) => rol.rutas)
  @JoinTable({
    name: 'tbl_rutas_roles',
    joinColumn: { name: 'ruta_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'rol_id', referencedColumnName: 'id' },
  })
  roles: Roles[];
}
