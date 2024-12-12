import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TipoInventario } from './tipoInventario.entity';
import { UnidadMed } from './unidadMed.entity';
import { Criterio } from './criterio.entity';
import { Linea } from './linea.entity';

@Entity('tbl_producto')
export class Producto {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  codInventario: number;

  @Column()
  ID_ITEM: string;

  @Column({ nullable: true })
  ID_EXT_ITM: string;

  @Column({ nullable: true })
  ID_REFERENCIA: string;

  @Column()
  DESCRIPCION: string;

  @Column({ nullable: true })
  UNIMED_INV_1: number;

  @Column({ nullable: true })
  ID_LINEA: number;

  @Column({ nullable: true })
  ID_CRICLA1: number;

  @Column({ default: 0 })
  COSTO: number;

  @Column({ default: 1 })
  estado: number;

  @ManyToOne(() => TipoInventario, (tipo) => tipo.id)
  @JoinColumn({ name: 'codInventario' })
  tipoInventario: TipoInventario;

  @ManyToOne(() => UnidadMed, (unidad) => unidad.id)
  @JoinColumn({ name: 'UNIMED_INV_1' })
  unidadMed: UnidadMed;

  @ManyToOne(() => Linea, (linea) => linea.id)
  @JoinColumn({ name: 'ID_LINEA' })
  linea: Linea;

  @ManyToOne(() => Criterio, (criterio) => criterio.id)
  @JoinColumn({ name: 'ID_CRICLA1' })
  criterio: Criterio;
}
