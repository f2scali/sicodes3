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
  idListaPrecio: number;

  @Column({ nullable: true })
  cod_ListaPrecio: string;

  @Column()
  id_producto: number;

  @Column({ nullable: true })
  id_item: string;

  @Column({ nullable: true })
  id_ext_item: string;

  @Column({ type: 'float', default: 0 })
  PRECIO: number;

  @ManyToOne(() => Producto, (producto) => producto.id)
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;

  @ManyToOne(() => ListaPrecios, (listaPrecios) => listaPrecios.id)
  @JoinColumn({ name: 'idListaPrecio' })
  listaPrecios: ListaPrecios;

  @Column({ default: 1 })
  estado: number;
}
