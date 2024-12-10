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

@Entity('tbl_Unidad_Med')
export class UnidadMed {
  @PrimaryColumn()
  ID: string;

  @Column()
  Detalle: string;

  @Column()
  id_tipo_inv: number;

  @Column({ default: 1 })
  estado: number;

  @ManyToOne(() => TipoInventario, (tipo) => tipo.ID)
  @JoinColumn({ name: 'id_tipo_inv' })
  tipoInventario: TipoInventario;
}
