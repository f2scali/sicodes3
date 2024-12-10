import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Generated,
  PrimaryColumn,
} from 'typeorm';
import { TipoInventario } from './tipoInventario.entity';

@Entity('tbl_Linea')
export class Linea {
  @PrimaryColumn()
  id: string;

  @Column()
  detalle: string;

  @Column()
  id_tipo_inv: number;

  @Column({ default: 1 })
  estado: number;

  @ManyToOne(() => TipoInventario, (tipo) => tipo.ID)
  @JoinColumn({ name: 'id_tipo_inv' })
  tipoInventario: TipoInventario;
}
