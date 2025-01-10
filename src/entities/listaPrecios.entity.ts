import {
  Entity,
  PrimaryColumn,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { DetalleListaPrecios } from './detListaPrecio.entity';
import { Producto } from './producto.entity';
import { Cliente } from './cliente.entity';

@Entity('tbl_Lista_Precios')
export class ListaPrecios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  codLista: string;

  @Column()
  DETALLE: string;

  @Column({ default: 1 })
  estado: number;

  @OneToMany(() => DetalleListaPrecios, (detLista) => detLista.listaPrecios)
  listasDePrecio: DetalleListaPrecios[];

  @OneToMany(() => Cliente, (cliente) => cliente.listaPrecios)
  clientes: Cliente[];
}
