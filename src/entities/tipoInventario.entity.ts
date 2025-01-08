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

  @OneToMany(() => Linea, (linea) => linea.tipoInventario, { eager: true })
  lineas: Linea[];

  @OneToMany(() => Criterio, (criterio) => criterio.tipoInventario, {
    eager: true,
  })
  criterios: Criterio[];

  @OneToMany(() => UnidadMed, (unidadMed) => unidadMed.tipoInventario, {
    eager: true,
  })
  unidadMeds: UnidadMed[];

  @OneToMany(() => Producto, (producto) => producto.tipoInventario, {
    eager: true,
  })
  productos: Producto[];
}
