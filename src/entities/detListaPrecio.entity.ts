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
  ID_Producto: string;

  @Column()
  id_Lista_Precios: string;

  @Column('double')
  PRECIO: Double;

  // @ManyToOne(() => Producto, (producto) => producto.ID)
  // @JoinColumn({ name: 'ID_Producto' })
  // producto: Producto;

  // @ManyToOne(() => ListaPrecios, (listaPrecios) => listaPrecios.ID_LISTA)
  // @JoinColumn({ name: 'id_Lista_Precios' })
  // listaPrecios: ListaPrecios;

  @Column({ default: 1 })
  estado: number;
}
