import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ruta } from './rutas.entity';

@Entity('tbl_Subruta')
export class Subruta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column()
  path: string;

  @ManyToOne(() => Ruta, (ruta) => ruta.subrutas)
  @JoinColumn({ name: 'rutaPadreId' })
  rutaPadre: Ruta;
}
