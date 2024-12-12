import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TipoInventario } from './tipoInventario.entity';

@Entity('tbl_Unidad_Med')
export class UnidadMed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codUnidadMed: string;

  @Column()
  Detalle: string;

  @Column()
  id_tipo_inv: number;

  @Column({ default: 1 })
  estado: number;

  @ManyToOne(() => TipoInventario, (tipo) => tipo.id)
  @JoinColumn({ name: 'id_tipo_inv' })
  tipoInventario: TipoInventario;
}
