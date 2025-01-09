import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { Linea } from './linea.entity';
import { Criterio } from './criterio.entity';
import { UnidadMed } from './unidadMed.entity';
import { Producto } from './producto.entity';

@Entity('tbl_Tipo_Inventario')
export class TipoInventario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  codInventario: string;
  @Column()
  Detalle: string;

  @Column({ default: 1 })
  estado: number;

  @OneToMany(() => Linea, (linea) => linea.tipoInventario)
  lineas: Linea[];

  @OneToMany(() => Criterio, (criterio) => criterio.tipoInventario)
  criterios: Criterio[];

  @OneToMany(() => UnidadMed, (unidadMed) => unidadMed.tipoInventario)
  unidadMeds: UnidadMed[];

  @OneToMany(() => Producto, (producto) => producto.tipoInventario)
  productos: Producto[];
}
