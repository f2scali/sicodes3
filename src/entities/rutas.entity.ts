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

@Entity('tbl_Rutas')
export class Ruta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column()
  path: string;

  @ManyToOne(() => Ruta, (ruta) => ruta.subrutas, { nullable: true })
  @JoinColumn({ name: 'id_ruta' })
  rutaPadre: Ruta;

  @OneToMany(() => Ruta, (ruta) => ruta.rutaPadre)
  subrutas: Ruta[];

  @ManyToMany(() => Roles, (rol) => rol.rutas)
  @JoinTable({
    name: 'tbl_rutas_roles',
    joinColumn: { name: 'ruta_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'rol_id', referencedColumnName: 'id' },
  })
  roles: Roles[];
}
