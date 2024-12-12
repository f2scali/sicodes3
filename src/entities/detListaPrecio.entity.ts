import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  Column,
  Double,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Producto } from './producto.entity';
import { ListaPrecios } from './listaPrecios.entity';

@Entity('tbl_Detalle_Lista_Precios')
export class DetalleListaPrecios {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  idProducto: string;

  @Column()
  idListaPrecio: string;

  @Column('double')
  PRECIO: Double;

  @ManyToOne(() => Producto, (producto) => producto.id)
  @JoinColumn({ name: 'idProducto' })
  producto: Producto;

  @ManyToOne(() => ListaPrecios, (listaPrecios) => listaPrecios.id)
  @JoinColumn({ name: 'idListaPrecio' })
  listaPrecios: ListaPrecios;

  @Column({ default: 1 })
  estado: number;
}
