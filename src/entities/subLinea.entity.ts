import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Linea } from './linea.entity';

@Entity('tbl_Sublinea')
export class Sublinea {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  codSublinea: string;
  @Column()
  detalle: string;
  @Column()
  id_linea: number;
  @Column({ default: 1 })
  estado: number;

  @ManyToOne(() => Linea, (linea) => linea.id)
  @JoinColumn({ name: 'id_linea' })
  linea: Linea;
}
