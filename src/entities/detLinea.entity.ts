import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Sublinea } from './subLinea.entity';

@Entity('tbl_Det_Linea')
export class DetLineas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  codDetLinea: string;

  @Column()
  detalle: string;

  @Column()
  id_sublinea: number;

  @Column({ default: 1 })
  estado: number;

  @ManyToOne(() => Sublinea, (sublinea) => sublinea.id)
  @JoinColumn({ name: 'id_sublinea' })
  sublinea: Sublinea;
}
