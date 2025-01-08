import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { TipoInventario } from './tipoInventario.entity';
import { Sublinea } from './subLinea.entity';
import { Producto } from './producto.entity';
import { DetalleListaPrecios } from './detListaPrecio.entity';

@Entity('tbl_Linea')
export class Linea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codLinea: string;
  @Column()
  detalle: string;

  @Column()
  id_tipo_inv: number;

  @Column({ default: 1 })
  estado: number;

  @ManyToOne(() => TipoInventario, (tipo) => tipo.lineas, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'id_tipo_inv' })
  tipoInventario: TipoInventario;

  @OneToMany(() => Sublinea, (sublinea) => sublinea.linea)
  sublineas: Sublinea[];

  @OneToMany(() => Producto, (producto) => producto.linea)
  productos: Producto[];
}
