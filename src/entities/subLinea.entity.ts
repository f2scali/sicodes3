import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Linea } from './linea.entity';
import { DetLineas } from './detLinea.entity';

@Entity('tbl_Sublinea')
export class Sublinea {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
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

  @OneToMany(() => DetLineas, (detLinea) => detLinea.sublinea)
  detLineas: DetLineas[];
}
