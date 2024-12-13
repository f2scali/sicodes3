import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { TipoInventario } from './tipoInventario.entity';
import { UnidadMed } from './unidadMed.entity';
import { Criterio } from './criterio.entity';
import { Linea } from './linea.entity';

@Entity('tbl_producto')
@Unique(['id_item', 'id_ext_item'])
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_inventario: number;

  @Column({ nullable: true })
  codInventario: number;

  @Column()
  id_item: string;

  @Column({ nullable: true })
  id_ext_item: string;

  @Column({ nullable: true })
  id_referencia: string;

  @Column()
  descripcion: string;

  @Column()
  unimed_inv_1: number;

  @Column()
  cod_unimed_inv_1: string;
  @Column()
  id_linea: number;

  @Column()
  cod_linea: string;

  @Column({ nullable: true })
  id_cricla1: number;

  @Column()
  cod_cricla1: string;
  @Column({ type: 'float', default: 0 })
  costo: number;

  @Column({ default: 1 })
  estado: number;

  @ManyToOne(() => TipoInventario, (tipo) => tipo.id)
  @JoinColumn({ name: 'codInventario' })
  tipoInventario: TipoInventario;

  @ManyToOne(() => UnidadMed, (unidad) => unidad.id)
  @JoinColumn({ name: 'unimed_inv_1' })
  unidadMed: UnidadMed;

  @ManyToOne(() => Linea, (linea) => linea.id)
  @JoinColumn({ name: 'id_linea' })
  linea: Linea;

  @ManyToOne(() => Criterio, (criterio) => criterio.id)
  @JoinColumn({ name: 'id_cricla1' })
  criterio: Criterio;
}
