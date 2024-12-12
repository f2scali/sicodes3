import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
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
  id_linea: string;
  @Column({ default: 1 })
  estado: number;

  @ManyToOne(() => Linea, (linea) => linea.id)
  @JoinColumn({ name: 'id_linea' })
  linea: Linea;
}
