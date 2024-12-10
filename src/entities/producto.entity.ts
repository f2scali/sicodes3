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
  ID: number;

  @Column({
    type: 'varchar',
    length: 100,
    asExpression: `
      CASE 
        WHEN ID_EXT_ITM IS NULL OR ID_EXT_ITM = '' THEN ID_ITEM
        ELSE CONCAT(ID_ITEM, '-', ID_EXT_ITM)
      END`,
  })
  ID_Producto: string;
  @Column({ nullable: true })
  ID_TIPO_INVENTARIO: string;

  @Column()
  ID_ITEM: string;

  @Column({ nullable: true })
  ID_EXT_ITM: string;

  @Column({ nullable: true })
  ID_REFERENCIA: string;

  @Column()
  DESCRIPCION: string;

  @Column({ nullable: true })
  UNIMED_INV_1: string;

  @Column({ nullable: true })
  ID_LINEA: string;

  @Column({ nullable: true })
  ID_CRICLA1: string;

  @Column({ default: 0 })
  COSTO: number;

  @Column({ default: 1 })
  estado: number;

  @ManyToOne(() => TipoInventario, (tipo) => tipo.ID)
  @JoinColumn({ name: 'ID_TIPO_INVENTARIO' })
  tipoInventario: TipoInventario;

  @ManyToOne(() => UnidadMed, (unidad) => unidad.ID)
  @JoinColumn({ name: 'UNIMED_INV_1' })
  unidadMed: UnidadMed;

  @ManyToOne(() => Linea, (linea) => linea.id)
  @JoinColumn({ name: 'ID_LINEA' })
  linea: Linea;

  @ManyToOne(() => Criterio, (criterio) => criterio.ID)
  @JoinColumn({ name: 'ID_CRICLA1' })
  criterio: Criterio;
}
